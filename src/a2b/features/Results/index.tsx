import React from "react";

import EntryList from "./EntryList";
import ErrorAlert from "./ErrorAlert";

/** The full results component. Displays an error if any and then the
 * list of all found entries.
 */
export default function Results() {
  return (
    <>
      <ErrorAlert />
      <EntryList />
    </>
  );
}
