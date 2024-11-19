'use client';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Center, Container, Flex, HStack, IconButton, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiRocket } from 'react-icons/bi';
import { FaDashcube, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FaGears } from 'react-icons/fa6';

import { ChakraNextImage } from '@/components/chakra-next-image';
import { ChakraNextLink } from '@/components/chakra-next-link';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import { MenuContent, MenuItem, MenuRoot, MenuSeparator, MenuTrigger } from '@/components/ui/menu';
import { useRootStore } from '@/stores/store-setup';

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <ChakraNextLink
      as="a"
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={href}
    >
      {children}
    </ChakraNextLink>
  );
};

const NavLinks = () => {
  const store = useRootStore();
  return (
    <>
      {store.user ? <NavLink href="/dashboard">Dashboard</NavLink> : <NavLink href="/">Home</NavLink>}
      <NavLink href="/">Gallery</NavLink>
      <NavLink href="/">News</NavLink>
    </>
  );
};

const Navigation = () => {
  const store = useRootStore();
  const router = useRouter();

  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} position="sticky" top={0} zIndex={1}>
      <Container maxW="6xl" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton size="md" aria-label="Open Menu" display={{ md: 'none' }} onClick={open ? onClose : onOpen}>
            {open ? <CloseIcon /> : <HamburgerIcon />}
          </IconButton>
          <HStack gap={8} alignItems="center">
            <Link href="/">
              <HStack>
                <ChakraNextImage src="/logo.png" alt="Logo" width={32} aspectRatio={1} />
                <Text fontSize="xl" fontWeight="bold">
                  Everyday Services
                </Text>
              </HStack>
            </Link>
            <HStack as="nav" gap={4} display={{ base: 'none', md: 'flex' }}>
              <NavLinks />
            </HStack>
          </HStack>
          <Flex alignItems="center">
            {store.user ? (
              <MenuRoot
                positioning={{
                  placement: 'bottom-end',
                }}
                onSelect={({ value }) => {
                  switch (value) {
                    case 'dashboard':
                      break;
                    case 'profile':
                      break;

                    case 'settings':
                      break;
                    case 'signout':
                      store.clearUser();
                      router.push('/');
                      break;
                    default:
                      break;
                  }
                }}
              >
                <MenuTrigger rounded="full" cursor="pointer" minW={0}>
                  <HStack>
                    <Center>
                      <Text ml="2">Howdy, {store.user.name}!</Text>
                    </Center>{' '}
                    <Avatar size="sm" />
                  </HStack>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="dashboard">
                    <FaDashcube /> Dashboard
                  </MenuItem>
                  <MenuItem value="profile">
                    <FaUser /> Profile
                  </MenuItem>
                  {store.user.roles.includes('ADMIN') && (
                    <MenuItem value="settings">
                      <FaGears /> Settings
                    </MenuItem>
                  )}
                  <MenuSeparator />
                  <MenuItem value="signout">
                    <FaSignOutAlt /> Sign out
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            ) : (
              <HStack gap={4}>
                <Button variant="outline" colorPalette="teal" size="sm" asChild>
                  <Link href="/signin">
                    <FaSignInAlt /> Sign In
                  </Link>
                </Button>
                <Button variant="solid" colorPalette="teal" size="sm" asChild>
                  <Link href="signup">
                    <BiRocket /> Sign Up
                  </Link>
                </Button>
              </HStack>
            )}
            {/* <Box mr={4}>
              <ColorModeButton />
            </Box> */}
          </Flex>
        </Flex>
      </Container>

      {open ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" gap={4}>
            <NavLinks />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default observer(Navigation);
