import React from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import Alert from "./Alert";
import { formatClient } from "./ClientPrincipal";
import { useGetClientQuery, useGetUserNameQuery } from "./CommentApi";
import { UserNameForm } from "./UserNameForm";

export default function UserName() {
  const { data: client } = useGetClientQuery({});
  const {
    data: userName,
    isFetching,
    isError,
    refetch,
  } = useGetUserNameQuery(client ? {} : skipToken);

  if (!client) {
    return null;
  }

  if (isError) {
    return (
      <Alert retry={() => refetch()}>
        There was an error fetching your username.
      </Alert>
    );
  } else if (isFetching) {
    return null;
  } else if (userName) {
    return (
      <>
        Logged-in as <strong title={formatClient(client)}>{userName}</strong>.
      </>
    );
  } else {
    return <UserNameForm id={client.userId} />;
  }
}
