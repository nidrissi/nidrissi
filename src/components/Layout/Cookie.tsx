import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Cookie.module.css";

export default function Cookie() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      !document.cookie
        .split("; ")
        .find((row) => row.startsWith("cookieToastShown="))
    ) {
      setShow(true);
    }
  }, []);

  if (!show) {
    return null;
  } else {
    return (
      <aside className={styles.cookie}>
        <p>
          I use cookies to analyze traffic.{" "}
          <a href="/misc/cookie">The cookie policy can be found here.</a>
          <button
            title="Dismiss"
            onClick={() => {
              const date = new Date();
              date.setFullYear(date.getFullYear() + 1);
              setShow(false);
              document.cookie = `cookieToastShown=true; expires=${date.toUTCString()}; Secure; SameOrigin=strict`;
            }}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth />
          </button>
        </p>
      </aside>
    );
  }
}
