import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Mini from "../Mini";
import SeeMore from "./SeeMore";
import { Frontmatter } from "../meta";

import { section } from "./Root.module.css";

interface PostResearchQuery {
  allMdx: {
    nodes: {
      slug: string;
      frontmatter: Frontmatter;
      excerpt: string;
    }[];
  };
}

export default function Post() {
  const {
    allMdx: { nodes },
  }: PostResearchQuery = useStaticQuery(graphql`
    query RootPostQuery {
      allMdx(
        filter: { fields: { type: { eq: "post" } } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 6
      ) {
        nodes {
          slug
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date
            lastMod
            lang
            tags
            ...allUrlsFragment
          }
        }
      }
    }
  `);

  return (
    <section className={section}>
      <h2>Posts</h2>
      <div>
        {nodes.map(({ frontmatter, slug, excerpt }) => (
          <Mini
            key={slug}
            type="post"
            slug={slug}
            frontmatter={frontmatter}
            excerpt={excerpt}
          />
        ))}
      </div>
      <SeeMore to="/post">posts</SeeMore>
    </section>
  );
}
