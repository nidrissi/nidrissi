import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Mini from "../Mini";
import SeeMore from "./SeeMore";
import { Frontmatter } from "../meta";

interface RootResearchQuery {
  allMdx: {
    nodes: {
      slug: string;
      frontmatter: Frontmatter;
    }[];
  };
};

export default function Research() {
  const { allMdx: { nodes } }: RootResearchQuery = useStaticQuery(graphql`
query RootResearchQuery {
  allMdx(
    filter: {fields: {type: {eq: "research"}}, frontmatter: {status: {regex: "/publication|preprint/"}}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    nodes {
      slug
      frontmatter {
        title
        date
        lastMod
        lang
        tags
        authors
        publication
        accepted
        tags
        ...allUrlsFragment
      }
    }
  }
}`);

  return (
    <section>
      <h2 className="text-4xl font-bold mb-4">Research</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(24rem, 1fr))" }}>
        {nodes.map(({ frontmatter, slug }) => {
          return (
            <Mini key={slug} type="research" slug={slug} frontmatter={frontmatter} />
          );
        })}
      </div>
      <SeeMore to="/research">research</SeeMore>
    </section>
  );
}
