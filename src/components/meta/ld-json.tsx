import React from "react";
import { Helmet } from "react-helmet";

export default function LdJSON({ children }: { children: React.ReactNode; }) {
  // remove empty fields
  const cleanedData = children;
  Object.keys(cleanedData).forEach(key => !cleanedData[key] && delete cleanedData[key]);

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(cleanedData)}
      </script>
    </Helmet>
  );
}
