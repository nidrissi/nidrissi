import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Single from "./Single";
import Wrapper from "./Wrapper";
import WriteComment from "./WriteComment";
import Error from "./Error";

import * as styles from "./CommentBlock.module.css";
import { useGetCommentsQuery } from "./CommentApi";
import AlertDiv from "../AlertDiv";

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
      <WriteComment pageId={pageId} />
      {isFetching ? (
        <AlertDiv color="blue">
          <FontAwesomeIcon icon={faSpinner} spin />
          &nbsp;Loading comments...
        </AlertDiv>
      ) : isError ? (
        <Error retry={refetch}>An error occurred fetching comments.</Error>
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
