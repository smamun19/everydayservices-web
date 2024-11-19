import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface ChakraNextLinkProps extends LinkProps {
  href: string;
}

export const ChakraNextLink = ({ children, href, ...rest }: ChakraNextLinkProps) => {
  return (
    <ChakraLink asChild {...rest}>
      <NextLink href={href}>{children}</NextLink>
    </ChakraLink>
  );
};
