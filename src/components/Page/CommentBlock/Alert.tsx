import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

interface AlertProps {
  children: React.ReactNode;
  retry?: () => void;
}

export default function Alert({ children, retry }: AlertProps) {
  return (
    <div
      className="p-2 leading-none py-1 bg-red-300 dark:bg-red-800 text-black dark:text-white text-lg rounded-md"
    >
      <FontAwesomeIcon icon={faBomb} />
      &nbsp;
      {children}
      {retry && (
        <>
          {" "}
          <button
            onClick={retry}
            className="font-semibold hover:font-bold"
          >
            Retry?
          </button>
        </>
      )}
    </div>
  );
}
