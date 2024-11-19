'use client';

import { Heading, Text, VStack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { useRootStoreWithUser } from '@/stores/store-setup';

const Dasshboard = () => {
  const store = useRootStoreWithUser();

  return (
    <>
      <VStack>
        <Heading>Hello, {store.user.name}!</Heading>
        <Text whiteSpace="nowrap" color="fg.muted">
          This is an {store.user.roles.includes('ADMIN') ? 'ADMIN' : 'USER'} Account
        </Text>
      </VStack>
    </>
  );
};

export default observer(Dasshboard);
