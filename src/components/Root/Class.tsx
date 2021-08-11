import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Mini from "../Mini";
import SeeMore from "./SeeMore";
import { Frontmatter } from "../meta";

import { section } from "./index.module.css";

export default function Class() {
  const {
    allMdx: { nodes },
  }: {
    allMdx: {
      nodes: {
        slug: string;
        wordCount: { words: number };
        frontmatter: Frontmatter;
      }[];
    };
  } = useStaticQuery(graphql`
    query RootClassQuery {
      allMdx(
        filter: {
          fields: { type: { eq: "class" } }
          frontmatter: { year: { eq: 2021 } }
        }
        sort: { fields: frontmatter___date, order: DESC }
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
            institution
            cursus
            courseHours
            courseTypes
            year
            tags
            ...allUrlsFragment
          }
        }
      }
    }
  `);

  return (
    <section className={section}>
      <h2>Teaching (2021&ndash;2022)</h2>
      <div>
        {nodes.map(({ frontmatter, slug, wordCount: { words } }) => (
          <Mini
            key={slug}
            type="class"
            slug={slug}
            frontmatter={frontmatter}
            noLink={words === 0}
          />
        ))}
      </div>
      <SeeMore to="/class">teaching</SeeMore>
    </section>
  );
}
