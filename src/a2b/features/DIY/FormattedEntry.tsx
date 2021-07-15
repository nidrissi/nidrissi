import React from "react";
import { splitter } from "../../utils";

import EntryCard from "../EntryCard";
import { FormValues } from "./data";

interface FormattedEntryProps {
  values: FormValues;
}

/** Takes values from the Formik context, creates an entry and formats it with `Entry`.
 */
export default function FormattedEntry({ values }: FormattedEntryProps) {
  // split on &, delete empty values, and trim
  const authors = splitter(values.authors, /&/);
  const entry = {
    ...values,
    volume: Number(values.volume),
    issue: Number(values.issue),
    authors,
    date: values.date || "0000",
  };
  return <EntryCard entry={entry} />;
}
