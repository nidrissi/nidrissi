import React from "react";

import { Frontmatter } from ".";
import DateTime from "./datetime";

import people from './people.json';

function formatAuthor(author: string): string | JSX.Element {
  const person = people[author];
  if (person) {
    return person.url ? (
      <a
        href={person.url}
        className="text-blue-800 dark:text-indigo-300 hover:underline"
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        {person.name}
      </a>
    ) : person.name;
  } else {
    return author;
  }
}

interface MetaResearchProps {
  frontmatter: Frontmatter;
}

export default function MetaResearch({ frontmatter: { date, lastMod, accepted, publication, authors } }: MetaResearchProps) {
  const displayedAuthors = authors.length > 1 && (
    <div>
      {authors.map((a, i) => (
        <React.Fragment key={a}>
          {i > 0 && ', '}
          {formatAuthor(a)}
        </React.Fragment>
      ))}.
    </div>
  );

  return (
    <>
      {displayedAuthors}
      <div dangerouslySetInnerHTML={{ __html: publication }} />
      <DateTime label="Online on">{date}</DateTime>
      <DateTime label="Updated on">{lastMod}</DateTime>
      <DateTime label="Accepted on">{accepted}</DateTime>
    </>
  );
}
