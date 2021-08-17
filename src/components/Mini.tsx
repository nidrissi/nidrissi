import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";

import Meta, { Frontmatter } from "./meta";
import { actualTitle, heldOnline } from "./Page";

import * as styles from "./Mini.module.css";

interface MiniProps {
  frontmatter: Frontmatter;
  type: string;
  slug: string;
  levelUp?: boolean;
  excerpt?: string;
  noLink?: boolean;
  index?: number;
}

export default function Mini({
  frontmatter,
  slug,
  levelUp,
  excerpt,
  type,
  noLink,
}: MiniProps) {
  const titleLabel = actualTitle(frontmatter, type);

  const linkedTitle = noLink ? (
    titleLabel
  ) : (
    <Link to={`/${type}/${slug}`}>{titleLabel}</Link>
  );

  const header = levelUp ? (
    <h2>
      {linkedTitle}
      {heldOnline(type, frontmatter)}
    </h2>
  ) : (
    <h3>
      {linkedTitle}
      {heldOnline(type, frontmatter)}
    </h3>
  );

  const fullExcerpt = excerpt && (
    <Link to={`/post/${slug}`} className={styles.excerpt}>
      {excerpt} <FontAwesomeIcon icon={faCaretSquareRight} />
    </Link>
  );

  return (
    <article lang={frontmatter?.lang} className={styles.mini}>
      {header}
      <Meta frontmatter={frontmatter} type={type} />
      {fullExcerpt}
    </article>
  );
}
