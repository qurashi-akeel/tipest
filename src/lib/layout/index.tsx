import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Meta />
      <Flex wrap="wrap" margin="8" minHeight="85vh">
        <Header />
        <Box width="full" as="main">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
