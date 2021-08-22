import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./UsernameForm.module.css";
import { usePostUsernameMutation } from "./CommentApi";

interface UsernameFormProps {
  id: string;
}

export function UsernameForm({ id }: UsernameFormProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [inputError, setInputError] = useState<string>();
  const [triggerSetUsername, { isError, isLoading }] =
    usePostUsernameMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    } else if (currentInput.length < 3 || currentInput.length > 25) {
      setInputError("Username must be between 3 and 25 characters.");
    } else {
      triggerSetUsername({
        username: currentInput,
        id,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setCurrentInput("")}>
      <p>
        You must choose a username (3&ndash;25 characters) before commenting:
      </p>
      <div className={styles.chooser}>
        <input
          type="text"
          placeholder="Jane Doe"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          disabled={isLoading}
          className={
            inputError ? styles.error : isLoading ? styles.sending : undefined
          }
        />
        <button disabled={isLoading} type="submit">
          <FontAwesomeIcon
            icon={isLoading ? faSpinner : faArrowRight}
            spin={isLoading}
            title="Submit"
          />
        </button>
        {inputError && <div>{inputError}</div>}
        {isError && (
          <div>
            There was an error submitting the form. Retry or contact me.
          </div>
        )}
      </div>
    </form>
  );
}
