import { Link } from "gatsby";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { actualTitle } from "./Page";

export interface NextOrPrevious {
  slug: string;
  frontmatter: {
    title: string;
    event: string;
    location: string;
    year: string;
  };
};

interface NextPreviousProps {
  previous: NextOrPrevious;
  next: NextOrPrevious;
  type: string;
}

export default function NextPrevious({ next, previous, type }: NextPreviousProps) {
  if (!next && !previous) {
    return null;
  }
  if (type === 'misc' || type === 'class') {
    return null;
  }

  const linkStyle = "block p-1 text-sm text-green-700 dark:text-green-400 border border-green-700 dark:border-green-400 rounded-md hover:bg-green-700 dark:hover:bg-green-400 hover:text-white dark:hover:text-black";

  return (
    <div className="flex w-full mt-6">
      {previous && (
        <Link
          to={`/${type}/${previous.slug}`}
          className={linkStyle}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;
          {actualTitle(previous.frontmatter, type)}
        </Link>
      )}
      <div className="flex-grow"></div>
      {next && (
        <Link
          to={`/${type}/${next.slug}`}
          className={linkStyle}
        >
          {actualTitle(next.frontmatter, type)}
          &nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      )}
    </div>
  );
}
