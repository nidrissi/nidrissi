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

interface ContactLinkProps {
  url: string;
  children: React.ReactNode;
}

function ContactLink({ url, children }: ContactLinkProps) {
  return (
    <a
      href={url}
      className="text-blue-800 dark:text-indigo-300 hover:underline"
      target="_blank"
      rel="noreferrer noopener"
    >
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
};

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
    { label: email, url: `mailto:${email}`, icon: faAt, extraStyle: "font-mono tracking-tighter" },
    { icon: faUniversity, items: organizations.map(o => ({ label: o.name, url: o.url })) },
    { label: phone.pretty, url: `tel:${phone.ugly}`, icon: faPhone },
    { label: address.location.join(" • "), url: address.url, icon: faMapMarkerAlt },
    { label: `Office: ${office}`, icon: faDoorOpen },
  ];

  return (
    <>
      <h2 className="text-3xl font-bold mb-2">Contact</h2>
      <ul className="text-lg">
        {contactLinks.map((link) => (
          <li key={link.icon.iconName} className={link.extraStyle}>
            <FontAwesomeIcon icon={link.icon} fixedWidth />&nbsp;
            {link.items
              ? link.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && ' & '}
                  <ContactLink url={item.url}>
                    {item.label}
                  </ContactLink>
                </React.Fragment>
              ))
              : link.url ? (
                <ContactLink url={link.url}>
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
