'use client';

import { Flex, Heading, Separator, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

import { ChakraNextImage } from '@/components/chakra-next-image';

export default function Hero() {
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack gap={6} w="full" maxW="lg">
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Lorem Ipsum
            </Text>
            <Separator mb={6} borderColor="transparent" />
            <Text color="blue.400" as="span">
              Made Easy
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nostrum voluptatibus quisquam exercitationem
            voluptates vero expedita, qui quas nobis. Assumenda ab quo facere ut animi nihil autem labore! Corrupti, et.
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <ChakraNextImage
          alt="A person sitting at a desk, working on a laptop with an abstract screen. A coffee cup and papers resembling a manuscript or draft book are on the desk."
          objectFit="cover"
          src="/hero.jpg"
          width={900}
          height={500}
        />
      </Flex>
    </Stack>
  );
}
