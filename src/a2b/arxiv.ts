// see https://arxiv.org/help/api/user-manual
import { Entry, Query, Settings } from "./types";
import { removeAccents } from "./utils";

function getUniqueNamedTag(
  xmlEntry: Element | Document,
  tag: string
): string | undefined {
  const collection = xmlEntry.getElementsByTagName(tag);
  const item = collection.item(0);
  return item?.textContent?.trim();
}

function parseEntry(xmlEntry: Element): Entry | null {
  // the end result
  const entry: Entry = {
    authors: [],
    date: "",
    type: "Misc",
  };

  // authors are of the form:
  // <author>
  //   <name>John Doe</name>
  //   <arxiv:affiliation>University </arxiv.affiliation>    <- optional
  // </author>
  for (let a of Array.from(xmlEntry.getElementsByTagName("author"))) {
    const name = getUniqueNamedTag(a, "name");
    if (name) {
      entry.authors.push(name);
    }
  }

  // title
  entry.title = getUniqueNamedTag(xmlEntry, "title")
    ?.replace(/\s+/gm, " ")
    .replace(/\$([^$]+)\$/g, "{$$$1$$}"); // deal with latex in title
  // With id_list, if there is no entry for a given id, arXiv
  // returns a malformed empty entry instead of an error.
  // No, it doesn't make any sense.
  if (!entry.title) {
    return null;
  }

  // If the API returns something incorrect, we just bail.
  // date
  const published = getUniqueNamedTag(xmlEntry, "published");
  if (!published) {
    console.log("bad entry: no published tag!");
    return null;
  }
  entry.date = published.substr(0, 4); // only take the year

  // abstract
  entry.abstract = getUniqueNamedTag(xmlEntry, "summary");

  // id
  const idURL = getUniqueNamedTag(xmlEntry, "id");
  if (!idURL) {
    console.log("bad entry: no id!");
    return null;
  }
  // the URL has the form https://arxiv.org/abs/{id}v{version}
  const regex = /https?:\/\/arxiv\.org\/abs\/(.+)v(\d+)/;
  const match = idURL.match(regex);
  if (match === null) {
    throw Error("bad entry: malformed arXiv URL!");
  }
  const [id, version] = match.slice(1, 2);
  entry.id = id;
  entry.version = Number(version);

  // link to PDF
  for (let l of Array.from(xmlEntry.getElementsByTagName("link"))) {
    if (l.getAttribute("title") === "pdf") {
      entry.pdfLink = l.getAttribute("href") || undefined;
    } else if (l.getAttribute("title") === "doi") {
      entry.doi = l
        .getAttribute("href")!
        .replace(/^https?:\/\/dx\.doi\.org\//, "");
    }
  }

  // comment & journal ref (may not exist)
  entry.comment = getUniqueNamedTag(xmlEntry, "arxiv:comment")?.replace(
    /\s+/g,
    " "
  );
  entry.journalRef = getUniqueNamedTag(xmlEntry, "arxiv:journal_ref")?.replace(
    /\s+/g,
    " "
  );
  entry.primaryCategory =
    xmlEntry
      .getElementsByTagName("arxiv:primary_category")
      .item(0)
      ?.getAttribute("term") || undefined;

  // publication state
  if (!entry.doi && !entry.journalRef) {
    entry.pubstate = "prepublished";
  }

  return entry;
}

/** If there is an error, arXiv returns a single error entry.
    In this case we just throw the error for fetchEntries to deal with.
 */
function checkEntryForErrors(xmlEntry: Element): void {
  for (let l of Array.from(xmlEntry.getElementsByTagName("link"))) {
    if (l.getAttribute("href")?.match("api/errors")) {
      const error = getUniqueNamedTag(xmlEntry, "summary");
      throw Error(`ArXiv reported: “${error}”.`);
    }
  }
}

function buildSearchQueryPart(list: string[], label: string): string {
  return list
    .map(removeAccents)
    .map(encodeURIComponent)
    .map((a) => `${label}:"${a}"`)
    .join("+AND+");
}

function buildURLQuery(
  { authors, ids, titles }: Query,
  { maxResults, sortBy, sortOrder }: Settings
): string {
  const base = "https://export.arxiv.org/api/query?";

  const idQuery =
    ids.length === 0
      ? ""
      : ";id_list=" + encodeURIComponent(ids.join(",").replace(/v\d+$/, ""));

  const searchQuery = [
    buildSearchQueryPart(authors, "au"),
    buildSearchQueryPart(titles, "ti"),
  ]
    .filter((s) => s.length > 0)
    .join("+AND+");
  const searchSettings = `sortBy=${sortBy}&sortOrder=${sortOrder}&max_results=${maxResults}`;
  const fullSearchQuery = `search_query=${searchQuery}&${searchSettings}`;

  return base + fullSearchQuery + idQuery;
}

/** Return type of `arxivSearch` */
export interface ArxivResult {
  entries: Entry[];
  totalEntriesFound: number;
};

/** Performs a search on arXiv.
 * @param query The query (ids, titles, authors)
 * @param settings The settings (sort order etc)
 */
export async function arxivSearch(
  query: Query,
  settings: Settings
): Promise<ArxivResult> {
  const urlQuery = buildURLQuery(query, settings);
  const response = await fetch(urlQuery);
  const xmlData = await response.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");

  const xmlEntries = xmlDoc.getElementsByTagName("entry");
  const entries: Entry[] = [];
  for (const w of Array.from(xmlEntries)) {
    checkEntryForErrors(w);
    const parsedEntry = parseEntry(w);
    if (parsedEntry !== null) {
      entries.push(parsedEntry);
    }
  }

  const totalEntriesFound = Number(
    getUniqueNamedTag(xmlDoc, "opensearch:totalResults")
  );

  return { entries, totalEntriesFound };
}
