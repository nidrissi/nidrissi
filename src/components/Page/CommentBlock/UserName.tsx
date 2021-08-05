import { faArrowRight, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import Alert from "./Alert";
import { ClientPrincipal, formatClient } from "./ClientPrincipal";

interface UserNameProps {
  client: ClientPrincipal;
  onOk: () => void;
}

export default function UserName({ onOk, client }: UserNameProps) {
  const [userName, setUserName] = useState<string>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUserName = useCallback(async () => {
    try {
      const response = await fetch(`/api/user`);
      if (response.ok) {
        const body = await response.json();
        setUserName(body.userName);
        setError(false);
      }
      else if (response.status === 404) {
        setUserName(null);
      }
      else {
        throw new Error();
      }
    } catch {
      setUserName(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUserName(); }, [fetchUserName]);
  useEffect(() => {
    if (userName !== null) {
      onOk();
    }
  }, [userName, onOk]);

  if (error) {
    return (
      <Alert retry={() => {
        setError(false);
        if (!loading) {
          setLoading(true);
          setTimeout(() => fetchUserName(), 500);
        }
      }}>
        There was an error fetching your username.
      </Alert>
    );
  }
  else if (loading) {
    return null;
  }
  else if (userName) {
    return (
      <>
        Logged-in as
        {" "}
        <strong title={formatClient(client)}>
          {userName}
        </strong>.
      </>
    );
  } else {
    return <UserNameForm id={client.userId} setUserName={setUserName} />;
  }
}

interface UserNameFormProps {
  id: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

function UserNameForm({ id, setUserName }: UserNameFormProps) {
  const [currentInput, setCurrentInput] = useState("");
  const [sending, setSending] = useState(false);
  const [inputError, setInputError] = useState<string>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (sending) {
      return;
    }
    setInputError(null);
    setSending(true);
    try {
      if (currentInput.length < 3 || currentInput.length > 25) {
        setInputError("Username must be between 3 and 25 characters.");
      } else {
        const requestBody = {
          userName: currentInput,
          id: id,
        };
        const response = await fetch(`/api/user`, {
          method: "POST",
          body: JSON.stringify(requestBody)
        });
        const body = await response.json();
        // must be before setUserName as otherwise the component is unmounted before the state change
        setSending(false);
        setUserName(body.userName);
      }
    }
    catch {
      setInputError("There was an error submitting the form. Try again or contact me.");
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={e => onSubmit(e)} onReset={() => setCurrentInput("")}
      className="mb-1"
    >
      <p>
        You must choose a username (3-25 characters) before commenting:
      </p>
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Jane Doe"
          value={currentInput}
          onChange={e => setCurrentInput(e.target.value)}
          disabled={sending}
          className={"block flex-grow text-black leading-none p-1 " + (inputError ? "bg-red-200" : sending ? "bg-gray-300" : "")} />
        {" "}
        <button
          disabled={sending}
          type="submit"
          className="block p-2 leading-none bg-blue-800 text-white dark:bg-blue-300 dark:text-black"
        >
          <FontAwesomeIcon
            icon={sending ? faSpinner : inputError ? faTimes : faArrowRight}
            spin={sending}
            title="Submit"
          />
        </button>
      </div>
      {inputError && (
        <>
          <p className="text-red-800 dark:text-red-500">
            {inputError}
          </p>
        </>
      )}
    </form>
  );
}
