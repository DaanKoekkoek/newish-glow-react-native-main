"use client";

import { ActionButtonIcon } from "@odido-portals/glow-react-web/action-button";
import { Button, type ButtonProps } from "@odido-portals/glow-react-web/button";
import { Modal } from "@odido-portals/glow-react-web/modal";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Select } from "@odido-portals/glow-react-web/select";
import { Stack } from "@odido-portals/glow-react-web/stack";
import {
  StickyBar,
  StickyBarActionButton,
} from "@odido-portals/glow-react-web/stickybar";
import { TextLink } from "@odido-portals/glow-react-web/text-link";
import type {
  BrandName,
  Theme,
} from "@odido-portals/glow-react-web/theme-provider";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { usePersistentState } from "@/app/hooks";
import styles from "@/app/page.module.scss";

/**
 * Components are imported and exported via this file because the components do have a client-side implementation.
 * This means that there is logic included which can only execute in the browser.
 * Because of that this file is marked with the "use client" pragma.
 * Read more: [client-components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
 */
export {
  Accordion,
  AccordionPanel,
} from "@odido-portals/glow-react-web/accordion";
export { Badge, type BadgeProps } from "@odido-portals/glow-react-web/badge";
export { Carousel } from "@odido-portals/glow-react-web/carousel";
export { Footer, type FooterProps } from "@odido-portals/glow-react-web/footer";
export { InputField } from "@odido-portals/glow-react-web/input-field";
export {
  ShoppingCart,
  CartAccordion,
  CartAccordionRow,
  CartDetails,
  LineItem,
  CartCategory,
  CartDescription,
  Discount,
} from "@odido-portals/glow-react-web/shopping-cart";
export { Modal } from "@odido-portals/glow-react-web/modal";
export { Select } from "@odido-portals/glow-react-web/select";
export { Selector } from "@odido-portals/glow-react-web/selector";
export { SelectorImage } from "@odido-portals/glow-react-web/selector-image";
export { SelectorLight } from "@odido-portals/glow-react-web/selector-light";
export { Checkbox } from "@odido-portals/glow-react-web/checkbox";
export { RadioButton } from "@odido-portals/glow-react-web/radio-button";
export { ThemeProvider } from "@odido-portals/glow-react-web/theme-provider";
export { MainNavigation } from "@odido-portals/glow-react-web/main-navigation";

export const ClientButton = (props: ButtonProps<React.ElementType>) => (
  <Button {...props} />
);

export const SubNavigation = ({
  onBrandChange,
  onThemeChange,
  id,
}: {
  onBrandChange: (brand: BrandName) => void;
  onThemeChange: (theme: Theme) => void;
  id?: string;
}) => {
  const [brand, setBrand] = usePersistentState<BrandName>("odido", "odido");
  const [theme, setTheme] = usePersistentState<Theme>("light", "light");
  const [show, setShow] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    onThemeChange(theme);
  };

  const handleBrandChange = (brand: BrandName) => {
    setBrand(brand);
    onBrandChange(brand);
  };

  const hasStickyBar = pathName.includes("/shop/pdp");

  return (
    <>
      <Modal
        title="Configure"
        position="right"
        trigger={
          hasStickyBar ? (
            <ActionButtonIcon
              icon="file-edit"
              onClick={() => setShow(!show)}
              className={styles["example-sidebar-trigger"]}
            />
          ) : (
            <Button
              id={id}
              onClick={() => setShow(!show)}
              className={styles["example-sidebar-trigger"]}
            >
              Configuration
            </Button>
          )
        }
      >
        <Stack alignItems="flex-end">
          <Stack direction="row" alignItems="center">
            <TextLink
              onClick={() => {
                router.push("/");
              }}
            >
              Back to example overview
            </TextLink>
          </Stack>
          <Stack>
            <Select
              legend={{ label: "Brand" }}
              value={brand}
              id="brand-select"
              onChange={(value) => handleBrandChange(value as BrandName)}
              placeholder="brand"
              options={[
                {
                  value: "odido",
                  name: "Odido",
                },
                {
                  value: "ben",
                  name: "Ben",
                },
                {
                  value: "simpel",
                  name: "Simpel",
                },
                {
                  value: "sim-wallet",
                  name: "Simwallet",
                },
              ]}
            />
            {brand !== "sim-wallet" && (
              <Select
                legend={{ label: "Theme" }}
                value={theme}
                id="theme-select"
                onChange={(value) => handleThemeChange(value as Theme)}
                placeholder="theme"
                options={[
                  {
                    value: "dark",
                    name: "Dark",
                  },
                  {
                    value: "light",
                    name: "Light",
                  },
                ]}
              />
            )}
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export const ClientStickyBar = ({
  hideWhenVisibleRef,
}: {
  hideWhenVisibleRef?: React.RefObject<HTMLElement>;
}) => {
  return (
    <StickyBar
      hideWhenVisibleRef={hideWhenVisibleRef}
      modal={{
        trigger: <StickyBarActionButton position="bottom" onClick={() => {}} />,
        title: "Modal title",
        children: <Paragraph>Modal child</Paragraph>,
      }}
      layout={{ mobileSmall: "stacked", tablet: "default" }}
      position="bottom"
      callToAction={
        <Button
          prominence="emphasised"
          fill={{ mobileSmall: true, tablet: false }}
        >
          Button
        </Button>
      }
    >
      <Stack key="monthly" gap={0}>
        <Paragraph>Per maand</Paragraph>
        <Paragraph>€ 10,00</Paragraph>
      </Stack>
      <Stack key="one-off" gap={0}>
        <Paragraph>Eenmalig</Paragraph>
        <Paragraph>€ 15,00</Paragraph>
      </Stack>
    </StickyBar>
  );
};
