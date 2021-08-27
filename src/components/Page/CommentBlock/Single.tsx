import React, { useState } from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faEdit,
  faEraser,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Identicon from "./Identicon";

import { useDeleteCommentMutation, useGetClientQuery } from "./CommentApi";
import * as styles from "./Single.module.css";
import { WriteCommentForm } from "./WriteComment";

export interface Comment {
  id: string;
  pageId: string;
  timestamp: number;
  lastEditTimestamp?: number;
  content: string;
  deleted: boolean;
  userId: string;
  username: string;
}

interface SingleProps {
  comment: Comment;
}

export default function Single({ comment }: SingleProps) {
  const { data: client } = useGetClientQuery({});
  const [triggerDeleteComment] = useDeleteCommentMutation();

  const [isEditing, setIsEditing] = useState(false);

  const onClickDelete = (superDelete?: boolean) => {
    if (
      window.confirm(
        `Are you sure that you want to${
          superDelete ? " **TRULY** " : " "
        }delete this comment?`
      )
    ) {
      triggerDeleteComment({
        pageId: comment.pageId,
        id: comment.id,
        superDelete,
      });
    }
  };

  return (
    <article className={styles.comment} data-deleted={comment.deleted}>
      <aside>
        {comment.deleted ? (
          <FontAwesomeIcon
            size="2x"
            icon={faBan}
            title="This comment has been deleted."
          />
        ) : (
          <Identicon size={36} seed={comment.userId} />
        )}
      </aside>
      <header>
        <p>
          <strong>{comment.username}</strong>
          {", "}
          <em>{new Date(comment.timestamp).toLocaleString()}</em>.
          {comment.lastEditTimestamp && (
            <em>
              {" "}
              Last edited{" "}
              {new Date(comment.lastEditTimestamp).toLocaleDateString()}
            </em>
          )}
        </p>
        {comment.userId === client?.userId && !comment.deleted && (
          <>
            {new Date().getTime() - comment.timestamp < 1000 * 60 * 60 * 5 && (
              // Edit allowed for five minutes
              <button
                data-edit
                title="Edit this comment"
                onClick={() => setIsEditing((v) => !v)}
              >
                <FontAwesomeIcon icon={isEditing ? faTimes : faEdit} />
              </button>
            )}
            <button
              data-del
              onClick={() => onClickDelete()}
              title="Delete this comment"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
        {client?.userRoles.includes("administrator") && (
          <button
            data-del
            onClick={() => onClickDelete(true)}
            title="Delete this comment **for real**."
          >
            <FontAwesomeIcon icon={faEraser} />
          </button>
        )}
      </header>
      {isEditing ? (
        <WriteCommentForm
          id={comment.id}
          pageId={comment.pageId}
          initialValue={comment.content}
          closeCallback={() => setIsEditing(false)}
        />
      ) : (
        <div className="prose" data-body>
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkExternalLinks]}
            rehypePlugins={[rehypeKatex]}
            disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
            children={comment.content ?? "*[deleted]*"}
          />
        </div>
      )}
    </article>
  );
}
