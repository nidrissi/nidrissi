import React from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";
import Mini from "../components/Mini";
import { Frontmatter } from "../components/meta";

interface TagListProps {
  data: {
    allMdx: {
      nodes: {
        slug: string;
        excerpt: string;
        fields: {
          type: string;
        };
        frontmatter: Frontmatter;
      }[];
    };
  },
  pageContext: {
    tag: string;
  };
};

export default function TagList({ data: { allMdx: { nodes } }, pageContext: { tag } }: TagListProps) {
  return (
    <Layout title={`Pages tagged ${tag}`} description={`The list of all pages tagged ${tag}`}>
      <h1 role="banner" className="text-4xl font-bold mb-4 text-black dark:text-gray-200">
        <FontAwesomeIcon icon={faTag} size="sm" />
        &nbsp;
        Pages tagged {tag}
      </h1>
      <div className="flex flex-col gap-4">
        {nodes.map(({ frontmatter, fields: { type }, slug, excerpt }) => (
          <Mini key={slug} type={type} levelUp slug={slug} frontmatter={frontmatter} excerpt={excerpt} />
        ))}
      </div>
    </Layout>
  );
}

export const query = graphql`
query tagListQuery($tag: String!) {
  allMdx(
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { tags: { in: [$tag] } } }
  ) {
    nodes {
      slug
      excerpt(pruneLength: 250)
      fields {
        type
      }
      frontmatter {
        title
        date
        lastMod
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
        online
        location
        ...allUrlsFragment
      }
    }
  }
}
`;
