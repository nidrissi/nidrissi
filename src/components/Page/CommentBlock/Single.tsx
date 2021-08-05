import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import Identicon from "./Identicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCrown, faTrash } from "@fortawesome/free-solid-svg-icons";
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

  const onClickDelete = async () => {
    if (window.confirm("Are you sure that you want to delete this comment?")) {
      try {
        const response = await fetch(
          `/api/comment/${comment.pageId}/${comment.id}`,
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
    <div className={`flex items-start ${comment.deleted ? "text-opacity-50" : ""}`}>
      <div className="mr-2">
        <Identicon size={36} seed={comment.userId} />
      </div>
      <div>
        <div className="flex leading-none border-b border-opacity-50 border-dashed">
          <div className="flex-grow p-1">
            {comment.deleted && (
              <>
                <FontAwesomeIcon
                  icon={faBan}
                  title="This comment has been deleted."
                />
                &nbsp;
              </>
            )}
            <strong>
              {client?.userId === comment.userId && (
                <>
                  <FontAwesomeIcon icon={faCrown} title="You posted this comment" />
                  &nbsp;
                </>
              )}
              {comment.userName}
            </strong>
            {", "}
            <em>
              {date.toLocaleString()}
            </em>
          </div>
          {comment.userId === client?.userId && (
            <button
              className="block p-1 hover:bg-red-700 dark:hover:bg-red-400"
              onClick={onClickDelete}
            >
              <FontAwesomeIcon icon={faTrash} title="Delete this comment" />
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
