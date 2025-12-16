import type { OdidoPalette } from "_theming/tokenLoader";
import type { SectionInfoProps, SectionVariant } from "foundations/Section";
import React, { createContext, useContext, useState, useCallback } from "react";

import type {
  TopNavigationOffset,
  TopNavigationContextProps,
  TopNavigationProps,
} from "./TopNavigation.types";
import type { SubscriptionHeroInfoType } from "../SubscriptionHero/SubscriptionHero.types";

const initialContextValue: TopNavigationContextProps = {
  opacityOffset: { y: 0, height: 0 },
  sectionInfo: [],
  yOffset: 0,
  subscriptionHeroTitle: "",
  setInitialPaletteColors: () => {},
  setTopNavigationContent: () => {},
  setYOffset: () => {},
  topNavigationVariant: undefined,
  topNavigationPalette: undefined,
  topNavigationPaletteHero: undefined,
  updateOpacityOffset: () => {},
  updatePaletteColors: () => {},
  updateTopNavigationTitle: () => {},
  updateSectionInfo: () => {},
  removeSectionInfo: () => {},
};

const TopNavigationContext =
  createContext<TopNavigationContextProps>(initialContextValue);

const TopNavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sectionInfo, setSectionInfo] = useState<SectionInfoProps[]>([]);
  const [subscriptionHeroTitle, setSubscriptionHeroTitle] =
    useState<string>("");
  const [opacityOffset, setOpacityOffset] = useState<
    TopNavigationOffset | undefined
  >(undefined);
  const [yOffset, setYOffset] = useState<number>(0);

  const [topNavigationContent, setTopNavigationContent] =
    useState<TopNavigationProps | null>(null);

  const [topNavigationVariant, setTopNavigationVariant] = useState<
    SectionVariant | undefined
  >(undefined);
  const [topNavigationPalette, setTopNavigationPalette] =
    useState<OdidoPalette>();
  const [topNavigationPaletteHero, setTopNavigationPaletteHero] = useState<
    undefined | SubscriptionHeroInfoType
  >(undefined);

  const setInitialPaletteColors = useCallback(
    (sections?: SectionInfoProps[]) => {
      const section =
        sections?.find((s) => s.hasSubscriptionHero) || sections?.[0];

      if (section) {
        const sectionPalette = section.hasSubscriptionHero
          ? section.hasSubscriptionHero.colorPalette
          : section.sectionPalette;
        setTopNavigationPalette(sectionPalette);
        setTopNavigationPaletteHero(section.hasSubscriptionHero);
        setTopNavigationVariant(section.sectionVariant);
      }
    },
    [],
  );

  const updateOpacityOffset = useCallback(
    (offset: TopNavigationOffset) => setOpacityOffset(offset),
    [],
  );

  const updatePaletteColors = useCallback(
    (offsetYPosition: number) => {
      let currentSection = null;
      const topNavHeight = topNavigationContent?.height
        ? topNavigationContent.height
        : 0;
      let cumulativeOffset = topNavHeight;

      for (let i = 0; i < sectionInfo.length; i++) {
        const section = sectionInfo[i];
        if (
          offsetYPosition >= cumulativeOffset &&
          offsetYPosition < cumulativeOffset + section.sectionHeight.value
        ) {
          currentSection = section;
          break;
        }
        cumulativeOffset += section.sectionHeight.value;
      }

      if (currentSection) {
        const sectionPalette = currentSection.hasSubscriptionHero
          ? currentSection.hasSubscriptionHero.colorPalette
          : currentSection.sectionPalette;
        setTopNavigationVariant(currentSection.sectionVariant);
        setTopNavigationPalette(sectionPalette);
        setTopNavigationPaletteHero(currentSection.hasSubscriptionHero);
      }
    },
    [sectionInfo, topNavigationContent],
  );

  const updateSectionInfo = useCallback((info: SectionInfoProps) => {
    setSectionInfo((prev) => {
      const sectionInfoMap = new Map(prev.map((item) => [item.uuid, item]));

      sectionInfoMap.set(info.uuid, info);

      return Array.from(sectionInfoMap.values());
    });
  }, []);

  const removeSectionInfo = useCallback((uuid: string) => {
    setSectionInfo((prev) => prev.filter((section) => section.uuid !== uuid));
  }, []);

  const updateTopNavigationTitle = useCallback(
    (text: string) => setSubscriptionHeroTitle(text),
    [],
  );

  return (
    <TopNavigationContext.Provider
      value={{
        sectionInfo,
        opacityOffset,
        yOffset,
        setInitialPaletteColors,
        setTopNavigationContent,
        setYOffset,
        subscriptionHeroTitle,
        topNavigationContent,
        topNavigationVariant,
        topNavigationPalette,
        topNavigationPaletteHero,
        updateTopNavigationTitle,
        updateOpacityOffset,
        updateSectionInfo,
        updatePaletteColors,
        removeSectionInfo,
      }}
    >
      {children}
    </TopNavigationContext.Provider>
  );
};

const useTopNavigationContext = () => useContext(TopNavigationContext);

export { TopNavigationProvider, useTopNavigationContext };
