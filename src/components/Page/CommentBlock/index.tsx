import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Single from "./Single";
import Wrapper from "./Wrapper";
import NewComment from "./NewComment";
import Alert from "./Alert";

import * as styles from "./CommentBlock.module.css";
import { useGetCommentsQuery } from "./CommentApi";

interface CommentBlockProps {
  pageId: string;
}

export default function CommentBlock({ pageId }: CommentBlockProps) {
  const {
    data: comments,
    isFetching,
    isError,
    refetch,
  } = useGetCommentsQuery(pageId);

  return (
    <Wrapper num={comments?.length} retry={refetch}>
      <NewComment pageId={pageId} />
      {isFetching ? (
        <>
          <FontAwesomeIcon icon={faSpinner} spin />
          &nbsp; Loading comments...
        </>
      ) : isError ? (
        <Alert retry={refetch}>
          &nbsp; An error occurred fetching comments.
        </Alert>
      ) : (
        <div className={styles.root}>
          {comments?.map((c) => (
            <Single key={c.id} comment={c} />
          ))}
        </div>
      )}
    </Wrapper>
  );
}
