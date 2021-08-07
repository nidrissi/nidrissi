import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Single, { Comment } from "./Single";
import Wrapper from "./Wrapper";
import NewComment from "./NewComment";
import Alert from "./Alert";
import { ClientPrincipal } from "./ClientPrincipal";

interface CommentBlockProps {
  pageId: string;
}

export default function CommentBlock({ pageId }: CommentBlockProps) {
  const [client, setClient] = useState<ClientPrincipal>(null);
  const [comments, setComments] = useState<Comment[]>();
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorLoadingComments, setErrorLoadingComments] = useState(false);

  const fetchComments = useCallback(async () => {
    setErrorLoadingComments(false);
    try {
      const response = await fetch(`/api/comment/${pageId}`);
      if (response.ok) {
        const body = (await response.json()) as Comment[];
        setComments(body);
        setErrorLoadingComments(false);
      } else {
        throw new Error();
      }
    } catch {
      setErrorLoadingComments(true);
    } finally {
      setLoadingComments(false);
    }
  }, [pageId]);

  useEffect(() => {
    fetchComments();
  }, [pageId, fetchComments]);

  if (loadingComments) {
    return (
      <Wrapper>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp; Loading comments...
      </Wrapper>
    );
  }

  if (errorLoadingComments) {
    return (
      <Wrapper>
        <Alert
          retry={() => {
            setErrorLoadingComments(false);
            if (!loadingComments) {
              setLoadingComments(true);
              setTimeout(() => fetchComments(), 500);
            }
          }}
        >
          &nbsp; An error occurred fetching comments.
        </Alert>
      </Wrapper>
    );
  }

  return (
    <Wrapper num={comments.length}>
      <NewComment client={client} setClient={setClient} pageId={pageId} />
      <div className="flex flex-col gap-4">
        {comments?.map((c) => (
          <Single key={c.id} comment={c} client={client} />
        ))}
      </div>
    </Wrapper>
  );
}
