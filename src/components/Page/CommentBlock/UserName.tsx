import React, { useCallback, useEffect, useState } from "react";
import Alert from "./Alert";
import { ClientPrincipal, formatClient } from "./ClientPrincipal";
import { UserNameForm } from "./UserNameForm";

interface UserNameProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  client: ClientPrincipal;
}

export default function UserName({
  client,
  userName,
  setUserName,
}: UserNameProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUserName = useCallback(async () => {
    try {
      const response = await fetch(`/api/user`);
      if (response.ok) {
        const body = await response.json();
        setUserName(body.userName);
        setError(false);
      } else if (response.status === 404) {
        setUserName(null);
      } else {
        throw new Error();
      }
    } catch {
      setUserName(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setUserName]);

  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);

  if (error) {
    return (
      <Alert
        retry={() => {
          setError(false);
          if (!loading) {
            setLoading(true);
            setTimeout(() => fetchUserName(), 500);
          }
        }}
      >
        There was an error fetching your username.
      </Alert>
    );
  } else if (loading) {
    return null;
  } else if (userName) {
    return (
      <>
        Logged-in as <strong title={formatClient(client)}>{userName}</strong>.
      </>
    );
  } else {
    return <UserNameForm id={client.userId} setUserName={setUserName} />;
  }
}
