import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Mini from "../components/Mini";
import { Frontmatter } from "../components/meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faRss } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./lists.module.css";

const sections = [
  { key: "publication", title: "Publications" },
  { key: "preprint", title: "Preprints" },
  { key: "thesis", title: "Theses" },
];

interface ResearchListProps {
  data: {
    allMdx: {
      nodes: {
        slug: string;
        frontmatter: Frontmatter;
      }[];
    };
  };
}

export default function ResearchList({ data }: ResearchListProps) {
  const {
    allMdx: { nodes },
  } = data;

  return (
    <Layout
      title="Research"
      description="My research articles (both published and preprints), books, theses, etc."
    >
      <div className={styles.list}>
        <header>
          <h1 role="banner">
            <FontAwesomeIcon icon={faCogs} size="sm" />
            &nbsp; Research
          </h1>
          <Link to="/research-rss.xml">
            <FontAwesomeIcon icon={faRss} title="RSS feed for talks." />
          </Link>
        </header>
        <section>
          {sections.map(({ key, title }) => {
            const filteredNodes = nodes.filter(
              ({ frontmatter: { status } }) => status === key
            );
            return (
              <section key={key}>
                <h2>{`${title} [${filteredNodes.length}]`}</h2>
                {filteredNodes.map(({ frontmatter, slug }) => (
                  <Mini
                    key={slug}
                    type="research"
                    slug={slug}
                    frontmatter={frontmatter}
                  />
                ))}
              </section>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { type: { eq: "research" } } }
      sort: { fields: frontmatter___date, order: DESC }
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
          status
          ...allUrlsFragment
        }
      }
    }
  }
`;
