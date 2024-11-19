import { Container, HStack, IconButton } from '@chakra-ui/react';
import { LuAlignRight } from 'react-icons/lu';

import { DrawerBackdrop, DrawerCloseTrigger, DrawerContent, DrawerRoot, DrawerTrigger } from '@/components/ui/drawer';
import { Sidebar } from './sidebar';

import type { ContainerProps } from '@chakra-ui/react';

export const Navbar = (props: ContainerProps) => {
  return (
    <Container py="2.5" background="bg.panel" borderBottomWidth="1px" {...props}>
      <HStack justify="space-between">
        <DrawerRoot placement="start">
          <DrawerTrigger asChild>
            <IconButton aria-label="Open Menu" variant="ghost" colorPalette="gray">
              <LuAlignRight />
            </IconButton>
          </DrawerTrigger>
          <DrawerBackdrop />
          <DrawerContent>
            <DrawerCloseTrigger colorPalette="gray" />
            <Sidebar />
          </DrawerContent>
        </DrawerRoot>
      </HStack>
    </Container>
  );
};
