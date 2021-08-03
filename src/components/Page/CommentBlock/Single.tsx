import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import Identicon from "./Identicon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

export interface Comment {
  id: string;
  pageId: string;
  timestamp: number;
  content: string;
  deleted: boolean;
  authorId: string;
  authorName: string;
}

interface SingleProps {
  comment: Comment;
}

export default function Single({ comment }: SingleProps) {
  const date = new Date(comment.timestamp);

  return (
    <div className="flex items-start">
      <div className="mr-2">
        <Identicon size={36} seed={comment.authorId} />
      </div>
      <div>
        <div>
          <p className="leading-none border-b pb-1 border-opacity-50 border-dashed">
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
              {comment.authorName}
            </strong>
            {", "}
            <em>
              {date.toLocaleString()}
            </em>
          </p>
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkExternalLinks]}
          rehypePlugins={[rehypeKatex]}
          children={comment.content ?? "*[deleted]*"} />
      </div>
    </div>
  );
}
