import Link from 'next/link';

import { Button } from '@/components/ui/button';

import type { ButtonProps } from '@/components/ui/button';

interface Props extends ButtonProps {
  href?: string;
}

export const SidebarLink = (props: Props) => {
  const { children, href = '', ...buttonProps } = props;
  return (
    <Button
      variant="ghost"
      width="full"
      justifyContent="start"
      gap="3"
      color="fg.muted"
      _hover={{
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      }}
      _currentPage={{
        bg: 'colorPalette.emphasized',
        color: 'colorPalette.fg',
      }}
      asChild
      {...buttonProps}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};
