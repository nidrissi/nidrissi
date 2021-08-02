import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClipboard } from "@fortawesome/free-solid-svg-icons";

import { removeAccents, splitter } from "../utils";
import { selectSettings } from "./Settings/settingsSlice";
import { Entry, Settings } from "../types";

// TODO Better pairing type
interface Pairing {
  abstract?: string | null;
  [index: string]: string | JSX.Element | number | null | undefined;
};

/** Converts a JS author list and a date into a BibLaTeX author list and a key.
 * @param authors The list of authors.
 * @param date The date of the entry.
 * @returns The key made from last names and the date and the formatted author list.
 * @example
 * // returns { key: 'DoeDew2020', authorList: "Doe, Jane and Dew, John"}
 * splitAuthors({ authors: ['Jane Doe', 'John Dew'], date: '2020' })
 */
function joinAuthorsGetKey({
  authors,
  date,
}: {
  authors: string[];
  date: string;
}): { key: string; authorList: string; } {
  const splitAuthors = authors.map((a) => splitter(a, /\s+/));
  const authorList = splitAuthors
    .map((l) => l[l.length - 1] + ", " + l.slice(0, -1).join(" "))
    .join(" and ");

  const year = date.slice(0, 4); // dates have the format YYYY-MM-DD
  const unformattedKey =
    splitAuthors.map((l) => l[l.length - 1]).join("") + year.toString();
  const key = removeAccents(unformattedKey);

  return { key, authorList };
}

/** Formats an entry into a BibLaTeX entry.
 * @param type The type of the entry, e.g. 'article' or 'book'
 * @param pairing The pairing returned by `buildPairing`
 * @param key The key returned by `splitAuthors`
 */
function formatEntry({
  type,
  pairing,
  key,
}: {
  type: string;
  pairing: Pairing;
  key: string;
}) {
  // the length of the longest key
  const maxKeyLength = Math.max(...Object.keys(pairing).map((s) => s.length));

  // pad the abstract
  if (pairing.abstract) {
    pairing.abstract = pairing.abstract.replace(
      /\n/g,
      "\n" + " ".repeat(maxKeyLength + 6)
    );
  }

  // not great but better than before...
  return (
    <>
      {`@${type}{${key},\n`}
      {Object.keys(pairing).map((key) => (
        <React.Fragment key={key}>
          {"  " /* indent by 2 */}
          {key}
          {
            " ".repeat(
              maxKeyLength - key.length
            ) /* pad to align all equal signs */
          }
          {" = {"}
          {pairing[key]}
          {"},\n"}
        </React.Fragment>
      ))}
      {"}"}
    </>
  );
}

/** Build a "pairing" from an entry based on settings
 * @param entry A key-value entry
 * @param settings Settings including the mode (bibtex or biblatex), the file prefix etc, see `Settings/index.js`
 */
function buildPairing({
  entry,
  settings,
}: {
  entry: Entry;
  settings: Settings;
}) {
  // good = biblatex, bad = bibtex
  const goodMode = settings.mode === "biblatex";

  // get the key and the list of authors, separated by 'and'
  const { key, authorList } = joinAuthorsGetKey({
    authors: entry.authors,
    date: entry.date,
  });

  // generate a filename and link to the PDF, if any
  const fileName = (settings.filePrefix ? `${key[0]}/` : "") + `${key}.pdf`;
  const fileLink = entry.pdfLink ? (
    <a href={entry.pdfLink}>
      {fileName}
    </a>
  ) : (
    fileName
  );

  // deal with journal ref & doi
  const journalRefLink = entry.journalRef && (
    <abbr title="Consider converting this entry to @article or something more appropriate.">
      {entry.journalRef}
    </abbr>
  );
  const doiLink = entry.doi && (
    <a href={`https://dx.doi.org/${entry.doi}`}>{entry.doi}</a>
  );

  // journal name & series in bad mode
  // if in badmode, add the series in parenthesis
  let journal = null;
  if (entry.journal) {
    journal =
      entry.journal + (!goodMode && entry.series ? ` (${entry.series})` : "");
  }

  // BibTeX only supports a year, not a full date
  const dateOrYear = goodMode ? entry.date : entry.date.slice(0, 4);

  // the end result will be this variable
  // all keys are lowercase
  let pairing: Pairing = {
    author: authorList,
    [goodMode ? "date" : "year"]: dateOrYear,
    title: entry.title,
    [goodMode ? "journaltitle" : "journal"]: journal,
    series: goodMode ? entry.series : null,
    maintitle: entry.mainTitle,
    subtitle: entry.subTitle,
    volume: entry.volume,
    number: entry.number,
    publisher: entry.publisher,
    location: entry.location,
    isbn: entry.ISBN,
    pagetotal: entry.pageTotal,
  };

  if (entry.id) {
    const absURL = `https://arxiv.org/abs/${entry.id}`;

    pairing = {
      ...pairing,
      eprint: <a href={absURL}>{entry.id}</a>,
      [goodMode ? "eprinttype" : "archiveprefix"]: "arXiv",
      [goodMode
        ? "eprintclass"
        : "primaryclass"]: settings.includePrimaryCategory
          ? entry.primaryCategory
          : null,
      version: goodMode && settings.includeVersion ? entry.version : null,
      url: goodMode ? null : absURL,
    };
  }

  // deal with mode
  if (goodMode) {
    pairing = {
      ...pairing,
      pubstate: entry.pubstate,
      howpublished: journalRefLink,
    };
  } else {
    pairing = {
      ...pairing,
      note: entry.doi || entry.journalRef ? journalRefLink : "Preprint",
    };
  }

  // add at the end regardless of mode
  pairing = {
    ...pairing,
    doi: doiLink,
    file: settings.includeFile ? fileLink : null,
    comment: entry.comment,
    abstract: settings.includeAbstract ? entry.abstract : null,
  };

  // delete all empty values
  Object.keys(pairing).forEach((k) => !pairing[k] && delete pairing[k]);

  // the wget command, if any
  let wget = null;
  if (settings.includeFile && entry.pdfLink) {
    if (settings.wgetPowershell) {
      wget = `pwsh -Command Invoke-WebRequest ${entry.pdfLink} -OutFile ${settings.fileFolder}\\${fileName}`;
    } else {
      wget = `wget --user-agent='Mozilla' ${entry.pdfLink} -O ${settings.fileFolder}/${fileName}`;
    }
  }

  return { type: entry.type, pairing, key, wget };
}

interface EntryCardProps {
  entry: Entry;
}

/** The full Entry component. Settings are taken from the redux state.
 * @param entry The key-value entry
 */
export default function EntryCard({ entry }: EntryCardProps) {
  // for the clipboard
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const onClickCopy = (_e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (preRef && preRef.current) {
      navigator.clipboard.writeText(preRef.current.innerText);
      setCopied(true);
    }
  };

  const settings = useSelector(selectSettings);

  const { type, pairing, key, wget } = buildPairing({ entry, settings });
  const formattedEntry = formatEntry({ type, pairing, key });

  return (
    <div className="bg-gray-200 text-black p-2 leading-none border border-black rounded-md my-2">
      <button
        onClick={onClickCopy}
        className="float-right bg-blue-600 hover:bg-blue-700 text-white p-2 leading-none rounded-sm"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faClipboard} />{" "}
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre ref={preRef} className="m-0 overflow-hidden">
        {formattedEntry}
      </pre>
      {settings.includeWget && wget && (
        <div className="mt-2 flex">
          <pre className="bg-black text-white whitespace-normal p-1">
            {wget}
          </pre>
          <div className="flex-grow"></div>
        </div>
      )}
    </div>
  );
}
