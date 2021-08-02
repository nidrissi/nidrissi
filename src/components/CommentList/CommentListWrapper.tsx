import React from "react";

interface CommentListWrapperProps {
  children: React.ReactNode;
  num?: number;
}

export default function CommentListWrapper({ children, num }: CommentListWrapperProps) {
  return (
    <section className="max-w-lg border-t mt-4">
      <h2
        className="text-xl font-semibold mb-2"
        id="__comments"
      >
        Comments
        {num !== undefined && ` (${num})`}
      </h2>
      {children}
    </section>
  );
}
