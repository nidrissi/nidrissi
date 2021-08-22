import React from "react";
import { Frontmatter } from ".";
import DateTime from "./datetime";

interface MetaTalkProps {
  frontmatter: Frontmatter;
}

export default function MetaTalk({ frontmatter }: MetaTalkProps) {
  const { TBA, title, date } = frontmatter;

  return (
    <p>
      <DateTime label="On" TBA={TBA}>
        {date}
      </DateTime>
      {date && " "}
      Title: {title}.
    </p>
  );
}
