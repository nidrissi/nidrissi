import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";

import Single, { Comment } from "./Single";
import Wrapper from "./Wrapper";

interface CommentBlockProps {
  slug: string;
}

export default function CommentBlock({ slug }: CommentBlockProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[]>();

  const fetchComments = useCallback(async function () {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/comment/${slug}`);
      if (response.ok) {
        const body = await response.json() as Comment[];
        setComments(body);
      } else {
        throw new Error();
      }
    }
    catch {
      setError(true);
    }
    finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [slug, fetchComments]);

  if (loading) {
    return (
      <Wrapper>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;
        Loading comments...
      </Wrapper>
    );
  } else if (error) {
    return (
      <Wrapper>
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
      </Wrapper>
    );
  } else {
    return (
      <Wrapper num={comments.length}>
        <div className="flex flex-col gap-2">
          {comments?.map(c => (
            <Single key={c.id} comment={c} />
          ))}
          {comments.length === 0 && (
            <em className="text-opacity-60 italic">(no comments on this page yet)</em>
          )}
        </div>
      </Wrapper>
    );
  }
}
