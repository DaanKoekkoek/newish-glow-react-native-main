import { useCallback, useEffect, useState } from "react";

export const useScrollLockWeb = (
  isOpen: boolean,
  scrollLockClassName: string,
) => {
  const lockScroll = useCallback(() => {
    document.body.classList.add(scrollLockClassName);
  }, [scrollLockClassName]);

  const unlockScroll = useCallback(() => {
    document.body.classList.remove(scrollLockClassName);
  }, [scrollLockClassName]);

  useEffect(
    function manageScrollLock() {
      isOpen ? lockScroll() : unlockScroll();

      return () => unlockScroll();
    },
    [lockScroll, unlockScroll, isOpen],
  );

  return {
    lockScroll,
    unlockScroll,
  };
};

export const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures modal is only rendered on client side
  }, []);

  return isClient;
};
