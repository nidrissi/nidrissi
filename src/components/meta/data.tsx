import React from "react";

import { Frontmatter } from ".";
import DateTime from "./datetime";
import LdJSON from "./ld-json";
import TagLink from "./TagLink";

interface MetaDataProps {
  frontmatter: Frontmatter;
}

export default function MetaData({ frontmatter: { title, date, lastMod, tags } }: MetaDataProps) {
  return (
    <>
      <LdJSON>
        {{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "datePublished": new Date(date).toISOString(),
          "dateModified": lastMod ? new Date(lastMod).toISOString() : null,
        }}
      </LdJSON>
      <DateTime label="Published">{date}</DateTime>
      <DateTime label="Updated">{lastMod}</DateTime>
      {tags?.sort().map((tag) => (
        <TagLink tag={tag} key={tag} />
      ))}
    </>
  );
}
