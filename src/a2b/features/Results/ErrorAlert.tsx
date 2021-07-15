import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { selectError, clearError } from "./resultsSlice";

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
    <div className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100 p-2 rounded-lg my-2 flex">
      <div className="flex-grow">
        {error}
      </div>
      <div>
        <button
          onClick={() => dispatch(clearError())}
          title="Close the error alert."
          className="px-1"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}
