import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

interface TagLinkProps {
  tag: string;
  big?: boolean;
  count?: number;
};

export default function TagLink({ tag, big, count }: TagLinkProps) {
  const extraStyle = big ? "font-semibold text-2xl py-2 px-3" : "text-sm px-1.5 py-0.5";

  return (
    <Link
      to={`/tag/${tag}`}
      className={`block text-indigo-800 border border-indigo-200 dark:border-purple-900 hover:border-transparent hover:text-white hover:bg-indigo-800 hover:shadow-md dark:text-purple-400 dark:hover:bg-purple-400 dark:hover:text-black rounded-md ${extraStyle}`}
    >
      <FontAwesomeIcon icon={faTag} size="sm" className="mr-1" />
      {tag}
      {count && <span className="text-lg"> [{count}]</span>}
    </Link>
  );
}
