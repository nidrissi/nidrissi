import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faDoorOpen,
  faMapMarkerAlt,
  faPhone,
  faUniversity,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Root.module.css";

interface ContactLinkProps {
  url: string;
  children: React.ReactNode;
  mono?: boolean;
}

function ContactLink({ url, children, mono }: ContactLinkProps) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener" data-mono={mono}>
      {children}
    </a>
  );
}

interface ContactQuery {
  site: {
    siteMetadata: {
      author: {
        email: string;
        organizations: {
          url: string;
          name: string;
        }[];
        phone: {
          pretty: string;
          ugly: string;
        };
        address: {
          url: string;
          location: string[];
        };
        office: string;
      };
    };
  };
}

export default function Contact() {
  const {
    site: {
      siteMetadata: {
        author: { email, organizations, phone, address, office },
      },
    },
  }: ContactQuery = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            email
            address {
              url
              location
            }
            office
            phone {
              pretty
              ugly
            }
            organizations {
              name
              url
            }
          }
        }
      }
    }
  `);

  type ContactLink = {
    icon: IconDefinition;
    mono?: boolean;
  } & (
    | { label: string; url?: string }
    | { items: { label: string; url: string }[] }
  );

  const contactLinks: ContactLink[] = [
    {
      label: email,
      url: `mailto:${email}`,
      icon: faAt,
      mono: true,
    },
    {
      icon: faUniversity,
      items: organizations.map((o) => ({ label: o.name, url: o.url })),
    },
    { label: phone.pretty, url: `tel:${phone.ugly}`, icon: faPhone },
    {
      label: address.location.join(" • "),
      url: address.url,
      icon: faMapMarkerAlt,
    },
    { label: `Office: ${office}`, icon: faDoorOpen },
  ];

  return (
    <>
      <h2>Contact</h2>
      <ul className={"fa-ul " + styles.contactList}>
        {contactLinks.map((link) => (
          <li key={link.icon.iconName}>
            <FontAwesomeIcon icon={link.icon} listItem />
            {"items" in link ? (
              link.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && " & "}
                  <ContactLink url={item.url}>{item.label}</ContactLink>
                </React.Fragment>
              ))
            ) : link.url ? (
              <ContactLink url={link.url} mono={link.mono}>
                {link.label}
              </ContactLink>
            ) : (
              link.label
            )}
            .
          </li>
        ))}
      </ul>
    </>
  );
}
