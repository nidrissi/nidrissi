import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { splitter } from "../../utils";

import { setQuery } from "./searchFormSlice";

import SearchFormBody from "./SearchFormBody";

/** The full search form. It has
    - three fields: the ID list, the author list, and the title (words) list;
    - two buttons: submit and clear.
      */
export default function SearchForm({ isFetching }: { isFetching: boolean }) {
  const dispatch = useDispatch();

  return (
    <Formik
      component={(props) => (
        <SearchFormBody isFetching={isFetching} {...props} />
      )}
      initialValues={{
        ids: "",
        authors: "",
        titles: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const query = {
          ids: splitter(values.ids, /\s+/),
          authors: splitter(values.authors, /\s*&\s*/),
          titles: splitter(values.titles, /\s*&\s*/), // idem
        };
        dispatch(setQuery(query));
        setSubmitting(false);
      }}
      validate={(values) => {
        const errors: { [index: string]: string } = {};
        if (!values.ids && !values.authors && !values.titles) {
          ["ids", "authors", "titles"].forEach(
            (s) => (errors[s] = "At least one value is required.")
          );
        }
        return errors;
      }}
    />
  );
}
