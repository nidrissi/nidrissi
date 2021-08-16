import { Link } from "gatsby";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { actualTitle } from "./Page";

import * as styles from "./NextPrevious.module.css";

export interface NextOrPreviousItem {
  slug: string;
  frontmatter: {
    title: string;
    event: string;
    location: string;
    year: string;
  };
}

interface NextPreviousProps {
  previous: NextOrPreviousItem;
  next: NextOrPreviousItem;
  type: string;
}

export default function NextPrevious({
  next,
  previous,
  type,
}: NextPreviousProps) {
  if (!next && !previous) {
    return null;
  }
  if (type === "misc" || type === "class") {
    return null;
  }

  return (
    <div className={styles.outer}>
      {previous && (
        <Link to={`/${type}/${previous.slug}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;
          {actualTitle(previous.frontmatter, type)}
        </Link>
      )}
      {next && (
        <Link to={`/${type}/${next.slug}`}>
          {actualTitle(next.frontmatter, type)}
          &nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      )}
    </div>
  );
}
