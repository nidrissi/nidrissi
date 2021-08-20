import React from "react";
import ReactMarkdown from "react-markdown";

import { Frontmatter } from ".";
import DateTime from "./datetime";

import * as styles from "./research.module.css";

interface People {
  name: string;
  url?: string;
}

const people: Map<string, People> = new Map([
  [
    "me",
    {
      name: "Najib Idrissi",
    },
  ],
  [
    "ricardo",
    {
      name: "Ricardo Campos",
      url: "http://imag.umontpellier.fr/~campos/",
    },
  ],
  [
    "julien",
    {
      name: "Julien Ducoulombier",
      url: "https://julien-ducoulombie.wixsite.com/ducoulombiermaths",
    },
  ],
  [
    "pascal",
    {
      name: "Pascal Lambrechts",
      url: "https://uclouvain.be/fr/repertoires/pascal.lambrechts",
    },
  ],
  [
    "thomas",
    {
      name: "Thomas Willwacher",
      url: "https://people.math.ethz.ch/~wilthoma/",
    },
  ],
]);

function formatAuthor(author: string): string | JSX.Element {
  const person = people.get(author);
  if (person) {
    return person.url ? (
      <a href={person.url} target="_blank" rel="noopener nofollow noreferrer">
        {person.name}
      </a>
    ) : (
      person.name
    );
  } else {
    return author;
  }
}

interface MetaResearchProps {
  frontmatter: Frontmatter;
}

export default function MetaResearch({
  frontmatter: { date, lastMod, accepted, publication, authors },
}: MetaResearchProps) {
  if (!authors) {
    return null;
  }

  return (
    <p className={styles.publication}>
      {authors.length > 1 && (
        <>
          {authors.map((a, i) => (
            <React.Fragment key={a}>
              {i > 0 && ", "}
              {formatAuthor(a)}
            </React.Fragment>
          ))}
          {". "}
        </>
      )}
      {publication && (
        <>
          <ReactMarkdown
            children={publication}
            disallowedElements={["p"]}
            unwrapDisallowed
          />{" "}
        </>
      )}
      <DateTime label="Online on">{date}</DateTime>
      {date && lastMod && " "}
      <DateTime label="Updated on">{lastMod}</DateTime>
      {lastMod && accepted && " "}
      <DateTime label={"Accepted on"}>{accepted}</DateTime>
    </p>
  );
}
