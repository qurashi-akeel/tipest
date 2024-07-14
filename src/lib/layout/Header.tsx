import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box display="flex" justifyContent="space-between" width="full">
        <div>
          <Link to="/">
            <Button mr={5}>Home</Button>
          </Link>
          <Link to="/typing">
            <Button mr={5}>Start Practice</Button>
          </Link>
        </div>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
