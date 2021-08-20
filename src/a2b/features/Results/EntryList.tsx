import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { selectSettings } from "../Settings/settingsSlice";

import EntryCard from "../EntryCard";
import CopyAndTotal from "./CopyAndTotal";
import { Entry } from "../../types";

/** The list of all entries. Entry ids are taken from the redux state
 * and then rendered using `EntryById`. Then adds buttons to copy entries
 * to the clipboards and counts how many are displayed out of the total.
 */
export default function EntryList({ entries }: { entries?: Entry[] }) {
  const { mode } = useSelector(selectSettings);
  const outerRef = useRef<HTMLDivElement>(null);

  if (!entries) {
    return null;
  }

  const renderedEntries = entries.map((entry) => (
    <EntryCard key={entry.id} entry={entry} />
  ));

  const totalText = (
    <>
      Showing {entries.length} entries.
      {mode === "bibtex" && (
        <> Running in legacy BibTeX mode. Check entries for issues.</>
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
