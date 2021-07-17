import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
import { Helmet } from "react-helmet";

interface SEOQuery {
  site: {
    siteMetadata: {
      siteTitle: string;
      siteUrl: string;
      author: {
        name: string;
        social: {
          twitter: string;
        };
      };
    };
  };
};

export interface SEOProps {
  title: string;
  description: string;
  date?: string;
  lastMod?: string;
};

export default function SEO({ title, description, date, lastMod }: SEOProps) {
  const {
    site: {
      siteMetadata: { siteTitle, siteUrl, author: { name, social: { twitter } } },
    },
  }: SEOQuery = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            siteUrl
            author {
              name
              social {
                twitter
              }
            }
          }
        }
      }
    `
  );
  const { pathname } = useLocation();

  const isRoot = title === siteTitle;
  const trueTitle = isRoot ? siteTitle : `${title} · ${siteTitle}`;

  return (
    <Helmet
      htmlAttributes={{ lang: 'en', }}
      title={trueTitle}
      defer={false}
    >
      <meta charSet="utf-8" />

      <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com; img-src 'self' data: www.googletagmanager.com; connect-src 'self' analytics.google.com stats.g.doubleclick.net export.arxiv.org localhost:* ws://localhost:*; font-src 'self' data:;" />

      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${twitter}`} />
      <meta name="twitter:creator" content={`@${twitter}`} />
      <meta name="twitter:description" content={description} />

      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:type" content={isRoot ? "profile" : "article"} />
      <meta property="og:title" content={trueTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:profile:first_name" content={name.split(' ')[0]} />
      <meta property="og:profile:last_name" content={name.split(' ')[1]} />
      {date && <meta property="og:article:published_time" content={new Date(date).toISOString()} />}
      {lastMod && <meta property="og:article:modified_time" content={new Date(lastMod).toISOString()} />}
    </Helmet>
  );
}
