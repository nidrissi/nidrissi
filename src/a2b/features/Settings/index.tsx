import React from "react";
import { useSelector } from "react-redux";

import { Formik } from "formik";

import { Settings as SettingsType } from "../../types";
import { selectSettings } from "./settingsSlice";
import SettingsFormBody from "./SettingsFormBody";

/** The settings form, controls the related redux state. */
export default function Settings() {
  const settings = useSelector(selectSettings);

  return (
    <div>
      <Formik<SettingsType>
        component={SettingsFormBody}
        enableReinitialize={true}
        initialValues={settings}
        onSubmit={() => {
          return;
        }} />
      <p className="text-muted">
        Settings are saved in your browser's{" "}
        <a href="https://en.wikipedia.org/wiki/Web_storage">local storage</a>{" "}
        (you may need to enable some permissions).
      </p>
    </div>
  );
}
