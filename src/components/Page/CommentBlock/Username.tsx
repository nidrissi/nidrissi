import React from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import Error from "./Error";
import { useGetClientQuery, useGetUsernameQuery } from "./CommentApi";
import { UsernameForm } from "./UsernameForm";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Username() {
  const { data: client } = useGetClientQuery({});

  const {
    data: username,
    isFetching,
    error,
    refetch,
  } = useGetUsernameQuery(client ? {} : skipToken);

  if (!client) {
    return null;
  }

  if (error && "status" in error && error.status === 404) {
    return <UsernameForm id={client.userId} />;
  } else if (isFetching) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;Loading username...
      </div>
    );
  } else if (username) {
    return (
      <div>
        Logged-in as <strong title={client.toString()}>{username}</strong>.
      </div>
    );
  } else {
    return (
      <Error retry={() => refetch()}>
        There was an error fetching your username.
      </Error>
    );
  }
}
