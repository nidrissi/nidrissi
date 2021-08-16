import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { selectError, clearError } from "./resultsSlice";

import * as styles from "./ErrorAlert.module.css";

/** A generic error alert. The error is taken from the redux state and
 * displayed, if any.
 */
export default function ErrorAlert() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  if (!error) {
    return null;
  }
  return (
    <div className={styles.alert}>
      <div>{error}</div>
      <button
        onClick={() => dispatch(clearError())}
        title="Close the error alert."
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}
