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
  Button,
} from '@chakra-ui/react';
import { useState, useRef, useEffect, useCallback } from 'react';

const TYPING_TEST_DURATION = 60; // in seconds
const SAMPLE_TEXT =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta debitis facilis adipisci rem molestias unde dolore reiciendis, ut quibusdam nostrum voluptatem iure magnam consequatur! Neque nam odit possimus sunt, laboriosam hic, exercitationem dolorum voluptate molestiae ipsam, sed praesentium deleniti consequatur.';

interface TimerState {
  startTime: number | null;
  elapsedTime: number;
  timerInterval: number | null;
}

interface TypingSummary {
  duration: number;
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

    const summary = {
      duration: elapsedSeconds,
      totalWords,
      correctWords,
      typingSpeed: Number.isNaN(typingSpeed) ? 0 : typingSpeed,
      accuracy: Number.isNaN(accuracy) ? 0 : accuracy,
    };

    setTypingSummary(summary);
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

  const startNewAttempt = () => {
    setInputValue('');
    setElapsedSeconds(0);
    setIsDisabled(false);
    timerStateRef.current = {
      startTime: null,
      elapsedTime: 0,
      timerInterval: null,
    };
  };

  function formatSecondsToMinutes(
    seconds: number,
    short: boolean = false
  ): string {
    if (seconds < 0) {
      return 'Invalid input';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (short) {
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    if (minutes === 0) {
      return `${remainingSeconds} sec`;
    }
    if (remainingSeconds === 0) {
      return `${minutes} min`;
    }
    return `${minutes} min ${remainingSeconds} sec`;
  }

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
          {formatSecondsToMinutes(TYPING_TEST_DURATION - elapsedSeconds, true)}
        </span>
      </Text>

      <Divider my="4" />

      <Text
        mb={4}
        onCopy={() => {
          navigator.clipboard.writeText("Cheating failed, you're too good!");
        }}
      >
        {SAMPLE_TEXT}
      </Text>

      <Textarea
        mt={5}
        placeholder="Start typing to start timer..."
        rows={4}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        ref={inputRef}
        disabled={isDisabled}
        onPaste={() => setInputValue('')}
      />

      {typingSummary && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent py="3">
            <ModalHeader>Typing Test Summary</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text>Typing Duration:</Text>
                  <Text fontWeight="bold">
                    {formatSecondsToMinutes(typingSummary.duration)}
                  </Text>
                </HStack>
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
      <Box my={4}>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={!typingSummary}
          mr={2}
        >
          Show Last Result
        </Button>
        <Button onClick={startNewAttempt}>Start New Attempt</Button>
      </Box>
    </Box>
  );
};

export default TypingTimer;
