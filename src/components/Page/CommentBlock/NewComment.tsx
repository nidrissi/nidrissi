import {
  faCheck,
  faEdit,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Alert from "./Alert";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

interface NewCommentProps {
  pageId: string;
  client: ClientPrincipal;
  setClient: React.Dispatch<React.SetStateAction<ClientPrincipal>>;
}

export default function NewComment({
  client,
  setClient,
  pageId,
}: NewCommentProps) {
  const [userName, setUserName] = useState<string>(null);

  return (
    <div className="mb-4">
      <div className="mb-2">
        <UserDetails
          client={client}
          setClient={setClient}
          userName={userName}
          setUserName={setUserName}
        />
      </div>
      {client !== null && userName && <NewCommentForm pageId={pageId} />}
    </div>
  );
}

function NewCommentForm({ pageId }: { pageId: string }) {
  const [expanded, setExpanded] = useState(false);
  const [currentInput, setCurrentInput] = useState("");
  const [error, setError] = useState<string>(null);

  const formRef = useRef<HTMLTextAreaElement>();
  useEffect(() => {
    if (expanded) {
      formRef.current.focus();
    }
  }, [expanded]);

  const [sending, setSending] = useState(false);
  async function handleSubmit() {
    if (sending) {
      return;
    }
    setSending(true);
    setError(null);
    try {
      const trueInput = currentInput.trim();
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
          // TODO do better than a full window reload
          window.location.reload();
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
      setCurrentInput("");
    }
  }

  return (
    <div>
      {!expanded && (
        <button
          className="block leading-none p-2 rounded-md w-full bg-green-200 dark:bg-green-800 hover:bg-green-300 dark:hover:bg-green-700"
          onClick={() => setExpanded(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
          &nbsp; Write comment
        </button>
      )}
      <form
        className={expanded ? null : "hidden"}
        onKeyPress={(e) => {
          if (e.ctrlKey && e.code === "Enter") {
            handleSubmit();
          }
          if (e.code === "Escape") {
            handleReset();
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        onReset={handleReset}
      >
        <textarea
          ref={formRef}
          className={
            "w-full text-black " +
            (error ? "focus:ring-red-400 dark:focus:ring-red-600" : "")
          }
          rows={5}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          disabled={sending}
          placeholder="Type a comment (up to 512 characters) here..."
        />
        {error && <Alert>{error}</Alert>}
        <div className="flex gap-2 mt-1">
          <a
            href="https://commonmark.org/help/"
            target="_blank"
            rel="noreferrer noopener"
            className="block text-xs align-middle text-blue-800 dark:text-indigo-300 hover:underline"
          >
            (markdown reference)
          </a>
          <div className="flex-grow" />
          <button
            type="submit"
            disabled={sending}
            className="block p-1 leading-none bg-green-300 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-900"
          >
            <FontAwesomeIcon
              icon={sending ? faSpinner : faCheck}
              spin={sending}
              className="mr-1"
            />
            Submit
          </button>
          <button
            type="reset"
            disabled={sending}
            className="block p-1 leading-none bg-gray-300 hover:bg-red-700 hover:text-white dark:bg-gray-900 dark:hover:bg-red-400 dark:hover:text-black rounded-sm"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-1" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
