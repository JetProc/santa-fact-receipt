import { useState, useEffect } from 'react';

export const useNumberRolling = (targetNumber: number, duration: number = 1500, start: boolean = false) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOut = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      const nextValue = Math.floor(targetNumber * easeOut(percentage));
      setCurrentNumber(nextValue);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentNumber(targetNumber); // 확실하게 최종값으로 고정
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetNumber, duration, start]);

  return currentNumber;
};
