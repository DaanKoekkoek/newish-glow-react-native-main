import styles from "./Header.module.scss";
import classNames from "classnames";
import { HeaderMainProps } from "./Header.types";
import { Icon } from "foundations/Icon";
import { Logos } from "foundations/Logos";
import { useState, useCallback } from "react";
import React from "react";
import { HeaderMenuButton } from "./HeaderMenuButton"; // Import the HeaderMenuButton component
import { InputFieldAutosuggest } from "components/InputField/InputAutosuggest/InputFieldAutosuggest";
import { AutoSuggestion } from "components/InputField";

export const HeaderMain = ({
  children,
  leftColumnItems = [],
  rightColumnItems = [],
  className,
  testID,
  headerState = "default",
  searchAutoSuggestions = [],
  onHeaderStateChange,
  layout = "default",
  brand = "odido",
  onSearch,
  logoHref,
}: HeaderMainProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");

  // Search related handlers
  const handleSearchClose = useCallback(() => {
    if (onHeaderStateChange) {
      setSearchValue("");
      onHeaderStateChange("default");
    }
  }, [onHeaderStateChange]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: AutoSuggestion) => {
      setSearchValue(suggestion.text);
      // Call the onSearch prop with the suggestion value
      if (onSearch) {
        onSearch(suggestion.text);
      }
      // Close search after selection
      if (onHeaderStateChange) {
        onHeaderStateChange("default");
      }
    },
    [onSearch, onHeaderStateChange],
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchValue.trim() && onSearch) {
        onSearch(searchValue);
      }
      // Close search after submission
      if (onHeaderStateChange) {
        onHeaderStateChange("default");
      }
    },
    [searchValue, onSearch, onHeaderStateChange],
  );

  // If in search mode, show only the search input
  if (headerState === "search") {
    return (
      <div
        className={classNames(
          styles["header-main"],
          styles["search-mode"],
          className,
        )}
        data-testid={testID}
      >
        <div className={styles["header-main-content"]}>
          <div className={styles["search-container"]}>
            <form onSubmit={handleSearchSubmit}>
              <InputFieldAutosuggest
                id="header-search"
                type="search"
                variant="search"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                onSuggestionSelect={handleSuggestionSelect}
                autoSuggestions={searchAutoSuggestions}
                testID="header-search-input"
                category={{ href: "#", children: "Zoek op" }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                showClear
              />
              <button type="submit" style={{ display: "none" }} />
            </form>
            <HeaderMenuButton
              iconLeft={<Icon name="close" size="default" />}
              label=""
              onClick={handleSearchClose}
              aria-label="Close search"
              className={styles["close-button"]}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles["header-main"], className, {
        [styles["layout-alternate"]]: layout === "alternate",
        [styles["mobile-menu-open"]]: headerState === "level1",
      })}
      data-testid={testID}
    >
      <div className={styles["header-main-content"]}>
        {/* Logo - Always visible */}
        <div className={styles["logo-content"]}>
          {logoHref ? (
            <a href={logoHref}>
              <Logos brand={brand} size="default" />
            </a>
          ) : (
            <Logos brand={brand} size="default" />
          )}
        </div>

        {/* Left column items - always render the column for spacing */}
        <div className={styles["column-left"]}>
          {leftColumnItems.map((item, index) => (
            <React.Fragment key={`left-column-item-${index}`}>
              {item}
            </React.Fragment>
          ))}
        </div>

        {/* Right column items - always render the column for spacing */}
        <div className={styles["column-right"]}>
          {rightColumnItems.map((item, index) => (
            <React.Fragment key={`right-column-item-${index}`}>
              {item}
            </React.Fragment>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
};
