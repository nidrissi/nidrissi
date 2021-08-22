import React from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import Error from "./Error";
import { formatClient } from "./ClientPrincipal";
import { useGetClientQuery, useGetUsernameQuery } from "./CommentApi";
import { UsernameForm } from "./UsernameForm";

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
    return null;
  } else if (username) {
    return (
      <>
        Logged-in as <strong title={formatClient(client)}>{username}</strong>.
      </>
    );
  } else {
    return (
      <Error retry={() => refetch()}>
        There was an error fetching your username.
      </Error>
    );
  }
}
