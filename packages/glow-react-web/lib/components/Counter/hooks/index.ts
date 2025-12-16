import { useEffect, useRef, useState } from "react";

export const useRemainingTime = (
  targetDate: Date | string,
  digits: number,
  variant: string,
  freeze: boolean,
  onCompleted?: () => void,
) => {
  const calculateTimeLeft = (): { [key: string]: number } => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (variant === "hoursOnly") {
      return {
        hours,
        minutes: minutes % 60,
      };
    }

    switch (digits) {
      case 1:
        return { days: days > 0 ? days : 1 };
      case 2:
        return { minutes, seconds: seconds % 60 };
      case 3:
        return { hours, minutes: minutes % 60, seconds: seconds % 60 };
      case 4:
      default:
        return {
          days,
          hours: hours % 24,
          minutes: minutes % 60,
          seconds: seconds % 60,
        };
    }
  };

  const [remainingTime, setRemainingTime] = useState(calculateTimeLeft);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (freeze) return;

    const tick = () => {
      const newTime = calculateTimeLeft();
      const isDone = Object.values(newTime).every((v) => v === 0);
      setRemainingTime(newTime);
      if (isDone) {
        onCompleted?.();
        if (timerRef.current) clearInterval(timerRef.current);
      }
    };

    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate, digits, variant, freeze, onCompleted]);

  return remainingTime;
};
