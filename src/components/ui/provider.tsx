'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { enableStaticRendering } from 'mobx-react-lite';

import { ColorModeProvider } from '@/components/ui/color-mode';
import StoreLoader from '@/stores/store-loader';
import { RootStoreProvider } from '@/stores/store-setup';
import system from '@/styles/chakra/system';

enableStaticRendering(typeof window === 'undefined');

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider enableSystem={false}>
        <RootStoreProvider>
          {props.children}
          <StoreLoader />
        </RootStoreProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
