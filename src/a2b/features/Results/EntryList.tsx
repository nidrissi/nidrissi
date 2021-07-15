import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { selectAllEntries, selectTotalEntriesFound } from "./resultsSlice";
import { selectSettings } from "../Settings/settingsSlice";

import EntryCard from "../EntryCard";
import CopyAndTotal from "./CopyAndTotal";

/** The list of all entries. Entry ids are taken from the redux state
 * and then rendered using `EntryById`. Then adds buttons to copy entries
 * to the clipboards and counts how many are displayed out of the total.
 */
export default function EntryList() {
  const totalEntriesFound = useSelector(selectTotalEntriesFound);
  const entries = useSelector(selectAllEntries);
  const { mode } = useSelector(selectSettings);
  const outerRef = useRef<HTMLDivElement>(null);

  if (totalEntriesFound === undefined) {
    // entries haven't even been fetched or there was an error
    return null;
  }

  const renderedEntries = entries.map((entry) => (
    <EntryCard key={entry.id} entry={entry} />
  ));

  const totalText = (
    <>
      Showing {entries.length} entries out of {totalEntriesFound} in total.
      {mode === "bibtex" && (
        <>
          {" "}
          <span className="text-danger">
            Running in legacy BibTeX mode. Check entries for issues.
          </span>
        </>
      )}
    </>
  );

  return (
    <div ref={outerRef}>
      <CopyAndTotal totalText={totalText} outerRef={outerRef} />
      {renderedEntries}
    </div>
  );
}
