import React from "react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import remarkExternalLinks from "remark-external-links";

import Identicon from "./Identicon";

export interface Comment {
  id: string;
  pageId: string;
  date: string;
  content: string;
  authorId: string;
  authorName: string;
}

export default function SingleComment({ comment }: { comment: Comment; }) {
  return (
    <div className="flex items-start">
      <div className="mr-2">
        <Identicon size={36} seed={comment.authorId} />
      </div>
      <div>
        <div>
          <p className="leading-none border-b pb-1 border-opacity-50">
            <strong>
              {comment.authorName}
            </strong>
            {" "}
            <em>
              {new Date(comment.date).toLocaleString()}
            </em>
          </p>
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkExternalLinks]}
          rehypePlugins={[rehypeKatex]}
          children={comment.content} />
      </div>
    </div>
  );
}
