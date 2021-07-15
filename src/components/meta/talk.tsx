import React from "react";
import { Frontmatter } from ".";
import DateTime from "./datetime";

interface MetaTalkProps {
  frontmatter: Frontmatter;
}

export default function MetaTalk({ frontmatter }: MetaTalkProps) {
  const { TBA, title, date } = frontmatter;

  return (
    <>
      <DateTime label="On" TBA={TBA}>{date}</DateTime>
      <div>Title: {title}.</div>
    </>
  );
}
