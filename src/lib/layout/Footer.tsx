import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">
        &copy; Qurashi Akeel - <span>{new Date().getFullYear()}</span>
      </Text>
    </Flex>
  );
};

export default Footer;
