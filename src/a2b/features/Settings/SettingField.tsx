import React from "react";
import { Field } from "formik";

interface SettingFieldProps {
  children?: React.ReactNode;
  as: "checkbox" | "select" | "control";
  id: string;
  label: string | JSX.Element;
  disabled?: boolean;
  margin?: number;
};
export default function SettingField({ as, id, label, disabled, children }: SettingFieldProps) {
  const bgStyle = disabled ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed" : "dark:bg-gray-900";
  if (as === "control") {
    return (
      <div>
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
        <Field
          type="text"
          className={`block w-full ${bgStyle}`}
          name={id}
          id={id}
          disabled={disabled} />
      </div>
    );
  } else if (as === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <Field
          className={disabled
            ? "bg-gray-100 checked:bg-gray-500 text-gray-500 cursor-not-allowed"
            : null}
          type="checkbox"
          id={id}
          name={id}
          disabled={disabled} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  } else if (as === "select") {
    return (
      <div>
        <label htmlFor={id} className="block mb-1">
          {label}
        </label>
        <Field
          as="select"
          className={`block w-full ${bgStyle}`}
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
