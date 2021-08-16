import React from "react";
import { Field } from "formik";

import * as styles from "./SettingField.module.css";

interface SettingFieldProps {
  children?: React.ReactNode;
  as: "checkbox" | "select" | "control";
  id: string;
  label: string | JSX.Element;
  disabled?: boolean;
  margin?: number;
}
export default function SettingField({
  as,
  id,
  label,
  disabled,
  children,
}: SettingFieldProps) {
  if (as === "control") {
    return (
      <div>
        <label htmlFor={id} className={styles.labelBlock}>
          {label}
        </label>
        <Field
          type="text"
          className={styles.input}
          name={id}
          id={id}
          disabled={disabled}
        />
      </div>
    );
  } else if (as === "checkbox") {
    return (
      <div className={styles.checkWrapper}>
        <Field
          // className={styles.input}
          type="checkbox"
          id={id}
          name={id}
          disabled={disabled}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  } else if (as === "select") {
    return (
      <div>
        <label htmlFor={id} className={styles.labelBlock}>
          {label}
        </label>
        <Field
          as="select"
          className={styles.input}
          name={id}
          id={id}
          disabled={disabled}
        >
          {children}
        </Field>
      </div>
    );
  } else {
    // hopefully won't happen...
    throw Error("Bad type of SettingField");
  }
}
