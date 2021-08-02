import React, { useState, useEffect, useCallback } from "react";
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

  const fetchComments = useCallback(async function () {
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
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [slug, fetchComments]);

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
          {" "}
          <button
            onClick={() => {
              if (!loading) {
                setLoading(true);
                setTimeout(() => fetchComments(), 500);
              }
            }}
            className="font-semibold hover:font-bold"
          >
            Retry?
          </button>
        </div>
      </CommentListWrapper>
    );
  } else {
    return (
      <CommentListWrapper num={comments.length}>
        <div className="flex flex-col gap-2">
          {comments?.map(c => (
            <SingleComment key={c.id} comment={c} />
          ))}
        </div>
      </CommentListWrapper>
    );
  }
}
