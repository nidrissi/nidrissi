import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSpinner,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./SubmitAndClearButtons.module.css";

interface SubmitAndClearButtonsProps {
  isLoading: boolean;
}

/** The submit and clear buttons used in SearchForm.
 * @param isLoading Whether the form is currently loading or not.
 */
export default function SubmitAndClearButtons({
  isLoading,
}: SubmitAndClearButtonsProps) {
  return (
    <>
      <button className={styles.btn} type="submit" disabled={isLoading}>
        <FontAwesomeIcon
          icon={isLoading ? faSpinner : faSearch}
          spin={isLoading}
        />
        &nbsp; {isLoading ? "Loading..." : "Search"}
      </button>
      <button className={styles.btn} type="reset" disabled={isLoading}>
        <FontAwesomeIcon icon={faTrashAlt} /> Clear
      </button>
    </>
  );
}
