import React from "react";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getImage, GatsbyImage, ImageDataLike } from "gatsby-plugin-image";

import * as styles from "./PeccotCard.module.css";

interface PeccotCardProps {
  link: string;
  number: string;
  date: string;
  video: string;
  image: ImageDataLike;
  children: JSX.Element;
}

export default function PeccotCard({
  link,
  number,
  date,
  image,
  children,
}: PeccotCardProps) {
  const parsedImage = getImage(image);
  if (!parsedImage) {
    throw new Error(`Bad image: ${image}`);
  }
  return (
    <article className={`${styles.card} prose`}>
      <a href={link} target="_blank" rel="noreferrer noopener">
        <GatsbyImage
          alt={`Photo of the lecture ${number}`}
          image={parsedImage}
        />
      </a>
      <div>
        <strong>Lesson {number}</strong>
        <br />
        <em>{date}</em>
      </div>
      <div>{children}</div>
      <a href={link} rel="noreferrer noopener">
        <FontAwesomeIcon icon={faVideo} />
        &nbsp; Video
      </a>
    </article>
  );
}
