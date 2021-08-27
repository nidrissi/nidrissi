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
  useGetUsernameQuery,
  usePatchCommentMutation,
  usePostCommentMutation,
} from "./CommentApi";
import UserDetails from "./UserDetails";
import Error from "./Error";

import * as styles from "./WriteComment.module.css";

export default function WriteComment({ pageId }: { pageId: string }) {
  const { data: client } = useGetClientQuery({});
  const { data: username } = useGetUsernameQuery(client ? {} : skipToken);

  return (
    <>
      <UserDetails />
      {client !== null && username && (
        <div className={styles.wrapDiv}>
          <WriteCommentForm pageId={pageId} />
        </div>
      )}
    </>
  );
}

type WriteCommentFormProps =
  | {
      pageId: string;
      initialValue?: never;
      id?: never;
      closeCallback?: never;
    }
  | {
      pageId: string;
      initialValue: string;
      id: string;
      closeCallback: () => void;
    };

export function WriteCommentForm({
  pageId,
  initialValue,
  id,
  closeCallback,
}: WriteCommentFormProps) {
  const [expanded, setExpanded] = useState(id !== undefined);
  const [currentInput, setCurrentInput] = useState<string>(initialValue ?? "");
  const [error, setError] = useState("");

  const [triggerPostComment, { isLoading: isPostLoading }] =
    usePostCommentMutation();
  const [triggerPatchComment, { isLoading: isPatchLoading }] =
    usePatchCommentMutation();
  const isLoading = isPostLoading || isPatchLoading;

  async function handleSubmit() {
    if (isLoading) {
      return;
    }
    setError("");
    const trueInput = currentInput?.trim() ?? "";
    setCurrentInput(trueInput);

    if (trueInput.length < 10) {
      setError("Comments must be at least 10 characters long.");
    } else if (trueInput.length > 512) {
      setError("Comments must be at most 512 characters long.");
    } else {
      try {
        if (id !== undefined) {
          await triggerPatchComment({ pageId, id, content: trueInput });
          closeCallback?.();
        } else {
          await triggerPostComment({ pageId, content: trueInput }).unwrap();
        }
        setCurrentInput("");
        setError("");
      } catch (err) {
        if (typeof err === "object" && "status" in err && err.status === 429) {
          setError(
            "You are posting too much. Please wait 10 seconds between two comments."
          );
        } else {
          setError("There was an unspecified error posting your comment.");
        }
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
      if (closeCallback) {
        closeCallback();
      } else {
        setExpanded(false);
        setError("");
        setCurrentInput("");
      }
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
          onReset={() => handleReset()}
        >
          <textarea
            autoFocus
            data-error={error !== "" || undefined}
            rows={5}
            value={currentInput}
            onChange={(e) => {
              setError("");
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
          {error && <Error>{error}</Error>}
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
            <button type="submit" disabled={isPostLoading}>
              <FontAwesomeIcon
                icon={isPostLoading ? faSpinner : faCheck}
                spin={isPostLoading}
              />
              &nbsp;Submit
            </button>
            <button type="reset" disabled={isPostLoading}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
