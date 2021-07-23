import React from "react";
import NextLink from "next/link";

interface Props {
  label: string;
  href: string;
  className?: string;
}

const Link = ({ label, href, className }: Props) => {
  return (
    <NextLink href={href} passHref>
      <a href={label} className={`link ${className}`}>
        {label}
      </a>
    </NextLink>
  );
};

export default Link;
