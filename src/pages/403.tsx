import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUndo } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/Layout";
import * as styles from "./40x.module.css";

export default function Error403() {
  return (
    <Layout
      title="403 Forbidden"
      description="Not authorized to access this page"
    >
      <div className={styles.hero}>
        <div>
          <h1 role="banner">
            <FontAwesomeIcon icon={faLock} />
            &nbsp;Forbidden
          </h1>
          <p>You are not authorized to access this page.</p>
          <p>
            <Link to="/">
              <FontAwesomeIcon icon={faUndo} size="sm" />
              &nbsp; Go back to the front page.
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
