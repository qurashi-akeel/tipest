import { Text, Divider, Textarea, Box, Button } from '@chakra-ui/react';
import { useState, useRef, useEffect, useCallback } from 'react';

import { PARAGRAPHS, TYPING_TEST_DURATION } from '~/lib/constants';
import { formatSecondsToMinutes, randomNumber } from '~/lib/utils';

import Settings from './settings';
import SummaryModal from './summary-modal';

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
  const [paragraphText, setParagraphText] = useState(
    PARAGRAPHS[randomNumber()].content
  );
  const [typingDuration, setTypingDuration] = useState(TYPING_TEST_DURATION);
  const [inputValue, setInputValue] = useState<string>('');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [typingSummary, setTypingSummary] = useState<TypingSummary | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [sound, setSound] = useState('fire1');
  const timerStateRef = useRef<TimerState>({
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
  });

  const calculateTypingSummary = useCallback(() => {
    const sampleWords = paragraphText.trim().split(/\s+/);
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
  }, [inputValue, elapsedSeconds, paragraphText]);

  const endTypingTest = useCallback(() => {
    if (timerStateRef.current.timerInterval !== null) {
      clearInterval(timerStateRef.current.timerInterval);
      timerStateRef.current.timerInterval = null;
    }
    setIsDisabled(true);
    setElapsedSeconds(typingDuration);
    setIsModalOpen(true);
  }, [typingDuration]);

  const updateTimer = useCallback(() => {
    if (timerStateRef.current.startTime !== null) {
      const currentTime = Date.now();
      const newElapsedSeconds = Math.floor(
        (currentTime - timerStateRef.current.startTime) / 1000
      );
      setElapsedSeconds(newElapsedSeconds);

      if (newElapsedSeconds >= typingDuration) {
        endTypingTest();
      }
    }
  }, [endTypingTest, typingDuration]);

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
    const currentElementIdx = event.target.value.length - 1;
    const currentElement = event.target.value[currentElementIdx];

    if (currentElementIdx >= paragraphText.length) {
      endTypingTest(); // TODO: Fix duration & Add a sound effect
    }

    if (currentElement !== paragraphText[currentElementIdx]) {
      new Audio(`./assets/audio/error2.mp3`).play();
    } else {
      new Audio(`./assets/audio/${sound}.mp3`).play();
    }
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
        <div>
          <Box display="flex">
            <span>
              {formatSecondsToMinutes(typingDuration - elapsedSeconds, true)}
            </span>
            <Text opacity="0.3" mx="4" fontWeight="100">
              |
            </Text>
            <Settings
              sound={sound}
              setSound={setSound}
              paragraphText={paragraphText}
              setParagraphText={setParagraphText}
              typingDuration={typingDuration}
              setTypingDuration={setTypingDuration}
            />
          </Box>
        </div>
      </Text>

      <Divider my="4" />

      <Text
        mb={4}
        onCopy={() => {
          navigator.clipboard.writeText("Cheating failed, you're too good!");
        }}
      >
        {paragraphText}
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
        <SummaryModal
          typingSummary={typingSummary}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
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
