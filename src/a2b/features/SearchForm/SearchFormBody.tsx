import React from "react";
import { useSelector } from "react-redux";
import { Form } from "formik";

import { selectIsLoading } from "../Results/resultsSlice";

import InputField from "./InputField";
import SubmitAndClearButtons from "./SubmitAndClearButtons";

export default function SearchFormBody() {
  const isLoading = useSelector(selectIsLoading);

  return (
    <Form className="grid grid-flow-row gap-3 grid-cols-6 auto-rows-max items-center">
      <InputField
        label="ID list"
        name="ids"
        placeholder="ID1 ID2 ..."
        title="List of IDs, separated by spaces. Version will be stripped, e.g. 1911.12281v1 ⇒ 1911.12281." />
      <InputField
        name="authors"
        label="Authors"
        placeholder="Henri Poincaré & David Hilbert & ..."
        title="Author(s) separated by '&'." />
      <InputField
        name="titles"
        label="Title"
        placeholder="operad & configuration space & ..."
        title="Words/sentences to search in the title separated by '&'." />
      <div className="col-span-full">
        <SubmitAndClearButtons isLoading={isLoading} />
      </div>
    </Form>
  );
}
