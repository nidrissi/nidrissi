import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

import Alert from "./Alert";
import { Comment } from "./Single";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

import * as styles from "./NewComment.module.css";

interface NewCommentProps {
  pageId: string;
  client?: ClientPrincipal;
  setClient: React.Dispatch<React.SetStateAction<ClientPrincipal | undefined>>;
  pushComment: (comment: Comment) => void;
}

export default function NewComment({
  client,
  setClient,
  pageId,
  pushComment,
}: NewCommentProps) {
  const [userName, setUserName] = useState<string>();

  return (
    <>
      <div>
        <UserDetails
          client={client}
          setClient={setClient}
          userName={userName}
          setUserName={setUserName}
        />
      </div>
      {client !== null && userName && (
        <NewCommentForm pageId={pageId} pushComment={pushComment} />
      )}
    </>
  );
}

interface NewCommentFormProps {
  pageId: string;
  pushComment: (comment: Comment) => void;
}

function NewCommentForm({ pageId, pushComment }: NewCommentFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [error, setError] = useState<string>();

  const formRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (expanded) {
      formRef.current?.focus();
    }
  }, [expanded]);

  const [sending, setSending] = useState(false);
  async function handleSubmit() {
    if (sending) {
      return;
    }
    setSending(true);
    setError(undefined);
    try {
      const trueInput = currentInput?.trim() ?? "";
      setCurrentInput(trueInput);

      if (trueInput.length < 10) {
        setError("Comments must be at least 10 characters long.");
      } else if (trueInput.length > 512) {
        setError("Comments must be at most 512 characters long.");
      } else {
        const response = await fetch(`/api/comment/${pageId}`, {
          method: "POST",
          body: JSON.stringify({ content: trueInput }),
        });
        if (response.ok) {
          const comment = await response.json();
          console.log(comment);
          pushComment(comment);
          setCurrentInput("");
          setSending(false);
        } else {
          if (response.status === 429) {
            setError(
              "You are posting too much. Please wait 10 seconds between two comments."
            );
          } else {
            throw new Error();
          }
        }
      }
    } catch {
      setError("There was an unspecified error submitting your comment.");
    } finally {
      setSending(false);
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
      setError(undefined);
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
            ref={formRef}
            className={error ? styles.error : ""}
            rows={5}
            value={currentInput}
            onChange={(e) => {
              setError(undefined);
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
            disabled={sending}
            placeholder="Type a comment (up to 512 characters) here..."
          />
          {error && <Alert>{error}</Alert>}
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
            <button type="submit" disabled={sending}>
              <FontAwesomeIcon
                icon={sending ? faSpinner : faCheck}
                spin={sending}
              />
              &nbsp;Submit
            </button>
            <button type="reset" disabled={sending}>
              <FontAwesomeIcon icon={faTimes} />
              &nbsp;Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
