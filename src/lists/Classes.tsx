import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Mini from "../components/Mini";
import { Frontmatter } from "../components/meta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

interface ClassListProps {
  data: {
    allMdx: {
      group: {
        fieldValue: string;
        nodes: {
          slug: string;
          wordCount: { words: number; };
          frontmatter: Frontmatter;
        }[];
      }[];
    };
  };
};

export default function ClassList({ data: { allMdx: { group } } }: ClassListProps) {

  return (
    <Layout title="Teaching" description="The classes I have taught and/or am currently teaching.">
      <h1 role="banner" className="text-4xl font-bold mb-3 text-black dark:text-gray-200">
        <FontAwesomeIcon icon={faChalkboardTeacher} size="sm" className="mr-2" />Teaching
      </h1>
      <div className="flex flex-col gap-6">
        {group
          // Sort in reverse year order
          .sort((g1, g2) => g2.fieldValue.localeCompare(g1.fieldValue))
          .map(({ fieldValue: year, nodes }) => (
            <div key={year}>
              <h2 className="text-2xl font-bold mb-2">
                Academic year {year}&ndash;{Number(year) + 1}
              </h2>
              <div className="flex flex-col gap-2">
                {nodes
                  .map(({ frontmatter, slug, wordCount: { words } }) => (
                    <Mini key={slug} type="class" slug={slug} frontmatter={frontmatter} noLink={words === 0} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export const query = graphql`
{
  allMdx(
    filter: {fields: {type: {eq: "class"}}}
    sort: {fields: frontmatter___date, order: DESC}
  ) {
    group(field: frontmatter___year) {
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
          courseHours
          courseTypes
          cursus
          year
          tags
          ...allUrlsFragment
        }
      }
      fieldValue
    }
  }
}
`;
