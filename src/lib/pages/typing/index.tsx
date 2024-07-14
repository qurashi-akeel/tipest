import { Divider, Text, Textarea } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

const TypingPage = () => {
  interface TimerState {
    startTime: number | null;
    elapsedTime: number;
    timerInterval: number | null;
  }

  const [inputValue, setInputValue] = useState<string>('');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerStateRef = useRef<TimerState>({
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
  });

  const updateTimer = useCallback(() => {
    if (timerStateRef.current.startTime !== null) {
      const currentTime = Date.now();
      const remainingSecondss = Math.floor(
        (currentTime - timerStateRef.current.startTime) / 1000
      );
      setRemainingSeconds(remainingSecondss);
    }
  }, []);

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

  const pauseTimer = useCallback(() => {
    if (timerStateRef.current.timerInterval !== null) {
      clearInterval(timerStateRef.current.timerInterval);
      timerStateRef.current.timerInterval = null;
      timerStateRef.current.elapsedTime =
        Date.now() - (timerStateRef.current.startTime || 0);
    }
  }, []);

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

  const handleInputBlur = () => {
    pauseTimer();
  };

  return (
    <>
      <Text
        fontSize="xl"
        fontWeight="bold"
        display="flex"
        justifyContent="space-between"
      >
        <span>Typing Practice</span>
        <span>[0:{remainingSeconds}]</span>
      </Text>

      <Divider my="4" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aut
        aspernatur totam atque reprehenderit blanditiis dolores obcaecati porro
        similique consectetur ut, distinctio odit vitae iste animi commodi quam
        neque expedita vel ullam quidem rerum.
      </p>
      <Textarea
        mt={5}
        placeholder="Start typing to start timer..."
        rows={2}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={() => inputRef}
      />
    </>
  );
};

export default TypingPage;
