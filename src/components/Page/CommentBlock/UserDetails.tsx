import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Error from "./Error";
import LoginButton from "./LoginButton";
import Username from "./Username";
import AlertDiv from "../AlertDiv";

import { useGetClientQuery } from "./CommentApi";

export default function UserDetails() {
  const { data: client, refetch, isFetching, isError } = useGetClientQuery({});

  if (isError) {
    return (
      <Error retry={() => refetch()}>
        There was an error fetching your login details.
      </Error>
    );
  } else if (isFetching) {
    return (
      <AlertDiv color="blue">
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;Loading login details...
      </AlertDiv>
    );
  } else if (client) {
    return <Username />;
  } else {
    return <LoginButton />;
  }
}
