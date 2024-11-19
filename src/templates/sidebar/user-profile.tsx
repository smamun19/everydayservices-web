'use client';

import { Box, HStack, Text } from '@chakra-ui/react';

import { Avatar } from '@/components/ui/avatar';
import { useRootStoreWithUser } from '@/stores/store-setup';

export const UserProfile = () => {
  const store = useRootStoreWithUser();
  return (
    <HStack gap="3">
      <Avatar />
      <Box>
        <Text textStyle="sm" fontWeight="medium">
          {store.user.firstName} {store.user.lastName}
        </Text>
        <Text textStyle="sm" color="fg.muted">
          {store.user.email ?? store.user.phone ?? store.user.username}
        </Text>
      </Box>
    </HStack>
  );
};
