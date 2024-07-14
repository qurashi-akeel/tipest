import { Box, Divider, Text, Textarea } from '@chakra-ui/react';

const TypingPage = () => {
  return (
    <Box>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        display="flex"
        justifyContent="space-between"
      >
        <span>Typing Practice</span>
        <span>[00:00]</span>
      </Text>

      <Divider my="5" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea omnis
        eligendi, eum assumenda inventore sint aliquid odio, saepe quo ex error
        fuga est velit modi voluptatum facere, corporis vitae rerum.
      </p>
      <Textarea mt={6} placeholder="Start typing to start timer..." />
    </Box>
  );
};

export default TypingPage;
