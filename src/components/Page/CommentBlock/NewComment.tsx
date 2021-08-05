import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

interface NewCommentProps {
  client: ClientPrincipal;
  setClient: React.Dispatch<React.SetStateAction<ClientPrincipal>>;
}

export default function NewComment({ client, setClient }: NewCommentProps) {
  const [userName, setUserName] = useState<string>(null);

  return (
    <div className="mb-4">
      <div className="mb-2">
        <UserDetails client={client} setClient={setClient} userName={userName} setUserName={setUserName} />
      </div>
      {client !== null && userName && (
        <NewCommentForm />
      )}
    </div>
  );
}

function NewCommentForm() {
  const [expanded, setExpanded] = useState(false);
  const [currentInput, setCurrentInput] = useState("");

  return expanded ? (
    <form>
      <button
        className="block float-right w-min h-min p-1 leading-none"
        onClick={() => {
          if (window.confirm("Are you sure that you want to cancel writing this comment?")) {
            setExpanded(false);
            setCurrentInput("");
          }
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <textarea
        className="w-full text-black"
        rows={5}
        value={currentInput}
        onChange={e => setCurrentInput(e.target.value)}
      />
    </form>
  ) : (
    <button
      className="block leading-none p-2 rounded-md w-full bg-green-200 dark:bg-green-800 hover:font-bold"
      onClick={() => setExpanded(true)}
    >
      <FontAwesomeIcon icon={faEdit} />
      &nbsp;
      Write comment
    </button>
  );
}
