import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";

interface CommentListWrapperProps {
  children: React.ReactNode;
  num?: number;
}

export default function CommentListWrapper({
  children,
  num,
}: CommentListWrapperProps) {
  return (
    <ErrorBoundary>
      <section className="border-t mt-4">
        <h2 className="text-xl font-semibold mb-2" id="__comments">
          <FontAwesomeIcon icon={faComments} />
          &nbsp; Comments
          {num !== undefined && ` [${num}]`}
        </h2>
        {children}
      </section>
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Alert>The whole comment section encountered a bug.</Alert>;
    }

    return this.props.children;
  }
}
