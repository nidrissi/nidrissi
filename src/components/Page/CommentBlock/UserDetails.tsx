import React from "react";
import { faSignOutAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Alert from "./Alert";
import LoginButton from "./LoginButton";
import UserName from "./UserName";

import * as styles from "./UserDetails.module.css";
import { useGetClientQuery } from "./CommentApi";

export default function UserDetails() {
  const { data: client, refetch, isFetching, isError } = useGetClientQuery({});

  if (isError) {
    return (
      <Alert retry={() => refetch()}>
        There was an error fetching your login details.
      </Alert>
    );
  } else if (isFetching) {
    return (
      <>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp; Loading login details...
      </>
    );
  } else if (client) {
    return (
      <>
        <UserName />{" "}
        <button
          className={styles.logout}
          onClick={() => {
            const location = window.location.pathname;
            window.location.assign(
              `/.auth/logout?post_logout_redirect_uri=${encodeURI(
                location + "#__comments"
              )}`
            );
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          &nbsp;Logout
        </button>
      </>
    );
  } else {
    return <LoginButton />;
  }
}
