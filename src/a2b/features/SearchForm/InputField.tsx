import React from "react";
import { useField } from "formik";

import * as styles from "./InputField.module.css";

/** Generic input fields for SearchForm.
    @param label The label of the input field.
    @param ...props The rest of the parameters, will be passed to a controlled input.
 */
interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
}
export default function InputField({ label, ...props }: InputFieldProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <div className={styles.field}>
        <input
          type="text"
          data-invalid={meta.error !== undefined}
          id={props.name}
          {...field}
          {...props}
        />
        {meta.error && <div className={styles.error}>{meta.error}</div>}
      </div>
    </>
  );
}
