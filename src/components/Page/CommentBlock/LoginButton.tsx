import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faApple, faFacebook, faGithub, faGoogle, faMicrosoft, faTwitter } from "@fortawesome/free-brands-svg-icons";

interface Provider {
  url: string;
  label: string;
  icon: IconDefinition;
}

const providers: Provider[] = [
  {
    url: "aad",
    label: "Microsoft",
    icon: faMicrosoft,
  },
  {
    url: "github",
    label: "GitHub",
    icon: faGithub,
  },
  {
    url: "twitter",
    label: "Twitter",
    icon: faTwitter,
  },
  {
    url: "facebook",
    label: "Facebook",
    icon: faFacebook,
  },
  {
    url: "google",
    label: "Google",
    icon: faGoogle,
  },
  {
    url: "apple",
    label: "Apple",
    icon: faApple,
  }
];

export default function LoginButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-full">
      {!clicked ? (
        <button
          className="block w-full p-2 leading-none rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-800"
          onClick={() => setClicked(true)}
        >
          <FontAwesomeIcon icon={faSignInAlt} />
          &nbsp;
          Login to comment
        </button>
      ) : (
        <div className={clicked ? "w-full flex flex-wrap gap-1 justify-evenly" : "hidden"}>
          {providers.map(p => (
            <button
              key={p.url}
              title={`Login with ${p.label}`}
              className="text-sm p-1 leading-none hover:bg-yellow-400 dark:hover:bg-yellow-800 rounded-md"
              onClick={() => {
                const location = window.location.pathname;
                const loginUri = `/.auth/login/${p.url}?post_login_redirect_uri=${encodeURI(location)}#__comments`;
                window.location.assign(loginUri);
              }}
            >
              <FontAwesomeIcon icon={p.icon} />
              &nbsp;
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
