import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";

export default function Error404() {

  return (
    <Layout title="403 Unauthorized" description="Not authorized to access this page">
      <div className="w-full h-48 rounded-xl border border-gray-400 border-dashed flex">
        <div className="my-auto mx-auto text-center">
          <h1 role="banner" className="text-4xl font-bold mb-4">403 Unauthorized</h1>
          <Link to="/" className="text-2xl text-blue-800 dark:text-indigo-300 hover:underline">
            <FontAwesomeIcon icon={faUndo} />&nbsp;
            Go back to the front page.
          </Link>
        </div>
      </div>
    </Layout>
  );
}
