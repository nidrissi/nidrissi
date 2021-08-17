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

  return (
    <div>
      {label}{" "}
      <time dateTime={date.toISOString()}>
        {TBA ? (
          <abbr title="The precise date is not yet known.">
            {date.toLocaleDateString()}?
          </abbr>
        ) : (
          date.toLocaleDateString()
        )}
      </time>
      .
    </div>
  );
}
