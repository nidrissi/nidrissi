import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Frontmatter } from ".";

import * as styles from "./class.module.css";

function format(value?: string): React.ReactNode {
  return value && <div>{value}.</div>;
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
      label: "Lectures",
    },
  ],
  [
    "TD",
    {
      label: "Exercise sessions",
      title:
        "Directed exercise sessions where students work on their own before the solution to each exercise is given to the whole group.",
    },
  ],
  [
    "TP",
    {
      label: "Practical work",
      title: "Supervised programming exercises on computers.",
    },
  ],
  [
    "O",
    {
      label: "Organization",
      title:
        "Organization of the overall course, including exams, and coordination between the different exercise groups.",
    },
  ],
  [
    "Colles",
    {
      label: "Oral exams",
      title: "Graded weekly oral exams.",
    },
  ],
  [
    "T",
    {
      label: "Tutoring",
      title:
        "Weekly sessions where students can ask questions and work out exercises seen before.",
    },
  ],
]);

interface CourseTypeBlockProps {
  type: string;
}

function CourseTypeBlock({ type }: CourseTypeBlockProps) {
  const [popped, setPopped] = useState(false);

  const association = courseTypeAssociation.get(type);

  if (association === undefined) {
    throw new Error(`Unknown course type: ${type}`);
  }

  const { label, title } = association;

  return (
    <div
      className={styles.block}
      onFocus={() => title && setPopped(true)}
      onBlur={() => setPopped(false)}
      title={title && "Click for more details."}
      tabIndex={title ? 0 : -1}
    >
      {label}.
      {title && (
        <>
          &nbsp;
          <FontAwesomeIcon icon={faQuestionCircle} size="xs" />
        </>
      )}
      {title && popped && (
        <div role="alert" className={styles.popup}>
          {title}
        </div>
      )}
    </div>
  );
}

function formatCourseType(courseTypes?: string[]): JSX.Element[] | undefined {
  return courseTypes?.map((type) => <CourseTypeBlock key={type} type={type} />);
}

interface MetaClassProps {
  frontmatter: Frontmatter;
}

export default function MetaClass({ frontmatter }: MetaClassProps) {
  const { cursus, institution, courseTypes, courseHours } = frontmatter;

  return (
    <>
      {format(institution)}
      {format(cursus)}
      {formatCourseType(courseTypes)}
      {/* \xa0 = non-breaking space */}
      {format(courseHours ? `${courseHours}\xa0h` : undefined)}
    </>
  );
}
