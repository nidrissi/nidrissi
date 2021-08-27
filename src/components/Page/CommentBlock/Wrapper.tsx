import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faSignOutAlt,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

import Error from "./Error";
import * as styles from "./Wrapper.module.css";
import { useGetClientQuery } from "./CommentApi";

interface WrapperProps {
  children: React.ReactNode;
  num?: number;
  retry?: () => void;
}

export default function Wrapper({ children, num, retry }: WrapperProps) {
  const { data: client } = useGetClientQuery({});

  const title =
    num === undefined
      ? "Comments"
      : num === 0
      ? "No comments yet"
      : num === 1
      ? "1 comment"
      : `${num} comments`;

  return (
    <ErrorBoundary>
      <section className={styles.wrapper}>
        <h2 id="__comments">
          <div>
            <FontAwesomeIcon icon={faComments} />
            &nbsp;
            {title}
          </div>
          {retry && (
            <button onClick={() => retry()} className={styles.retry}>
              <FontAwesomeIcon icon={faSync} />
            </button>
          )}
          {client && (
            <button
              onClick={() => {
                const location = window.location.pathname;
                window.location.assign(
                  `/.auth/logout?post_logout_redirect_uri=${encodeURI(
                    location + "#__comments"
                  )}`
                );
              }}
              className={styles.logout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </h2>
        {children}
      </section>
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean }, {}> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return <Error>The whole comment section encountered a bug.</Error>;
    }

    return this.props.children;
  }
}
