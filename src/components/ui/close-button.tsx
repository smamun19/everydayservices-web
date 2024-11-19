import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import * as React from 'react';
import { LuX } from 'react-icons/lu';

import type { ButtonProps } from '@chakra-ui/react';

export const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(function CloseButton(props, ref) {
  return (
    <ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
      {props.children ?? <LuX />}
    </ChakraIconButton>
  );
});
