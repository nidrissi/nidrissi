import React, { useCallback, useState } from "react";
import { ClientPrincipal } from "./ClientPrincipal";
import UserDetails from "./UserDetails";

export default function NewComment() {
  const [client, setClient] = useState<ClientPrincipal>(null);
  const [okToPost, setOkToPost] = useState(false);

  const onOk = useCallback(() => setOkToPost(true), []);

  return (
    <div className="mb-4">
      <div className="mb-2">
        <UserDetails onOk={onOk} client={client} setClient={setClient} />
      </div>
      {okToPost && (
        <textarea
          className="w-full"
          rows={5}
        />
      )}
    </div>
  );
}
