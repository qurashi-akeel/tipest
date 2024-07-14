import {
  Text,
  Divider,
  Textarea,
  Box,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useState, useRef, useEffect, useCallback } from 'react';

const TYPING_TEST_DURATION = 60; // in seconds
const SAMPLE_TEXT =
  'Lorm ipum dolor sit amt coetur adipisicing elit. Delectus aut aspernatur totam atque reprehenderit blanditiis dolores obcaecati porro similique consectetur ut, distinctio odit vitae iste animi commodi quam neque expedita vel ullam quidem rerum.';

interface TimerState {
  startTime: number | null;
  elapsedTime: number;
  timerInterval: number | null;
}

interface TypingSummary {
  totalWords: number;
  correctWords: number;
  typingSpeed: number;
  accuracy: number;
}

const TypingTimer: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [typingSummary, setTypingSummary] = useState<TypingSummary | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerStateRef = useRef<TimerState>({
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
  });

  const calculateTypingSummary = useCallback(() => {
    const sampleWords = SAMPLE_TEXT.trim().split(/\s+/);
    const typedWords = inputValue.trim().split(/\s+/);
    const totalWords = typedWords.length;
    const correctWords = typedWords.reduce((count, word, index) => {
      return count + (word === sampleWords[index] ? 1 : 0);
    }, 0);
    const minutes = elapsedSeconds / 60;
    const typingSpeed = Math.round(totalWords / minutes);
    const accuracy = Math.round((correctWords / totalWords) * 100);

    setTypingSummary({
      totalWords,
      correctWords,
      typingSpeed: Number.isNaN(typingSpeed) ? 0 : typingSpeed,
      accuracy: Number.isNaN(accuracy) ? 0 : accuracy,
    });
  }, [inputValue, elapsedSeconds]);

  const endTypingTest = useCallback(() => {
    if (timerStateRef.current.timerInterval !== null) {
      clearInterval(timerStateRef.current.timerInterval);
      timerStateRef.current.timerInterval = null;
    }
    setIsDisabled(true);
    setElapsedSeconds(TYPING_TEST_DURATION);
    setIsModalOpen(true);
  }, []);

  const updateTimer = useCallback(() => {
    if (timerStateRef.current.startTime !== null) {
      const currentTime = Date.now();
      const newElapsedSeconds = Math.floor(
        (currentTime - timerStateRef.current.startTime) / 1000
      );
      setElapsedSeconds(newElapsedSeconds);

      if (newElapsedSeconds >= TYPING_TEST_DURATION) {
        endTypingTest();
      }
    }
  }, [endTypingTest]);

  const startTimer = useCallback(() => {
    if (timerStateRef.current.timerInterval === null) {
      timerStateRef.current.startTime =
        Date.now() - timerStateRef.current.elapsedTime;
      timerStateRef.current.timerInterval = window.setInterval(
        updateTimer,
        1000
      );
    }
  }, [updateTimer]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (event.target.value.length === 1) {
      startTimer();
    }
  };

  const handleInputFocus = () => {
    if (inputValue.length > 0 && timerStateRef.current.timerInterval === null) {
      startTimer();
    }
  };

  useEffect(() => {
    const currentTimerState = timerStateRef.current;
    return () => {
      if (currentTimerState.timerInterval !== null) {
        clearInterval(currentTimerState.timerInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (isDisabled) {
      calculateTypingSummary();
    }
  }, [isDisabled, calculateTypingSummary]);

  return (
    <Box>
      <Text
        fontSize="xl"
        fontWeight="bold"
        display="flex"
        justifyContent="space-between"
      >
        <span>Typing Practice</span>
        <span>
          [0:
          {Math.max(0, TYPING_TEST_DURATION - 1 - elapsedSeconds)
            .toString()
            .padStart(2, '0')}
          ]
        </span>
      </Text>

      <Divider my="4" />

      <Text mb={4}>{SAMPLE_TEXT}</Text>

      <Textarea
        mt={5}
        placeholder="Start typing to start timer..."
        rows={4}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        ref={inputRef}
        disabled={isDisabled}
      />

      {typingSummary && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Typing Test Summary</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text>Total Words:</Text>
                  <Text fontWeight="bold">{typingSummary.totalWords}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Correct Words:</Text>
                  <Text fontWeight="bold">{typingSummary.correctWords}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Typing Speed:</Text>
                  <Text fontWeight="bold">
                    {typingSummary.typingSpeed} words per minute
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Accuracy:</Text>
                  <Text fontWeight="bold">
                    {typingSummary.accuracy.toFixed(2)}%
                  </Text>
                </HStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default TypingTimer;
