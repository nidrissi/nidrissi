import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEraser, faTrash } from "@fortawesome/free-solid-svg-icons";

import Identicon from "./Identicon";

import { useDeleteCommentMutation, useGetClientQuery } from "./CommentApi";
import * as styles from "./Single.module.css";

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
  comment: Comment;
}

export default function Single({ comment }: SingleProps) {
  const { data: client } = useGetClientQuery({});
  const [triggerDeleteComment] = useDeleteCommentMutation();

  const onClickDelete = async (superDelete?: boolean) => {
    if (
      window.confirm(
        `Are you sure that you want to${
          superDelete ? " **TRULY** " : " "
        }delete this comment?`
      )
    ) {
      try {
        await triggerDeleteComment({
          pageId: comment.pageId,
          id: comment.id,
          superDelete,
        }).unwrap();
      } catch (err) {
        alert(`Error deleting comment: ${err}`);
      }
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
        <div>
          <strong>{comment.userName}</strong>
          {", "}
          <em>{new Date(comment.timestamp).toLocaleString()}</em>
        </div>
        {comment.userId === client?.userId && !comment.deleted && (
          <button onClick={() => onClickDelete()} title="Delete this comment">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
        {client?.userRoles.includes("administrator") && (
          <button
            onClick={() => onClickDelete(true)}
            title="Delete this comment **for real**."
          >
            <FontAwesomeIcon icon={faEraser} />
          </button>
        )}
      </header>
      <div className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkExternalLinks]}
          rehypePlugins={[rehypeKatex]}
          children={comment.content ?? "*[deleted]*"}
        />
      </div>
    </article>
  );
}
