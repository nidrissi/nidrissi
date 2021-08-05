import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import Identicon from "./Identicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEraser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ClientPrincipal } from "./ClientPrincipal";

export interface Comment {
  id: string;
  pageId: string;
  timestamp: number;
  content: string;
  deleted: boolean;
  userId: string;
  userName: string;
}

interface SingleProps {
  client: ClientPrincipal;
  comment: Comment;
}

export default function Single({ client, comment }: SingleProps) {
  const date = new Date(comment.timestamp);

  const onClickDelete = async (superDelete?: boolean) => {
    if (window.confirm(`Are you sure that you want to${superDelete ? " **TRULY** " : " "}delete this comment?`)) {
      try {
        const response = await fetch(
          `/api/comment/${comment.pageId}/${comment.id}${superDelete ? "?super=1" : ""}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error();
        }
        // TODO do better than a full page reload
        document.location.reload();
      }
      catch {
        alert("Error deleting comment!");
      }
    }
  };

  return (
    <div className={`flex items-start ${comment.deleted ? "opacity-70" : ""}`}>
      <div className="mr-2">
        {comment.deleted ? (
          <FontAwesomeIcon
            size="2x"
            icon={faBan}
            title="This comment has been deleted."
          />
        ) : (
          <Identicon size={36} seed={comment.userId} />
        )}
      </div>
      <div className="w-full">
        <div className="w-full flex items-start leading-none">
          <div className="flex-grow pb-1 border-b border-opacity-50 border-dashed">
            <strong>
              {comment.userName}
            </strong>
            {", "}
            <em>
              {date.toLocaleString()}
            </em>
          </div>
          {comment.userId === client?.userId && !comment.deleted && (
            <button
              className="block p-1 hover:bg-red-700 dark:hover:bg-red-400"
              onClick={() => onClickDelete()}
            >
              <FontAwesomeIcon icon={faTrash} title="Delete this comment" />
            </button>
          )}
          {client?.userRoles.includes("admin") && (
            <button
              className="block p-1 hover:bg-yellow-700 dark:hover:bg-yellow-400"
              onClick={() => onClickDelete(true)}
            >
              <FontAwesomeIcon icon={faEraser} title="Delete this comment, for real." />
            </button>
          )}
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkExternalLinks]}
          rehypePlugins={[rehypeKatex]}
          children={comment.content ?? "*[deleted]*"} />
      </div>
    </div>
  );
}
