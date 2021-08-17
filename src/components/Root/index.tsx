import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../Layout";
import Contact from "./Contact";
import Research from "./Research";
import Class from "./Class";
import Talk from "./Talk";
import Post from "./Post";

import * as styles from "./Root.module.css";

interface IndexQuery {
  site: {
    siteMetadata: {
      siteTitle: string;
      siteDescription: string;
    };
  };
  file: {
    publicURL: string;
  };
}

export default function Index({ children }: { children: React.ReactNode }) {
  const {
    site: {
      siteMetadata: { siteTitle, siteDescription },
    },
  }: IndexQuery = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteDescription
        }
      }
    }
  `);

  return (
    <Layout title={siteTitle} description={siteDescription}>
      <article>
        <div className={styles.photo}>
          <StaticImage
            src="photo.jpg"
            alt="Photo of myself."
            loading="eager"
            placeholder="tracedSVG"
          />
        </div>
        <div className={"prose " + styles.description}>
          <h1 role="banner">{siteTitle}</h1>
          {children}
        </div>
        <Contact />
      </article>
      <div className={styles.rootLists}>
        <Research />
        <Class />
        <Talk />
        <Post />
      </div>
    </Layout>
  );
}
