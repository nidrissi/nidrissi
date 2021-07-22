import React from "react";
import { Link, navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";

export default function Error404() {
  // redirect /en/* => *
  const { pathname } = useLocation();
  if (pathname.startsWith('/en/')) {
    navigate(pathname.replace(/^\/en/, ''), { replace: true });
    return null;
  } else if (pathname.startsWith('/fr/')) {
    navigate(
      pathname
        .replace(/^\/fr/, '')
        .replace(/^\/cours/, '/class')
        .replace(/^\/recherche/, '/research')
        .replace(/^\/billet/, '/post')
        .replace(/^\/expose/, '/talk'),
      { replace: true }
    );
    return null;
  }

  return (
    <Layout title="404 Not Found" description="Not Found">
      <div className="w-full h-48 rounded-xl border border-gray-400 border-dashed flex">
        <div className="my-auto mx-auto text-center">
          <h1 role="banner" className="text-4xl font-bold mb-4">404 Not Found</h1>
          <Link to="/" className="text-2xl text-blue-800 dark:text-indigo-300 hover:underline">
            <FontAwesomeIcon icon={faUndo} />&nbsp;
            Go back to the front page.
          </Link>
        </div>
      </div>
    </Layout>
  );
}
