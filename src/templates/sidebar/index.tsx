import { Box, Container, Flex } from '@chakra-ui/react';

import { Block } from './block';

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxW="6xl" p={4} pl={0}>
      <Flex gap={4} flexDir={['column', 'column', 'row']}>
        <Block />
        <Box flex={1}>{children}</Box>
      </Flex>
    </Container>
  );
};
