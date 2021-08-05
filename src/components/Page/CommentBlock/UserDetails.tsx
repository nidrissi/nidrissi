import React, { useCallback, useEffect, useState } from "react";
import { faSignOutAlt, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Alert from "./Alert";
import LoginButton from "./LoginButton";
import { ClientPrincipal } from "./ClientPrincipal";
import UserName from "./UserName";

interface UserDetailsProps {
  onOk: () => void;
}

export default function UserDetails({ onOk }: UserDetailsProps) {
  const [client, setClient] = useState<ClientPrincipal>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchClient = useCallback(async () => {
    try {
      const response = await fetch("/.auth/me");
      if (response.ok) {
        const body = await response.json();
        setClient(body.clientPrincipal);
        setError(false);
      }
      else {
        throw new Error();
      }
    } catch {
      setClient(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClient(); }, [fetchClient]);

  if (error) {
    return (
      <Alert retry={() => {
        setError(false);
        if (!loading) {
          setLoading(true);
          setTimeout(() => fetchClient(), 500);
        }
      }}>
        There was an error fetching your login details.
      </Alert>
    );
  }
  else if (loading) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin />
        &nbsp;
        Loading login details...
      </div>
    );
  }
  else if (client) {
    return (
      <div>
        <UserName client={client} onOk={onOk} />
        {" "}
        <button
          className="hover:bg-red-400 dark:hover:bg-red-900 leading-none p-2 rounded-md"
          onClick={() => {
            const location = window.location.pathname;
            window.location.assign(`/.auth/logout?post_logout_redirect_uri=${encodeURI(location)}#__comments`);
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          &nbsp;
          Logout
        </button>
      </div>
    );
  }
  else {
    return (
      <LoginButton />
    );
  }
}
