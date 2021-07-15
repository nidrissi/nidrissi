import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { Frontmatter } from ".";

function format(value: string): JSX.Element {
  return value && (
    <div>{value}.</div>
  );
}

const courseTypeAssociation: {
  [key: string]: {
    label: string;
    title?: string;
  };
} = {
  CM: {
    label: "Lectures",
  },
  TD: {
    label: "Exercise sessions",
    title: "Directed exercise sessions where students work on their own before the solution to each exercise is given to the whole group."
  },
  TP: {
    label: "Practical work",
    title: "Supervised programming exercises on computers."
  },
  O: {
    label: "Organization",
    title: "Organization of the overall course, including exams, and coordination between the different exercise groups."
  },
  Colles: {
    label: "Oral exams",
    title: "Graded weekly oral exams."
  },
  T: {
    label: "Tutoring",
    title: "Weekly sessions where students can ask questions and work out exercises seen before."
  },
};

interface CourseTypeBlockProps {
  type: string;
}

function CourseTypeBlock({ type }: CourseTypeBlockProps) {
  const [expanded, setExpanded] = useState(false);

  const { label, title } = courseTypeAssociation[type];
  return (
    <div
      // If there is a title, put a green border when the div is either hovered or focused
      // and the cursor becomes a pointer when the div is hovered and not already expanded
      className={`block px-1 border border-transparent border-dashed rounded-md ${title ? 'hover:border-green-400 focus:border-green-400 dark:hover:border-green-800 dark:focus:border-green-800' + (expanded ? '' : ' hover:cursor-pointer') : ''}`}
      onFocus={() => title && setExpanded(true)}
      onBlur={() => setExpanded(false)}
      title={title && "Click for more details."}
      tabIndex={title ? 0 : -1}
    >
      {!expanded && label}
      {title && (
        expanded ? (
          `[${title}]`
        ) : (
          <FontAwesomeIcon icon={faQuestionCircle} size="xs" className="ml-1" />
        ))}
    </div>
  );
}

function formatCourseType(courseTypes?: string[]): JSX.Element[] {
  return courseTypes?.map(type => (
    <CourseTypeBlock key={type} type={type} />
  ));
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
      {format(courseHours ? `${courseHours}\xa0h` : null)}
    </>
  );
}
