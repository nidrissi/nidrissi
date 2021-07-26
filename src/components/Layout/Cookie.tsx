import React, { useEffect, useState } from "react";

export default function Cookie() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookieToastShown="))) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      setShow(true);
      setInterval(() => { setShow(false); }, 5000);
      document.cookie = `cookieToastShown=true; expires=${date.toUTCString()}; Secure; SameOrigin=strict`;
    }
  }, []);

  if (!show) {
    return null;
  } else {
    return (
      <aside className="sticky bottom-0 left-0 w-full bg-gray-200 dark:bg-gray-900 dark:text-gray-300 p-3 text-center content-center text-lg">
        <p>
          I use cookies to analyze traffic. <a href="/misc/cookie">my cookie policy</a>.
        </p>
      </aside>
    );
  }
}
