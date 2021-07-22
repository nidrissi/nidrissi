import React, { useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBoxOpen,
  faChalkboardTeacher,
  faCogs,
  faComments,
  faHome,
  faListUl,
  faPencilAlt,
  faPortrait,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface navbarLink {
  to: string;
  icon: IconDefinition;
  label: string;
  partiallyActive?: boolean;
};
const navbarLinks: navbarLink[] = [
  { to: "/", icon: faHome, label: "Home" },
  { to: "/misc/cv", icon: faPortrait, label: "CV" },
  { to: "/research", icon: faCogs, label: "Research", partiallyActive: true },
  { to: "/talk", icon: faComments, label: "Talks", partiallyActive: true },
  { to: "/class", icon: faChalkboardTeacher, label: "Teaching", partiallyActive: true },
  { to: "/post", icon: faPencilAlt, label: "Blog", partiallyActive: true },
  { to: "/misc", icon: faBoxOpen, label: "Misc" },
];

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav
      className={`sticky top-0 w-full gap-4 bg-green-800 text-gray-100 dark:bg-green-900 text-xl z-50 mb-4`}
    >
      <div className="md:hidden flex w-full items-center justify-between">
        <Link to="/" className="block p-2 font-semibold">
          Najib Idrissi
        </Link>
        <button
          className="block p-1 m-2 bg-green-700 text-white border border-black focus:outline-none rounded-md"
          onClick={() => setExpanded(!expanded)}
          aria-controls="navbar-content"
          title={`${expanded ? "Collapse" : "Expand"} the navbar`}
        >
          <FontAwesomeIcon size="lg" fixedWidth icon={faListUl} />
        </button>
      </div>
      <div
        id="navbar-content"
        className={`${expanded ? "flex" : "hidden md:flex"} flex-row flex-wrap`}
      >
        {navbarLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block p-3"
            activeClassName="!font-bold !text-white"
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
