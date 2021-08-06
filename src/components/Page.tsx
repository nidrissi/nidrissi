import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import React from "react";

import Layout from "./Layout";
import Meta, { Frontmatter } from "./meta";
import NextPrevious, { NextOrPreviousItem } from "./NextPrevious";
import Embed from "./Embed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";

interface PageTemplateProps {
  data: {
    mdx: {
      body: string;
      fields: {
        type: string;
      };
      excerpt: string;
      frontmatter: Frontmatter;
    };
    previous: NextOrPreviousItem;
    next: NextOrPreviousItem;
  };
};

export function actualTitle(
  frontmatter: {
    title: string;
    event?: string;
    location?: string;
    year?: string;
  },
  type: string
): string {
  return type === 'talk' ? (
    `${frontmatter.event} @ ${frontmatter.location}`
  ) : type === 'class' ? (
    `${frontmatter.title} (${frontmatter.year}–${Number(frontmatter.year) + 1})`
  ) : (
    frontmatter.title
  );
}

export function heldOnline(type: string, frontmatter: Frontmatter): JSX.Element {
  return type === "talk" && frontmatter.online ? (
    <>
      &nbsp;
      <FontAwesomeIcon
        icon={faNetworkWired}
        title="The talk was held online."
        size="xs"
      />
    </>
  ) : null;
}

export default function PageTemplate({ data }: PageTemplateProps) {
  const {
    body, frontmatter, excerpt, fields: { type }
  } = data.mdx;

  const parsedTitle = actualTitle(frontmatter, type);

  return (
    <Layout
      title={parsedTitle}
      description={excerpt}
      date={frontmatter.date}
      lastMod={frontmatter.lastMod}
      lang={frontmatter.lang}
    >
      <header className="mb-6 max-w-2xl mx-auto">
        <h1 role="banner" className="font-serif text-4xl font-extrabold text-gray-900 dark:text-gray-200">
          {parsedTitle}
          {heldOnline(type, frontmatter)}
        </h1>
        <Meta frontmatter={frontmatter} type={type} />
      </header>

      {/* Large prose if research or talk abstract. */}
      <div
        className={`mx-auto max-w-2xl prose prose-blue dark:prose-dark ${["research", "talk"].includes(type) ? "prose-lg" : ""}`}
      >
        <MDXRenderer localImages={frontmatter.localImages} urls={frontmatter.urls}>
          {body}
        </MDXRenderer>
      </div>

      {type === "talk" && frontmatter.urls?.slides && (
        <Embed url={frontmatter.urls.slides.publicURL} alt={`Slides for the talk: ${parsedTitle}`} />
      )}
      {type === "talk" && frontmatter.urls?.notes && (
        <Embed url={frontmatter.urls.notes.publicURL} alt={`Notes for the talk: ${parsedTitle}`} />
      )}
      {type === "research" && frontmatter.urls?.read && (
        <Embed url={frontmatter.urls.read.publicURL} alt={`Read the research document: ${parsedTitle}`} />
      )}

      <NextPrevious next={data.next} previous={data.previous} type={type} />
    </Layout>
  );
}

export const query = graphql`
  query (
    $id: String,
    $previousId: String,
    $nextId: String,
    ) {
    mdx(id: { eq: $id }) {
      body
      fields {
        type
      }
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date
        lastMod
        lang
        tags
        publication
        authors
        accepted
        institution
        cursus
        courseTypes
        courseHours
        year
        event
        TBA
        location
        online
        ... allUrlsFragment
        localImages {
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG)
            original {
              src
            }
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousId }) {
      slug
      frontmatter {
        title
        event
        location
        online
        year
      }
    }
    next: mdx(id: { eq: $nextId }) {
      slug
      frontmatter {
        title
        event
        location
        online
        year
      }
    }
  }
`;
