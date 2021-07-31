import React from "react";
import { ImageDataLike } from "gatsby-plugin-image";

import MetaClass from "./class";
import MetaData from "./data";
import { actualTitle } from "../Page";
import Links, { Urls } from "./links";
import MetaResearch from "./research";
import MetaTalk from "./talk";

export interface LocalImage {
  childImageSharp: {
    gatsbyImageData: ImageDataLike;
    original: {
      src: string;
    };
  };
};

export interface Frontmatter {
  title: string;
  date: string;
  lastMod?: string;
  lang?: string;
  tags?: string[];
  urls?: Urls;
  localImages?: LocalImage[];
  // Research
  accepted?: string;
  publication?: string;
  status?: string;
  authors?: string[];
  // Class
  institution?: string;
  cursus?: string;
  courseTypes?: string[];
  courseHours?: string;
  year?: string;
  // Event
  event?: string;
  location?: string;
  online?: boolean;
  TBA?: boolean;
};

interface MetaProps {
  frontmatter: Frontmatter;
  type: string;
}

export default function Meta({ frontmatter, type }: MetaProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 content-center text-gray-700 dark:text-gray-400 mb-2">
        {type === 'research' ? (
          <MetaResearch frontmatter={frontmatter} />
        ) : type === 'class' ? (
          <MetaClass frontmatter={frontmatter} />
        ) : type === 'talk' ? (
          <MetaTalk frontmatter={frontmatter} />
        ) : (
          <MetaData frontmatter={frontmatter} />
        )}
      </div>
      <Links urls={frontmatter.urls} title={actualTitle(frontmatter, type)} />
    </div>
  );
}
