import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapSigns, faUndo } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";
import * as styles from "./40x.module.css";

export default function Error404() {
  return (
    <Layout title="404 Not Found" description="Not Found">
      <div className={styles.hero}>
        <div>
          <h1 role="banner">
            <FontAwesomeIcon icon={faMapSigns} />
            &nbsp;Not Found
          </h1>
          <p>There is no page at this address.</p>
          <Link to="/">
            <FontAwesomeIcon icon={faUndo} size="sm" />
            &nbsp; Click here to go back to the front page.
          </Link>
        </div>
      </div>
    </Layout>
  );
}
