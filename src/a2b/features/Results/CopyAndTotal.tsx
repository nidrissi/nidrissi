import React, { SyntheticEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClipboard,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./CopyAndTotal.module.css";

interface CopyAndTotalProps {
  totalText: JSX.Element;
  outerRef: React.RefObject<HTMLDivElement>;
}
export default function CopyAndTotal({
  totalText,
  outerRef,
}: CopyAndTotalProps) {
  function getResult(): string {
    if (!outerRef.current) {
      return "";
    }
    const result = Array.from(outerRef.current.getElementsByTagName("pre")).map(
      (pre) => pre.innerText
    );
    return result.join("\n\n");
  }

  function onClickCopyAll(_e: SyntheticEvent) {
    navigator.clipboard.writeText(getResult());
  }

  function onClickDownloadAll(_e: SyntheticEvent) {
    const result = getResult();
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(result)
    );
    element.setAttribute("download", "references.bib");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className={styles.successBlock}>
      <div>
        <FontAwesomeIcon icon={faCheck} />
        &nbsp;
        {totalText}
      </div>
      <button onClick={onClickCopyAll}>
        <FontAwesomeIcon icon={faClipboard} /> Copy all
      </button>
      <button onClick={onClickDownloadAll}>
        <FontAwesomeIcon icon={faSave} /> Download all
      </button>
    </div>
  );
}
