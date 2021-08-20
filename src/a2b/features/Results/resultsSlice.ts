import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { buildURLQuery, parseEntry } from "../../arxiv";
import { Entry, Query, SearchSettings } from "../../types";

interface SearchArguments {
  query: Query;
  settings: SearchSettings;
}

export const arxivApi = createApi({
  reducerPath: "result",
  baseQuery: fetchBaseQuery({ baseUrl: "https://export.arxiv.org/api/" }),
  endpoints: (builder) => ({
    arxivSearch: builder.query<Entry[] | Error, SearchArguments>({
      query: ({ query, settings }) => ({
        url: "query?" + buildURLQuery(query, settings),
        responseHandler: async (res) => {
          const xmlData = await res.text();
          const parser = new DOMParser();
          return parser.parseFromString(xmlData, "text/xml");
        },
      }),
      transformResponse: (body: Document, _meta) => {
        const xmlEntries = body.getElementsByTagName("entry");
        const entries: Entry[] = [];

        for (const xmlEntry of Array.from(xmlEntries)) {
          for (const link of Array.from(
            xmlEntry.getElementsByTagName("link")
          )) {
            if (link.getAttribute("href")?.match("api/errors")) {
              console.log(link);
              const error = xmlEntry.getElementsByTagName("summary").item(0);
              return new Error(`ArXiv reported: “${error}”.`);
            }
          }

          const parsedEntry = parseEntry(xmlEntry);
          if (parsedEntry !== null) {
            entries.push(parsedEntry);
          }
        }

        // const totalEntriesFound = Number(
        //   getUniqueNamedTag(xmlDoc, "opensearch:totalResults")
        // );

        return entries;
      },
    }),
  }),
});

export const { useArxivSearchQuery } = arxivApi;
