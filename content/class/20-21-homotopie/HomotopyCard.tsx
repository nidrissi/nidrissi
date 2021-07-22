import React from "react";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  number: number;
  date: string;
  hours: string;
  video: string;
  children: JSX.Element;
};

export default function HomotopyCard({ number, date, hours, children, video }: CardProps) {
  return (
    <section className="flex flex-col border border-gray-400 dark:border-gray-900 rounded-md gap-2">
      <header className="p-1 bg-gray-200 dark:bg-gray-900 rounded-t-md">
        <span className="font-semibold text-lg">Lecture {number}</span>
        {' · '}
        {new Date(date).toLocaleDateString()}
        {' '}
        {hours}
      </header>
      <div className="flex-grow p-1">{children}</div>
      <a
        href={video}
        className="block text-center bg-gray-200 dark:bg-gray-900 rounded-b-md p-1"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FontAwesomeIcon icon={faVideo} />
        &nbsp;
        Video
      </a>
    </section>
  );
}
