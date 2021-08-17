import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Mini from "../components/Mini";
import { Frontmatter } from "../components/meta";
import Pager from "./Pager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faRss } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./lists.module.css";

interface PostListProps {
  data: {
    allMdx: {
      nodes: {
        slug: string;
        excerpt: string;
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

export default function PostList({ data, pageContext }: PostListProps) {
  const {
    allMdx: { nodes },
  } = data;
  const { numPages, currentPage } = pageContext;
  const title = `Posts (p. ${currentPage}/${numPages})`;

  return (
    <Layout
      title={title}
      description={`The blog posts I have written (page ${currentPage} out of ${numPages}).`}
    >
      <div className={styles.list}>
        <header>
          <h1>
            <FontAwesomeIcon icon={faPen} size="sm" />
            &nbsp;
            {title}
          </h1>
          <Link to="/post-rss.xml">
            <FontAwesomeIcon icon={faRss} title="RSS feed for posts." />
          </Link>
        </header>
        <section>
          {nodes.map(({ frontmatter, slug, excerpt }) => (
            <Mini
              key={slug}
              type="post"
              levelUp
              slug={slug}
              frontmatter={frontmatter}
              excerpt={excerpt}
            />
          ))}
        </section>
      </div>
      <Pager currentPage={currentPage} numPages={numPages} type="post" />
    </Layout>
  );
}

export const query = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { type: { eq: "post" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
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
`;
