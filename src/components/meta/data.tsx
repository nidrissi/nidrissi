import React from "react";

import { Frontmatter } from ".";
import DateTime from "./datetime";
import LdJSON from "./ld-json";
import TagLink from "./TagLink";

interface MetaDataProps {
  frontmatter: Frontmatter;
}

export default function MetaData({
  frontmatter: { title, date, lastMod, tags },
}: MetaDataProps) {
  return (
    <p>
      <LdJSON>
        {{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          datePublished: new Date(date).toISOString(),
          dateModified: lastMod ? new Date(lastMod).toISOString() : null,
        }}
      </LdJSON>
      <DateTime label="Published">{date}</DateTime>
      {date && lastMod && " "}
      <DateTime label="Updated">{lastMod}</DateTime>
      {(date || lastMod) && tags && " "}
      {tags?.sort().map((tag, i) => (
        <React.Fragment key={tag}>
          {i > 0 && " "}
          <TagLink tag={tag} />
        </React.Fragment>
      ))}
    </p>
  );
}
