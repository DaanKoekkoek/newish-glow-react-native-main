import React, { useEffect, useCallback } from "react";
import { Icon } from "foundations/Icon";
import { InputFieldAutosuggest } from "components/InputField/InputAutosuggest/InputFieldAutosuggest";
import {
  MainNavigationControlSearch,
  MainNavigationAdditions,
} from "./MainNavigation.types";
import styles from "./styles/MainNavigation.module.scss";

type NavSearch = MainNavigationControlSearch & {
  onClose: () => void;
  ariaLabel: MainNavigationAdditions["ariaLabel"];
  onSearchClose?: () => void;
  open?: boolean;
};

export const NavSearch = React.forwardRef<HTMLDivElement, NavSearch>(
  (
    {
      onClose,
      onSearchClose,
      ariaLabel,
      value = "",
      open,
      onChange,
      ...searchProps
    },
    ref,
  ) => {
    useEffect(() => {
      if (!open && value.length) {
        onSearchClose?.();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = useCallback(() => {
      onClose();
      onSearchClose?.();
    }, [onClose, onSearchClose]);

    return (
      <div>
        <InputFieldAutosuggest
          variant="search"
          fill
          className={styles["main-navigation-search-input"]}
          iconClassName={styles["main-navigation-search-icon"]}
          popupClassName={styles["main-navigation-search-autosuggest"]}
          popupListClassName={styles["main-navigation-search-list"]}
          showClear
          value={value}
          onChange={onChange}
          ref={ref}
          suffix="default"
          {...searchProps}
        />
        <button
          type="button"
          onClick={handleClose}
          aria-label={ariaLabel?.search.close}
          className={styles["main-navigation-search-close-button"]}
        >
          <Icon name="close" />
        </button>
      </div>
    );
  },
);
