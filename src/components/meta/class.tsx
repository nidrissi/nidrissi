import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { Frontmatter } from ".";

import * as styles from "./class.module.css";

function format(value?: string): React.ReactNode {
  return value && <span>{value}.</span>;
}

const courseTypeAssociation: Map<
  string,
  {
    label: string;
    title?: string;
  }
> = new Map([
  [
    "CM",
    {
      label: "lectures",
    },
  ],
  [
    "TD",
    {
      label: "exercise sessions",
      title:
        "Directed exercise sessions where students work on their own before the solution to each exercise is given to the whole group.",
    },
  ],
  [
    "TP",
    {
      label: "practical work",
      title: "Supervised programming exercises on computers.",
    },
  ],
  [
    "O",
    {
      label: "organization",
      title:
        "Organization of the overall course, including exams, and coordination between the different exercise groups.",
    },
  ],
  [
    "Colles",
    {
      label: "oral exams",
      title: "Graded weekly oral exams.",
    },
  ],
  [
    "T",
    {
      label: "tutoring",
      title:
        "Weekly sessions where students can ask questions and work out exercises seen before.",
    },
  ],
]);

interface CourseTypeBlockProps {
  type: string;
  capitalize?: boolean;
}

function CourseTypeBlock({ type, capitalize }: CourseTypeBlockProps) {
  const [popped, setPopped] = useState(false);

  const association = courseTypeAssociation.get(type);

  if (association === undefined) {
    throw new Error(`Unknown course type: ${type}`);
  }

  const { label, title } = association;

  return (
    <span
      className={styles.block}
      data-cap={capitalize}
      onFocus={() => title && setPopped(true)}
      onBlur={() => setPopped(false)}
      title={title && "Click for more details."}
      tabIndex={title ? 0 : -1}
    >
      {label}
      {title && (
        <>
          &nbsp;
          <FontAwesomeIcon icon={faInfoCircle} size="sm" />
        </>
      )}
      {title && popped && (
        <div role="alert" className={styles.popup}>
          {title}
        </div>
      )}
    </span>
  );
}

function formatCourseType(courseTypes?: string[]): React.ReactNode {
  return (
    <>
      {courseTypes?.map((type, i) => (
        <React.Fragment key={type}>
          {i > 0 && " & "}
          <CourseTypeBlock type={type} capitalize={i === 0} />
        </React.Fragment>
      ))}
      {"."}
    </>
  );
}

interface MetaClassProps {
  frontmatter: Frontmatter;
}

export default function MetaClass({ frontmatter }: MetaClassProps) {
  const { cursus, institution, courseTypes, courseHours } = frontmatter;

  return (
    <p>
      {format(institution)} {format(cursus)} {formatCourseType(courseTypes)}
      {/* \xa0 = non-breaking space */}
      {format(courseHours ? ` ${courseHours}\xa0h` : undefined)}
    </p>
  );
}
