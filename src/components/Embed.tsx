import React from "react";
import { Link } from "gatsby";

interface EmbedProps {
  url: string;
  alt: string;
}

export default function Embed({ url, alt }: EmbedProps) {
  const content = url.endsWith(".pdf") ? (
    <div className="aspect-w-16 aspect-h-9">
      <object type="application/pdf" data={url} title={alt} className="block w-full max-h-full" />
    </div>
  ) : (
    <Link to={url}>
      <img src={url} alt={alt} title={alt} className="max-w-full" />
    </Link>
  );

  return (
    <div className="mx-auto mt-6 mb-4">
      {content}
    </div>
  );
}
