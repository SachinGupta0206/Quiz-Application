import { useState, useEffect } from 'react';

const useQuizTimer = (isActive: boolean) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    // Initialize interval to null. This tells TypeScript it might be null or a NodeJS.Timeout.
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      const startTime = sessionStorage.getItem('quizStartTime');
      const initialTime = startTime ? parseInt(startTime, 10) : Date.now();
      sessionStorage.setItem('quizStartTime', initialTime.toString());

      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = Math.floor((currentTime - initialTime) / 1000);
        setTime(elapsed);
      }, 1000);
    } else {
      // Only clear the interval if it has been assigned a value.
      if (interval !== null) {
        clearInterval(interval);
      }
      sessionStorage.removeItem('quizStartTime');
      setTime(0);
    }

    // Cleanup function: This runs when the component unmounts or
    // when the dependencies ([isActive]) change and the effect re-runs.
    return () => {
      // Ensure interval exists before trying to clear it.
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive]); // Dependency array: Effect re-runs when isActive changes

  const resetTimer = () => {
    setTime(0);
    sessionStorage.removeItem('quizStartTime');
  };

  return { time, resetTimer };
};

export default useQuizTimer;
