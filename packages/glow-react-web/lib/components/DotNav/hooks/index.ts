import { useEffect, useState } from "react";

type UseDotNavProps = {
  count: number;
  activeIndex?: number;
  timerDuration?: number;
  onNext?: (nextIndex: number) => void;
  onDotClick?: (index: number) => void;
};

export const useDotNav = ({
  count,
  activeIndex: controlledActiveIndex,
  timerDuration,
  onNext,
  onDotClick,
}: UseDotNavProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(
    controlledActiveIndex ?? 0,
  );
  const [progress, setProgress] = useState(0);

  // Sync with controlled activeIndex
  useEffect(() => {
    if (
      controlledActiveIndex !== undefined &&
      controlledActiveIndex !== internalActiveIndex
    ) {
      setInternalActiveIndex(controlledActiveIndex);
      setProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledActiveIndex]);

  // Animate progress
  useEffect(() => {
    if (!timerDuration) return;

    setProgress(0);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min(elapsed / timerDuration, 1);
      setProgress(percentage);

      if (percentage >= 1) {
        clearInterval(interval);
        setInternalActiveIndex((prev) => {
          const nextIndex = (prev + 1) % count;
          onNext?.(nextIndex);
          return nextIndex;
        });
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [internalActiveIndex, timerDuration, count, onNext]);

  const handleDotClick = (index: number) => {
    setInternalActiveIndex(index);
    setProgress(0);
    onDotClick?.(index);
  };

  return {
    internalActiveIndex,
    progress,
    handleDotClick,
  };
};
