import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Mini from "../components/Mini";
import { Frontmatter } from "../components/meta";
import Pager from "./Pager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faRss } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./lists.module.css";

interface TalkListProps {
  data: {
    allMdx: {
      nodes: {
        slug: string;
        wordCount: { words: number };
        frontmatter: Frontmatter;
      }[];
    };
  };
  pageContext: {
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
}

export default function TalkList({ data, pageContext }: TalkListProps) {
  const {
    allMdx: { nodes },
  } = data;
  const { numPages, currentPage } = pageContext;
  const title = `Talks (p. ${currentPage}/${numPages})`;

  return (
    <Layout
      title={title}
      description={`The talks I have given and/or will give in the near future (page ${currentPage} out of ${numPages}).`}
    >
      <div className={styles.list}>
        <header>
          <h1 role="banner">
            <FontAwesomeIcon icon={faComments} size="sm" />
            &nbsp;
            {title}
          </h1>
          <Link to="/talk-rss.xml">
            <FontAwesomeIcon icon={faRss} title="RSS feed for talks." />
          </Link>
        </header>
        <section>
          {nodes.map(({ frontmatter, slug, wordCount: { words } }) => (
            <Mini
              key={slug}
              type="talk"
              levelUp
              slug={slug}
              frontmatter={frontmatter}
              noLink={words === 0}
            />
          ))}
        </section>
        <Pager currentPage={currentPage} numPages={numPages} type="talk" />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query talkListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { type: { eq: "talk" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
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
`;
