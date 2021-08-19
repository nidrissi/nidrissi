import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Mini from "../Mini";
import SeeMore from "./SeeMore";
import { Frontmatter } from "../meta";

import * as styles from "./Root.module.css";

interface RootTalkQuery {
  allMdx: {
    nodes: {
      slug: string;
      wordCount: { words: Number };
      frontmatter: Frontmatter;
    }[];
  };
}

export default function Talk() {
  const {
    allMdx: { nodes },
  }: RootTalkQuery = useStaticQuery(graphql`
    query RootTalkQuery {
      allMdx(
        filter: { fields: { type: { eq: "talk" } } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 6
      ) {
        nodes {
          slug
          wordCount {
            words
          }
          frontmatter {
            title
            date
            lastMod
            lang
            TBA
            online
            location
            event
            tags
            ...allUrlsFragment
          }
        }
      }
    }
  `);

  return (
    <section className={styles.section}>
      <h2>Talks</h2>
      <div>
        {nodes.map(({ frontmatter, slug, wordCount: { words } }) => (
          <Mini
            key={slug}
            type="talk"
            slug={slug}
            frontmatter={frontmatter}
            noLink={words === 0}
          />
        ))}
      </div>
      <SeeMore to="/talk">talks</SeeMore>
    </section>
  );
}
