import React from "react";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getImage, GatsbyImage, ImageDataLike } from 'gatsby-plugin-image';

interface PeccotCardProps {
  link: string;
  number: string;
  date: string;
  video: string;
  image: ImageDataLike;
  children: JSX.Element;
};

export default function PeccotCard({ link, number, date, image, children }: PeccotCardProps) {
  return (
    <div className="border dark:border-gray-900 rounded-md flex flex-col gap-1 h-full">
      <a href={link} className="block" target="_blank" rel="noreferrer noopener">
        <GatsbyImage
          alt={`Photo of the lecture ${number}`}
          image={getImage(image)}
          imgClassName="rounded-t-md" />
      </a>
      <div className="p-2 leading-none">
        <span className="font-bold text-xl">Lesson {number}</span>
        <br />
        <span className="text-gray-700 dark:text-gray-300 font-semibold">{date}</span>
      </div>
      <div className="flex-grow p-2 leading-none py-1">
        {children}
      </div>
      <a className="block p-2 bg-gray-100 dark:bg-gray-900 rounded-b-md text-center" href={link} rel="noreferrer noopener">
        <FontAwesomeIcon icon={faVideo} />&nbsp;
        Video
      </a>
    </div>
  );
}
