import React, { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

import {
  useGetClientQuery,
  useGetUserNameQuery,
  usePostCommentMutation,
} from "./CommentApi";
import UserDetails from "./UserDetails";
import Alert from "./Alert";

import * as styles from "./NewComment.module.css";

export default function NewComment({ pageId }: { pageId: string }) {
  const { data: client } = useGetClientQuery({});
  const { data: userName } = useGetUserNameQuery(client ? {} : skipToken);

  return (
    <>
      <div>
        <UserDetails />
      </div>
      {client !== null && userName && <NewCommentForm pageId={pageId} />}
    </>
  );
}

interface NewCommentFormProps {
  pageId: string;
}

function NewCommentForm({ pageId }: NewCommentFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [inputError, setInputError] = useState<string>();

  const [triggerPostComment, { isLoading, isError }] = usePostCommentMutation();

  async function handleSubmit() {
    if (isLoading) {
      return;
    }
    setInputError(undefined);
    const trueInput = currentInput?.trim() ?? "";
    setCurrentInput(trueInput);

    if (trueInput.length < 10) {
      setInputError("Comments must be at least 10 characters long.");
    } else if (trueInput.length > 512) {
      setInputError("Comments must be at most 512 characters long.");
    } else {
      try {
        await triggerPostComment({ pageId, content: trueInput }).unwrap();
        setCurrentInput("");
        setInputError(undefined);
      } catch (err) {
        setInputError(err);
      }
    }
  }

  function handleReset() {
    const shouldReset =
      currentInput.trim().length === 0 ||
      window.confirm(
        "Are you sure that you want to cancel writing this comment?"
      );

    if (shouldReset) {
      setExpanded(false);
      setInputError(undefined);
      setCurrentInput("");
    }
  }

  return (
    <div className={styles.newComment}>
      {!expanded ? (
        <button className={styles.write} onClick={() => setExpanded(true)}>
          <FontAwesomeIcon icon={faEdit} />
          &nbsp;Write comment
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          onReset={handleReset}
        >
          <textarea
            autoFocus
            className={inputError ? styles.error : ""}
            rows={5}
            value={currentInput}
            onChange={(e) => {
              setInputError(undefined);
              setCurrentInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                if (window.confirm("Do you want to post this comment?")) {
                  handleSubmit();
                }
              } else if (e.key === "Escape") {
                handleReset();
              }
            }}
            disabled={isLoading}
            placeholder="Type a comment (up to 512 characters) here..."
          />
          {inputError && <Alert>{inputError}</Alert>}
          {isError && (
            <Alert>There was an unspecified error posting your comment.</Alert>
          )}
          <div className={styles.footer}>
            <div>
              <a
                href="https://commonmark.org/help/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <FontAwesomeIcon icon={faMarkdown} />
                &nbsp;Markdown reference
              </a>
            </div>
            <button type="submit" disabled={isLoading}>
              <FontAwesomeIcon
                icon={isLoading ? faSpinner : faCheck}
                spin={isLoading}
              />
              &nbsp;Submit
            </button>
            <button type="reset" disabled={isLoading}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
