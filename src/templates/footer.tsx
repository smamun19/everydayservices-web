'use client';

import { Box, Container, HStack, IconButton, Input, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BiMailSend } from 'react-icons/bi';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { ChakraNextImage } from '@/components/chakra-next-image';
import AppStoreBadge from '@/components/graphics/app-store-badge';
import PlayStoreBadge from '@/components/graphics/play-store-badge';
import { useColorModeValue } from '@/components/ui/color-mode';

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <Link href={href} asChild>
      <IconButton
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded="full"
        w={8}
        h={8}
        cursor="pointer"
        as="a"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        transition="background 0.3s ease"
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}
        aria-label={label}
      >
        {children}
      </IconButton>
    </Link>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }} gap={8}>
          <Stack gap={6}>
            <Box>
              <HStack>
                <ChakraNextImage src="/logo.png" alt="Logo" width={32} aspectRatio={1} />
                <Text fontSize="xl" fontWeight="bold">
                  Everyday Services
                </Text>
              </HStack>
            </Box>
            <Text fontSize="sm">&copy; 2024 Everyday Services. All rights reserved</Text>
            <Stack direction="row" gap={6}>
              <SocialButton label="Twitter" href="#">
                <FaTwitter />
              </SocialButton>
              <SocialButton label="YouTube" href="#">
                <FaYoutube />
              </SocialButton>
              <SocialButton label="Instagram" href="#">
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <Link>About us</Link>
            <Link>Blog</Link>
            <Link>Contact us</Link>
            <Link>Pricing</Link>
            <Link>Testimonials</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link>Help Center</Link>
            <Link>Terms of Service</Link>
            <Link>Legal</Link>
            <Link>Privacy Policy</Link>
            <Link>Status</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction="row">
              <Input
                placeholder="Your email address"
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.200')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
              >
                <BiMailSend />
              </IconButton>
            </Stack>
            <Text fontWeight="500" fontSize="lg" my={1}>
              Install our app
            </Text>
            <HStack gap={2}>
              <AppStoreBadge />
              <PlayStoreBadge />
            </HStack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
