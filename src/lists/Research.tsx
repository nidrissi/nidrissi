import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Mini from "../components/Mini";
import { Frontmatter } from "../components/meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faRss } from "@fortawesome/free-solid-svg-icons";

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
};

export default function ResearchList({ data }: ResearchListProps) {
  const { allMdx: { nodes } } = data;

  return (
    <Layout title="Research" description="My research articles (both published and preprints), books, theses, etc.">
      <Link to="/research-rss.xml" className="block float-right w-min">
        <FontAwesomeIcon icon={faRss} title="RSS feed for talks." size="2x" />
      </Link>
      <h1 role="banner" className="text-4xl font-extrabold mb-6 text-black dark:text-gray-200">
        <FontAwesomeIcon icon={faCogs} size="sm" />
        &nbsp;
        Research
      </h1>
      <div className="flex flex-col gap-6">
        {sections.map(({ key, title }) => {
          const filteredNodes = nodes.filter(({ frontmatter: { status } }) => status === key);
          return (
            <section key={key}>
              <h2 className="text-2xl font-bold mb-4">
                {`${title} [${filteredNodes.length}]`}
              </h2>
              <div className="flex flex-col gap-4">
                {filteredNodes
                  .map(({ frontmatter, slug }) => (
                    <Mini key={slug} type="research" slug={slug} frontmatter={frontmatter} />
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
query {
  allMdx(
    filter: {fields: {type: {eq: "research"}}}
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
        status
        ...allUrlsFragment
      }
    }
  }
}`;
