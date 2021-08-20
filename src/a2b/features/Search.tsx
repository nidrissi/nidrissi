import React from "react";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { useArxivSearchQuery } from "./Results/resultsSlice";
import SearchForm from "./SearchForm";
import { selectQuery } from "./SearchForm/searchFormSlice";
import { selectSettings } from "./Settings/settingsSlice";
import EntryList from "./Results/EntryList";
import ErrorAlert from "./Results/ErrorAlert";

/** The full search component. Contains a `SearchForm` and a `Results` components. */
export default function Search() {
  const query = useSelector(selectQuery);
  const { sortBy, sortOrder, maxResults } = useSelector(selectSettings);

  const shouldDisplayResult = [query.authors, query.ids, query.titles]
    .map((x) => x.length)
    .some((l) => l > 0);

  const { data, isFetching } = useArxivSearchQuery(
    shouldDisplayResult
      ? {
          query,
          settings: { sortBy, sortOrder, maxResults },
        }
      : skipToken
  );

  return (
    <>
      <SearchForm isFetching={isFetching} />
      {data &&
        ("message" in data ? (
          <ErrorAlert error={data} />
        ) : (
          <EntryList entries={data} />
        ))}
    </>
  );
}
