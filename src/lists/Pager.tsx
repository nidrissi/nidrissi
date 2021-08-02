import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface PagerProps {
  numPages: number;
  currentPage: number;
  type: string;
};
export default function Pager({ numPages, currentPage, type }: PagerProps) {
  if (numPages === 1) {
    return null;
  }

  const buttonStyle = "block border text-purple-700 border-purple-700 hover:bg-purple-700 hover:text-white dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-400 dark:hover:text-black p-2 leading-none rounded-md";
  const disabledStyle = "text-gray-600 border-gray-600 pointer-events-none";

  function indexToLink(i: number): string {
    return `/${type}${i > 1 ? `/${i}` : ""}`;
  }

  return (
    <nav className="mt-8 flex flex-wrap gap-2 justify-around">
      <Link
        to={indexToLink(1)}
        title="First page"
        className={buttonStyle}
        activeClassName={disabledStyle}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </Link>
      {currentPage > 1 && (
        <Link
          to={indexToLink(currentPage - 1)}
          title="Previous page"
          className={buttonStyle}
          activeClassName={disabledStyle}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      )}
      {Array.from({ length: numPages }, (_x, i) => (
        <Link
          key={i}
          to={indexToLink(i + 1)}
          title={`Page ${i + 1}`}
          className={buttonStyle}
          activeClassName="font-bold border-2 pointer-events-none"
        >
          {i + 1}
        </Link>
      ))}
      {currentPage < numPages && (
        <Link
          to={indexToLink(currentPage + 1)}
          title="Next page"
          className={buttonStyle}
          activeClassName={disabledStyle}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Link>
      )}
      <Link
        to={indexToLink(numPages)}
        title="Last page"
        className={buttonStyle}
        activeClassName={disabledStyle}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </Link>
    </nav>
  );
}
