import React, { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { faInfoCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Error from "./Error";
import LoginButton from "./LoginButton";
import AlertDiv from "../AlertDiv";
import { useGetClientQuery, useGetUsernameQuery } from "./CommentApi";
import { UsernameForm } from "./UsernameForm";
import { formatClient } from "./ClientPrincipal";
import * as styles from "./User.module.css";

export default function User() {
  const {
    data: client,
    refetch: refetchClient,
    isFetching: isClientFetching,
  } = useGetClientQuery({});

  const {
    data: username,
    isFetching: isUsernameFetching,
    error: errorUsername,
    refetch: refetchUsername,
  } = useGetUsernameQuery(client ? {} : skipToken);

  const [detailsExpanded, setDetailsExpanded] = useState(false);

  if (isClientFetching || isUsernameFetching) {
    return (
      <AlertDiv color="blue">
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;Loading your login details...
      </AlertDiv>
    );
  } else if (!client) {
    return <LoginButton />;
  } else if (!username) {
    if (
      errorUsername &&
      "status" in errorUsername &&
      errorUsername.status === 404
    ) {
      return <UsernameForm id={client.userId} />;
    } else {
      return (
        <Error
          retry={() => {
            if (!client) refetchClient();
            else refetchUsername();
          }}
        >
          There was an error fetching your user details.
        </Error>
      );
    }
  } else {
    return (
      <div>
        Logged-in as <strong>{username}</strong>{" "}
        <button
          className={styles.infoBtn}
          onClick={() => setDetailsExpanded(true)}
          onBlur={() => setDetailsExpanded(false)}
          title="Show user id"
        >
          {detailsExpanded && (
            <div>
              <div>
                User details: <code>{formatClient(client)}</code>
              </div>
            </div>
          )}
          <FontAwesomeIcon icon={faInfoCircle} size="sm" />
        </button>
      </div>
    );
  }
}
