import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "formik";

import { saveSettings } from "./settingsSlice";
import SettingField from "./SettingField";
import { Settings } from "../../types";

interface SettingsFormBodyProps {
  values: Settings;
}

export default function SettingsFormBody({ values }: SettingsFormBodyProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(saveSettings(values));
  }, [dispatch, values]);

  const sectionStyle = "space-y-4 mb-3";
  const h2Style = "text-2xl font-semibold mb-2";
  return (
    <Form>
      <h2 className={h2Style}>Entry display</h2>
      <div className={sectionStyle}>
        <SettingField id="mode" as="select" label="Mode">
          <option value="biblatex">BibLaTeX (recommended)</option>
          <option value="bibtex">Legacy BibTeX (see the FAQ!)</option>
        </SettingField>
        <SettingField
          as="checkbox"
          id="includeFile"
          label="Include file field in entries" />
        <SettingField
          as="checkbox"
          id="filePrefix"
          disabled={!values.includeFile}
          label={<>
            Add a prefix to the file field (<code>Doe2020.pdf</code> ⇒{" "}
            <code>D/Doe2020.pdf</code>)
          </>} />
        <SettingField
          as="checkbox"
          id="includeWget"
          disabled={!values.includeFile}
          label={<>Include a download command for the entries.</>} />
        <SettingField
          as="checkbox"
          id="wgetPowershell"
          disabled={!values.includeFile || !values.includeWget}
          label={<>
            Running on Powershell on Windows (default is <code>wget</code> on
            Unix-like platforms).
          </>} />
        <SettingField
          as="control"
          id="fileFolder"
          label="The folder for the download command, if any."
          disabled={!values.includeFile || !values.includeWget} />
        <SettingField
          as="checkbox"
          id="includeAbstract"
          label="Include the abstract" />
        <SettingField
          as="checkbox"
          id="includePrimaryCategory"
          label={<>
            Include the primary category (e.g.<code>math.AT</code>), if any
          </>} />
        <SettingField
          as="checkbox"
          id="includeVersion"
          label="Include version information" />
      </div>
      <h2 className={h2Style}>Search settings</h2>
      <div className={sectionStyle}>
        <SettingField as="select" id="sortBy" label="Sort by">
          <option value="submittedDate">Initial submission date</option>
          <option value="lastUpdatedDate">Last update</option>
          <option value="relevance">Relevance</option>
        </SettingField>
        <SettingField as="select" id="sortOrder" label="Sort order">
          <option value="descending">Descending</option>
          <option value="ascending">Ascending</option>
        </SettingField>
        <SettingField as="select" id="maxResults" label="Max results">
          {[10, 20, 50, 100, 200, 500, 1000].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </SettingField>
      </div>
    </Form>
  );
}
