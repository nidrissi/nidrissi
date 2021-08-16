import React, { useState } from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBoxOpen,
  faChalkboardTeacher,
  faCogs,
  faHome,
  faListUl,
  faMicrophoneAlt,
  faPencilAlt,
  faPortrait,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Navbar.module.css";

interface navbarLink {
  to: string;
  icon: IconDefinition;
  label: string;
  partiallyActive?: boolean;
}
const navbarLinks: navbarLink[] = [
  { to: "/", icon: faHome, label: "Home" },
  { to: "/misc/cv", icon: faPortrait, label: "CV" },
  { to: "/research", icon: faCogs, label: "Research", partiallyActive: true },
  { to: "/talk", icon: faMicrophoneAlt, label: "Talks", partiallyActive: true },
  {
    to: "/class",
    icon: faChalkboardTeacher,
    label: "Teaching",
    partiallyActive: true,
  },
  { to: "/post", icon: faPencilAlt, label: "Blog", partiallyActive: true },
  { to: "/misc", icon: faBoxOpen, label: "Misc" },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.expander}>
        <Link to="/">Najib Idrissi</Link>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-controls={styles.content}
          title={`${expanded ? "Collapse" : "Expand"} the navbar`}
        >
          <FontAwesomeIcon size="lg" fixedWidth icon={faListUl} />
        </button>
      </div>
      <div className={styles.content + (expanded ? " " + styles.expanded : "")}>
        {navbarLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeClassName={styles.active}
            partiallyActive={link.partiallyActive}
          >
            <FontAwesomeIcon icon={link.icon} />
            &nbsp;
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
