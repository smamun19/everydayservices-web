'use client';

import { Box, Center, Skeleton } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useRootStore } from './store-setup';

const StoreLoader = () => {
  const store = useRootStore();
  console.log('store.hydrating?', store.hydrating);

  if (store.hydrating) {
    return (
      <Box bgColor="white" zIndex={2} position="absolute" top={0} bottom={0} left={0} right={0}>
        <Center h="100vh">
          <Skeleton boxSize="8" />
        </Center>
      </Box>
    );
  }

  return null;
};

export default observer(StoreLoader);
