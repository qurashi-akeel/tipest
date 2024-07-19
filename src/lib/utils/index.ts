export function formatSecondsToMinutes(
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

// Generate random number from x to y
export function randomNumber(x: number = 0, y: number = 9): number {
  return Math.floor(Math.random() * (y - x + 1)) + x;
}
