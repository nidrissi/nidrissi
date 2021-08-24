import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { selectSettings } from "../Settings/settingsSlice";

import EntryCard, { joinAuthorsGetKey } from "../EntryCard";
import CopyAndTotal from "./CopyAndTotal";
import { Entry } from "../../types";

import * as styles from "./EntryList.module.css";

function formatWget(
  entry: Entry,
  wgetPowershell: boolean,
  fileFolder: string
): string {
  const { key } = joinAuthorsGetKey({
    authors: entry.authors,
    date: entry.date,
  });
  return wgetPowershell
    ? `Invoke-WebRequest ${entry.pdfLink} -OutFile ${fileFolder}\\${key}.pdf`
    : `wget --user-agent='Mozilla' ${entry.pdfLink} -O ${fileFolder}/${key}.pdf`;
}

/** The list of all entries. Entry ids are taken from the redux state
 * and then rendered using `EntryById`. Then adds buttons to copy entries
 * to the clipboards and counts how many are displayed out of the total.
 */
export default function EntryList({ entries }: { entries?: Entry[] }) {
  const { mode, includeWget, wgetPowershell, fileFolder } =
    useSelector(selectSettings);
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
      {includeWget && (
        <pre className={styles.wget}>
          {entries.map((entry, index) => (
            <>
              {index > 0 && <br />}
              {formatWget(entry, wgetPowershell, fileFolder)}
            </>
          ))}
        </pre>
      )}
    </div>
  );
}
