import Link from "next/link";
import React from "react";

const LinkTo = ({ href, ...rest }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => {
  return (
    <Link href={href} passHref>
      <a {...rest} />
    </Link>
  );
};

export default LinkTo;
