import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";

import SingleComment, { Comment } from "./SingleComment";
import CommentListWrapper from "./CommentListWrapper";

interface CommentListProp {
  slug: string;
}

export default function Comments({ slug }: CommentListProp) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/comment/${slug}`);
      setLoading(false);
      if (response.ok) {
        const body = await response.json();
        setComments(body);
      } else {
        setError(true);
      }
    }
    fetchComments();
  }, [slug]);

  if (loading) {
    return (
      <CommentListWrapper>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;
        Loading comments...
      </CommentListWrapper>
    );
  } else if (error) {
    return (
      <CommentListWrapper>
        <div className="px-2 py-1 bg-red-300 dark:bg-red-800 text-black dark:text-white text-lg rounded-md">
          <FontAwesomeIcon icon={faTimes} />
          &nbsp;
          An error occurred fetching comments.
        </div>
      </CommentListWrapper>
    );
  } else {
    return (
      <CommentListWrapper num={comments.length}>
        {comments?.map(c => (
          <SingleComment key={c.id} comment={c} />
        ))}
      </CommentListWrapper>
    );
  }
}
