import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./ErrorAlert.module.css";

/** A generic error alert. The error is taken from the redux state and
 * displayed, if any.
 */
export default function ErrorAlert({ error }: { error: Error }) {
  if (!error) {
    return null;
  }

  return (
    <div className={styles.alert}>
      <FontAwesomeIcon icon={faBomb} />
      &nbsp;{error.message}
    </div>
  );
}
