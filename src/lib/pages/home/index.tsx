import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FaChartLine, FaKeyboard, FaTrophy } from 'react-icons/fa';

const Home = () => {
  const cardBgColor = useColorModeValue('white', 'gray.700');
  return (
    <Grid gap={4}>
      <Box minH="100vh" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={10} align="stretch">
            {/* Hero Section */}
            <VStack spacing={5} textAlign="center">
              <Heading as="h1" size="2xl">
                Master Your Typing Skills
              </Heading>
              <Text fontSize="xl">
                Improve your typing speed and accuracy with our interactive
                tests with
              </Text>
              <Button
                colorScheme="blue"
                size="md"
                onClick={() => {
                  /* Navigate to test page */
                }}
              >
                Start Typing Test
              </Button>
            </VStack>

            {/* Features Section */}
            <HStack spacing={8} justify="center" wrap="wrap">
              {[
                {
                  icon: FaKeyboard,
                  title: 'Customizable Tests',
                  description:
                    'Choose from various difficulty levels, custom text and test durations',
                },
                {
                  icon: FaChartLine,
                  title: 'Detailed Analytics',
                  description:
                    'Track your progress with comprehensive performance metrics',
                },
                {
                  icon: FaTrophy,
                  title: 'Compete & Improve',
                  description:
                    'Compare your scores with others and set new personal bests and records',
                },
              ].map((feature) => (
                <Box
                  key={feature.title}
                  bg={cardBgColor}
                  p={5}
                  borderRadius="md"
                  boxShadow="md"
                  width="300px"
                  textAlign="center"
                >
                  <Icon
                    as={feature.icon}
                    w={10}
                    h={10}
                    color="blue.500"
                    mb={4}
                  />
                  <Heading as="h3" size="md" mb={2}>
                    {feature.title}
                  </Heading>
                  <Text>{feature.description}</Text>
                </Box>
              ))}
            </HStack>

            {/* Call to Action */}
            <VStack
              spacing={5}
              bg={cardBgColor}
              p={10}
              borderRadius="md"
              boxShadow="md"
            >
              <Heading as="h2" size="xl">
                Ready to Improve Your Typing?
              </Heading>
              <Text fontSize="lg">
                Join hundreds of users who have enhanced their typing skills
                with our platform.
              </Text>
              <Button
                colorScheme="green"
                size="lg"
                onClick={() => {
                  /* Navigate to registration or test page */
                }}
              >
                Get Started Now
              </Button>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Grid>
  );
};

export default Home;
