import React from "react";
import { BaseText } from "_internals/Typography";
import type { MainNavigationBaseLink } from "./MainNavigation.types";

type NavLinkProps = Partial<Omit<MainNavigationBaseLink, "label">> & {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

export const NavLink = React.memo(
  ({
    href,
    onClick,
    title,
    className,
    children,
    ariaLabel,
    target,
    lang = "nl",
  }: NavLinkProps) => {
    if (onClick && !href) {
      return (
        <button
          lang={lang}
          type="button"
          onClick={onClick}
          className={className}
          title={title}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      );
    }

    if (href) {
      return (
        <BaseText
          lang={lang}
          target={target}
          as="a"
          href={href}
          className={className}
          title={title}
          aria-label={ariaLabel}
        >
          {children}
        </BaseText>
      );
    }

    return (
      <span lang={lang} className={className}>
        {children}
      </span>
    );
  },
);
