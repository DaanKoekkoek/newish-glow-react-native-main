import React, { createContext, useContext, useState } from "react";

import type { SubscriptionHeroInfoType } from "./SubscriptionHero.types";

interface SubscriptionHeroContextType {
  hasSubscriptionHero: undefined | SubscriptionHeroInfoType;
  setHasSubscriptionHero: (
    hasHero: undefined | SubscriptionHeroInfoType,
  ) => void;
}

const SubscriptionHeroContext = createContext<
  SubscriptionHeroContextType | undefined
>(undefined);

export const SubscriptionHeroProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [hasSubscriptionHero, setHasSubscriptionHero] = useState<
    undefined | SubscriptionHeroInfoType
  >(undefined);

  return (
    <SubscriptionHeroContext.Provider
      value={{ hasSubscriptionHero, setHasSubscriptionHero }}
    >
      {children}
    </SubscriptionHeroContext.Provider>
  );
};

export const useSubscriptionHeroContext = () => {
  const context = useContext(SubscriptionHeroContext);
  if (!context) {
    return {
      hasSubscriptionHero: undefined,
      setHasSubscriptionHero: () => {},
    };
  }
  return context;
};
