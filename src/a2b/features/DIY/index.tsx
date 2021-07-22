import React from "react";

import { Formik, Form } from "formik";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  GenericPreFields,
  GenericPostFields,
  SpecificFields,
  FormValues,
} from "./data";
import FormattedEntry from "./FormattedEntry";

const initialValues = {
  type: "Article",
  authors: "",
  title: "",
  mainTitle: "",
  date: "",
  subTitle: "",
  journal: "",
  series: "",
  number: "",
  volume: "",
  publisher: "",
  location: "",
  ISBN: "",
  pageTotal: "",
  pubstate: "",
  id: "",
  doi: "",
  issue: "",
};

interface DIYBodyProps {
  values: FormValues;
}

/** The body of the `DIY` component.
 * @param values The values provided by Formik.
 */
function DIYBody({ values }: DIYBodyProps) {
  return (
    <div>
      <FormattedEntry values={values} />
      <br />
      <Form className="grid grid-cols-12 items-center gap-x-4 gap-y-2">
        <GenericPreFields />
        <SpecificFields type={values.type} />
        <GenericPostFields />
        <button
          type="reset"
          className="bg-gray-300 dark:bg-gray-700 dark:text-white block col-span-full p-2 rounded-md"
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Clear
        </button>
      </Form>
    </div>
  );
}

/** The DIY component: turns values inputted in a form into a formatted entry.
 */
export default function DIY() {
  return (
    <>
      <div className="bg-yellow-100 dark:bg-yellow-800 px-3 py-2" role="alert">
        <FontAwesomeIcon icon={faExclamationTriangle} title="Warning!" />
        &nbsp;
        Not feature complete yet!
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          return;
        }}
        component={DIYBody} />
    </>
  );
}
