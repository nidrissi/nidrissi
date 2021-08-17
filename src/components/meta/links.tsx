import React from "react";
import { graphql } from "gatsby";
import {
  faCalendarDay,
  faCode,
  faDesktop,
  faVideo,
  IconDefinition,
  faLink,
  faFile,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";

import * as styles from "./links.module.css";

interface LocalFile {
  publicURL: string;
}

export interface Urls {
  arxiv: string;
  doi: string;
  mathrev: string;
  notes: LocalFile;
  read: LocalFile;
  slides: LocalFile;
  source: string;
  video: string;
  zbmath: string;
  event: string;
  custom: { label: string; url: string }[];
  customFile: { label: string; file: LocalFile }[];
}

export const allUrlsFragment = graphql`
  fragment allUrlsFragment on MdxFrontmatter {
    urls {
      read {
        publicURL
      }
      slides {
        publicURL
      }
      notes {
        publicURL
      }
      event
      video
      source
      doi
      arxiv
      mathrev
      zbmath
      custom {
        label
        url
      }
      customFile {
        label
        file {
          publicURL
        }
      }
    }
  }
`;

interface LinkDefinition {
  link: keyof Urls;
  label: string | ((id: string) => string);
  icon?: IconDefinition;
  urlBuilder?: (id: string) => string;
  titleBuilder?: (title: string) => string;
}

const linkDefinitions: LinkDefinition[] = [
  {
    link: "event",
    label: "Event",
    icon: faCalendarDay,
  },
  {
    link: "read",
    label: "Read",
    icon: faFileAlt,
    titleBuilder: (title) => `Read “${title}”.`,
  },
  {
    link: "slides",
    label: "Slides",
    icon: faDesktop,
    titleBuilder: (title) => `Slides for the talk ${title}.`,
  },
  {
    link: "video",
    label: "Video",
    icon: faVideo,
    titleBuilder: (title) => `Video(s) of ${title}.`,
  },
  {
    link: "notes",
    label: "Notes",
    icon: faBookOpen,
    titleBuilder: (title) => `Notes for ${title}.`,
  },
  {
    link: "doi",
    label: (id) => `DOI:${id}`,
    urlBuilder: (id) => `https://doi.org/${id}`,
  },
  {
    link: "arxiv",
    label: (id) => `arXiv:${id}`,
    urlBuilder: (id) => `https://arxiv.org/abs/${id}`,
  },
  {
    link: "mathrev",
    label: (id) => `MR:${id}`,
    urlBuilder: (id) => `https://www.ams.org/mathscinet-getitem?mr=${id}`,
  },
  {
    link: "zbmath",
    label: (id) => `zb:${id}`,
    urlBuilder: (id) => `https://zbmath.org/?q=an:${id}`,
  },
  {
    link: "source",
    label: "Source",
    icon: faCode,
    titleBuilder: (title) => `Source files of ${title}.`,
  },
];

interface EntryLinkProps {
  definition: LinkDefinition;
  url: string | LocalFile;
  title: string;
}

function EntryLink({ url, definition, title }: EntryLinkProps) {
  if (!url) {
    return null;
  }

  const actualUrl: string = typeof url === "string" ? url : url.publicURL;
  const label: string =
    typeof definition.label === "string"
      ? definition.label
      : definition.label(actualUrl);
  const href: string = definition.urlBuilder?.(actualUrl) ?? actualUrl;

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      title={
        definition.titleBuilder ? definition.titleBuilder(title) : undefined
      }
    >
      {definition.icon && (
        <>
          <FontAwesomeIcon icon={definition.icon} />
          &nbsp;
        </>
      )}
      {label}
    </a>
  );
}

interface LinksProps {
  urls: Urls;
  title: string;
}

export default function Links({ urls, title }: LinksProps) {
  if (!urls) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      {linkDefinitions.map((definition) => {
        if (definition.link === "custom" || definition.link === "customFile") {
          throw new Error("Custom links are not allowed here.");
        }

        const url = urls[definition.link];
        return (
          url && (
            <EntryLink
              key={typeof url === "string" ? url : url.publicURL}
              url={url}
              title={title}
              definition={definition}
            />
          )
        );
      })}

      {urls.custom?.map(({ label, url }, index) => (
        <EntryLink
          key={`custom-${index}`}
          url={url}
          title={title}
          definition={{ label, link: "custom", icon: faLink }}
        />
      ))}

      {urls.customFile?.map(({ label, file: { publicURL: url } }, index) => (
        <EntryLink
          key={`customFile-${index}`}
          url={url}
          title={title}
          definition={{ label, link: "customFile", icon: faFile }}
        />
      ))}
    </div>
  );
}
