import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";

import Meta, { Frontmatter } from "./meta";
import { actualTitle, heldOnline } from "./Page";

interface MiniProps {
  frontmatter: Frontmatter;
  type: string;
  slug: string;
  levelUp?: boolean;
  excerpt?: string;
  noLink?: boolean;
  index?: number;
};

export default function Mini({ frontmatter, slug, levelUp, excerpt, type, noLink }: MiniProps) {
  const titleLabel = actualTitle(frontmatter, type);

  const linkedTitle = noLink ? titleLabel : (
    <Link to={`/${type}/${slug}`} className="text-green-800 dark:text-green-500 hover:underline">
      {titleLabel}
    </Link>
  );

  const header = levelUp ? (
    <h2 className="text-2xl font-semibold">
      {linkedTitle}
      {heldOnline(type, frontmatter)}
    </h2>
  ) : (
    <h3 className="text-xl font-semibold">
      {linkedTitle}
      {heldOnline(type, frontmatter)}
    </h3>
  );

  const fullExcerpt = excerpt && (
    <Link
      to={`/post/${slug}`}
      className="block text-sm hover:underline hover:text-blue-700 dark:hover:text-indigo-300 max-w-xl"
    >
      {excerpt}
      {' '}
      <FontAwesomeIcon icon={faCaretSquareRight} />
    </Link>
  );

  return (
    <article
      lang={frontmatter?.lang}
      className="border border-gray-400 border-opacity-20 rounded-md p-2"
    >
      {header}
      <div className="mb-2">
        <Meta frontmatter={frontmatter} type={type} />
      </div>
      {fullExcerpt}
    </article>
  );
}
