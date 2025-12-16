"use client";

import { Main } from "@odido-portals/glow-react-web/main";
import type {
  BrandName,
  Theme,
} from "@odido-portals/glow-react-web/theme-provider";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useId } from "react";

import {
  usePersistentState,
  useFooterRouting,
  useMainNavRouting,
  useAutosuggestRouting,
} from "./hooks";

import {
  ThemeProvider,
  MainNavigation,
  SubNavigation,
  Footer,
} from "@/app/ClientComponents";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [brand, setBrand] = usePersistentState<BrandName>("odido", "odido");
  const [theme, setTheme] = usePersistentState<Theme>("light", "light");
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const footerLinks = useFooterRouting();
  const search = useAutosuggestRouting();
  const mainLinks = useMainNavRouting();
  const router = useRouter();
  const pathName = usePathname();
  const videoSrc = `${process.env.NEXT_PUBLIC_BASE_PATH}/logo-glow.mp4`;
  const id = useId();

  if (!hasMounted) return null;

  return (
    <ThemeProvider
      brand={brand}
      theme={brand !== "sim-wallet" ? theme : undefined}
    >
      <Main
        header={
          <>
            <MainNavigation
              skip={{
                href: `#${id}`,
                label: "Jump to content",
              }}
              routeKey={pathName}
              sticky={!pathName.includes("shop") && !pathName.includes("my")}
              variant={pathName.includes("checkout") ? "subtle" : "default"}
              status={{
                type: "success",
                statusText: "Service",
              }}
              customerService={{
                href: "#",
                icon: "helpdesk",
                phoneNumber: "0800-7123",
                openingHours: {
                  label: "Openingstijden",
                  href: "#",
                },
              }}
              ariaLabel={{
                menu: {
                  open: "Open menu",
                  close: "Sluit menu",
                  return: "Keer terug",
                },
                search: {
                  open: "Zoeken",
                  close: "Sluit zoeken",
                },
                backdrop: "Sluit menu",
                service: "Neem contact op met service",
              }}
              logo={{
                onClick: pathName !== "/" ? () => router.push("/") : undefined,
                title: "Go back to initial page",
                brand,
                videoSrc,
                variant:
                  brand === "simpel" && theme === "light"
                    ? "inverted"
                    : undefined,
              }}
              navigationTree={!/\/my\/.+/.test(pathName) ? mainLinks : []}
              search={{ title: "Search", ...search, id: "id" }}
              user={{
                link: { onClick: () => router.push("/my/login") },
                panel: {
                  callToAction: {
                    children: "Naar My",
                    onClick: () => router.push("/my/login"),
                  },
                  items: [],
                },
              }}
              cart={{
                link: {
                  onClick: () => router.push("/shop/checkout/winkelwagen"),
                },
                panel: {
                  emptyTitle: "Je winkelwagen is leeg",
                  callToAction: {
                    children: "Naar winkelwagen",
                    onClick: () => router.push("/shop/checkout/winkelwagen"),
                  },
                  items: [],
                },
              }}
            />
            <SubNavigation
              id={id}
              onThemeChange={(theme: Theme) => setTheme(theme)}
              onBrandChange={(brand: BrandName) => setBrand(brand)}
            />
          </>
        }
        footer={<Footer brand={brand} columnLinks={footerLinks} />}
      >
        {children}
      </Main>
    </ThemeProvider>
  );
}
