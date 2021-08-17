import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faSync } from "@fortawesome/free-solid-svg-icons";

import Alert from "./Alert";
import * as styles from "./Wrapper.module.css";

interface WrapperProps {
  children: React.ReactNode;
  num?: number;
  retry?: () => void;
}

export default function Wrapper({ children, num, retry }: WrapperProps) {
  return (
    <ErrorBoundary>
      <section className={styles.wrapper}>
        <h2 id="__comments">
          <FontAwesomeIcon icon={faComments} />
          &nbsp;Comments
          {num !== undefined && ` [${num}]`}
          &nbsp;
          {retry && (
            <button onClick={() => retry()}>
              <FontAwesomeIcon icon={faSync} size="sm" />
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
      return <Alert>The whole comment section encountered a bug.</Alert>;
    }

    return this.props.children;
  }
}
