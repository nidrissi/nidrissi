import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faDoorOpen,
  faMapMarkerAlt,
  faPhone,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

import * as styles from "./index.module.css";

interface ContactLinkProps {
  url: string;
  children: React.ReactNode;
}

function ContactLink({ url, children }: ContactLinkProps) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
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

  const contactLinks = [
    {
      label: email,
      url: `mailto:${email}`,
      icon: faAt,
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
            &nbsp;
            {link.items ? (
              link.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && " & "}
                  <ContactLink url={item.url}>{item.label}</ContactLink>
                </React.Fragment>
              ))
            ) : link.url ? (
              <ContactLink url={link.url}>{link.label}</ContactLink>
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
