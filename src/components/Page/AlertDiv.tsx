import React from "react";

interface AlertDivProps {
  color?: string;
  extraStyle?: string;
  children: JSX.Element;
}

const colorAssociation = {
  red: "bg-red-300 dark:bg-red-800",
  yellow: "bg-yellow-300 dark:bg-yellow-800",
  blue: "bg-blue-300 dark:bg-blue-800"
};

export default function AlertDiv({ color, extraStyle, children }: AlertDivProps) {
  const colorStyle = colorAssociation[color] ?? "bg-gray-300 dark:bg-gray-700";

  return (
    <div className={`p-2 rounded-md ${colorStyle} ${extraStyle ?? ""}`}>
      {children}
    </div>
  );
}
