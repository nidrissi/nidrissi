import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Single, { Comment } from "./Single";
import Wrapper from "./Wrapper";
import NewComment from "./NewComment";
import Alert from "./Alert";
import { ClientPrincipal } from "./ClientPrincipal";

import * as styles from "./CommentBlock.module.css";

interface CommentBlockProps {
  pageId: string;
}

export default function CommentBlock({ pageId }: CommentBlockProps) {
  const [client, setClient] = useState<ClientPrincipal>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchComments = useCallback(async () => {
    setError(false);
    try {
      const response = await fetch(`/api/comment/${pageId}`);
      if (response.ok) {
        const body = (await response.json()) as Comment[];
        setComments(body);
        setError(false);
      } else {
        throw new Error();
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  const retry = useCallback(() => {
    setError(false);
    if (!loading) {
      setLoading(true);
      setComments([]);
      setTimeout(() => fetchComments(), 500);
    }
  }, [fetchComments, loading]);

  const pushComment = useCallback((comment: Comment) => {
    setComments((l) => [comment].concat(l));
  }, []);

  useEffect(() => {
    fetchComments();
  }, [pageId, fetchComments]);

  if (loading) {
    return (
      <Wrapper>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp; Loading comments...
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper retry={retry}>
        <Alert retry={retry}>&nbsp; An error occurred fetching comments.</Alert>
      </Wrapper>
    );
  }

  return (
    <Wrapper num={comments?.length} retry={retry}>
      <NewComment
        client={client}
        setClient={setClient}
        pushComment={pushComment}
        pageId={pageId}
      />
      <div className={styles.root}>
        {comments.map((c) => (
          <Single key={c.id} comment={c} client={client} />
        ))}
      </div>
    </Wrapper>
  );
}
