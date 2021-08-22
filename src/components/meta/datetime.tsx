import React from "react";

interface DateTimeProps {
  children: React.ReactNode;
  label: string;
  TBA?: boolean;
}

export default function DateTime({ label, children, TBA }: DateTimeProps) {
  if (!children) {
    return null;
  }

  const date = new Date(children.toString());
  const localeDate = date.toLocaleDateString();

  return (
    <>
      {label}{" "}
      <time dateTime={date.toISOString()}>
        {TBA ? (
          <abbr title="The precise date is not yet known.">{localeDate}?</abbr>
        ) : (
          localeDate
        )}
      </time>
      {"."}
    </>
  );
}
