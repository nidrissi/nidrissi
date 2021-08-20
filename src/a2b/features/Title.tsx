import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faQuestion,
  faSearch,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";

import * as styles from "./Title.module.css";

const links: {
  icon: IconDefinition;
  label: string;
}[] = [
  { icon: faSearch, label: "Search" },
  { icon: faCog, label: "Settings" },
];

interface NavbarProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

/** A react-router powered navigation bar. */
export default function Navbar({ setCurrentPage }: NavbarProps) {
  return (
    <>
      <h1>arXiv2BibLaTeX</h1>
      <div className={styles.buttonWrapper}>
        {links.map((l) => (
          <button key={l.label} onClick={() => setCurrentPage(l.label)}>
            <FontAwesomeIcon icon={l.icon} />
            &nbsp;
            {l.label}
          </button>
        ))}
        <Link to="/misc/a2b/help">
          <FontAwesomeIcon icon={faQuestion} />
          &nbsp;Help
        </Link>
      </div>
    </>
  );
}
