'use client';

import { CloseIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { useRootStore } from '@/stores/store-setup';
import { Sidebar } from '@/templates/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const store = useRootStore();

  if (store.isAuthenticated) {
    return <Sidebar>{children}</Sidebar>;
  }
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="red.500"
          rounded="50px"
          w="55px"
          h="55px"
          textAlign="center"
        >
          <CloseIcon boxSize="20px" color="white" />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Sign in to view this page
      </Heading>
      <Text color="gray.500" mb={1}>
        If you don&apos;t have an account, you can sign up.
      </Text>
      <Center>
        <HStack gap={4} mt={6}>
          <Button colorPalette="teal" size="sm" asChild>
            <Link href="/signin">
              <FaSignInAlt /> Sign In
            </Link>
          </Button>
          <Button variant="outline" colorPalette="teal" size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default observer(DashboardLayout);
