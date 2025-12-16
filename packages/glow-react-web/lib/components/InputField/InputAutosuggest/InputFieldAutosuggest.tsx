import React, { useRef } from "react";
import classNames from "classnames";
import {
  InputField,
  type InputAutosuggestionProps,
  InputFieldProps,
} from "components/InputField";
import styles from "./InputFieldAutosuggest.module.scss";
import { createPortal } from "react-dom";
import { FocusTrap } from "_internals/Navigation";
import { sanitizeString, tokenClassNames } from "_utility";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Strong } from "foundations/Strong";
import { TextLink } from "components/TextLink";
import { Grid, Column } from "foundations/Grid";
import { useAutosuggestDropdown } from "./hooks";
export const InputFieldAutosuggest = React.forwardRef<
  HTMLDivElement,
  InputAutosuggestionProps & InputFieldProps & { fill?: boolean }
>(
  (
    {
      testID = "autosuggest",
      autoSuggestions,
      onSuggestionSelect,
      category,
      autoSuggestClassName = "",
      variant = "default",
      className,
      popupClassName,
      iconClassName,
      popupListClassName,
      fill = false,
      suffix = "solid",
      ...props
    },
    ref,
  ) => {
    const autosuggestAnchorRef = useRef<HTMLDivElement | null>(null);
    const {
      showDropdown,
      handleOpenDropdown,
      handleCloseDropdown,
      refs,
      adjustedFloatingStyles,
      matches,
      highlightMatch,
      suggestionRefs,
      portalTarget,
    } = useAutosuggestDropdown({
      ref: ref ?? (autosuggestAnchorRef as React.RefObject<HTMLDivElement>),
      autoSuggestions,
      value: props.value as string,
      fill,
    });
    return (
      <>
        <InputField
          {...props}
          className={className}
          iconClassName={iconClassName}
          value={props.value ?? ""}
          testID={`${testID}-input`}
          type={variant}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          suffix={suffix}
          ref={(el) => {
            autosuggestAnchorRef.current = el;
            refs.setReference(el);
          }}
          onFocus={(e) => {
            props.onFocus?.(e);
            handleOpenDropdown();
          }}
          onBlur={(e) => {
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            props.onChange?.(e);
            const val = e.target.value;
            if (val.length >= 2) handleOpenDropdown();
            else handleCloseDropdown();
          }}
          onKeyDown={(e) => {
            if (!showDropdown || matches.length === 0) return;

            if (e.key === "Enter") {
              e.preventDefault();
              const firstSuggestion = matches[0];
              if (firstSuggestion) {
                onSuggestionSelect?.(firstSuggestion);
                handleCloseDropdown();
              }
            }

            if (
              e.key === "ArrowDown" ||
              e.key === "ArrowUp" ||
              e.key === "Escape"
            ) {
              e.preventDefault();
              if (e.key === "Escape") handleCloseDropdown();
            }
          }}
        />
        {portalTarget &&
          showDropdown &&
          (!!matches.length ||
            ((props.value as string)?.length >= 2 &&
              variant === "search" &&
              !!category &&
              !!category.href)) &&
          createPortal(
            <FocusTrap
              testID="dropdown"
              active={showDropdown}
              focus="arrowdown"
              enableArrowKeyNavigation
              onDeactivate={handleCloseDropdown}
              onDeactivateOutside={(e?: MouseEvent) => {
                const referenceEl = refs.reference.current;
                if (
                  referenceEl instanceof HTMLElement &&
                  e?.target instanceof Node &&
                  referenceEl.contains(e.target)
                ) {
                  return;
                }
                handleCloseDropdown();
              }}
              clickOutsideDeactivates
              closeOnEscape
            >
              <div
                ref={refs.setFloating}
                className={tokenClassNames(
                  styles,
                  "autosuggest",
                  {
                    [styles["autosuggest-fill"]]: fill,
                  },
                  popupClassName,
                )}
                style={adjustedFloatingStyles}
                data-testid={testID}
              >
                <div
                  className={classNames(
                    styles["autosuggest-container"],
                    {
                      [styles["has-results"]]: !!matches.length,
                      [styles["has-fill"]]: fill,
                      [styles["has-category-link"]]:
                        !!category && category.href,
                    },
                    autoSuggestClassName,
                  )}
                >
                  <AutosuggestContentWrapper fill={fill}>
                    {!!category && !!matches.length && (
                      <Paragraph
                        size="xs"
                        className={styles["autosuggest-search-current"]}
                      >
                        {category.children}
                      </Paragraph>
                    )}
                    {!!matches.length && (
                      <ul
                        className={classNames(
                          styles["autosuggest-options"],
                          {
                            [styles["autosuggest-options-scrollable"]]:
                              matches.length > 5,
                          },
                          popupListClassName,
                        )}
                      >
                        {matches.map((item, index) => {
                          const showCategory =
                            item.category &&
                            item.category !== matches[index - 1]?.category;
                          return (
                            <React.Fragment key={item.value}>
                              {showCategory && (
                                <li className={styles["autosuggest-category"]}>
                                  <Paragraph
                                    size="xs"
                                    className={
                                      styles["autosuggest-category-text"]
                                    }
                                    testID={`category-${sanitizeString(item.category)}`}
                                  >
                                    {highlightMatch(
                                      item.category ?? "",
                                      props.value as string,
                                    )}
                                  </Paragraph>
                                </li>
                              )}
                              <li>
                                <button
                                  type="button"
                                  data-testid={`input-dropdown-suggestion-${sanitizeString(item.text)}`}
                                  className={styles["autosuggest-option"]}
                                  ref={(el) =>
                                    (suggestionRefs.current[index] = el)
                                  }
                                  onClick={() => {
                                    onSuggestionSelect?.(item);
                                    handleCloseDropdown();
                                  }}
                                >
                                  {variant === "search" && (
                                    <Icon
                                      name="search"
                                      size="sm"
                                      className={
                                        styles["autosuggest-option-icon"]
                                      }
                                    />
                                  )}
                                  <Strong size="sm">
                                    {highlightMatch(
                                      item.text,
                                      props.value as string,
                                    )}
                                  </Strong>
                                </button>
                              </li>
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    )}
                    {!!category && category.href && variant === "search" && (
                      <TextLink
                        {...category}
                        as="a"
                        href={`${category.href}?q=${props.value}`}
                        size="xs"
                        textStyle={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {`${category.children} '${props.value}'`}
                        <Icon name="arrow-right" size="sm" />
                      </TextLink>
                    )}
                  </AutosuggestContentWrapper>
                </div>
              </div>
            </FocusTrap>,
            portalTarget,
          )}
      </>
    );
  },
);
type AutosuggestContentWrapperProps = {
  fill?: boolean;
  children: React.ReactNode;
};
export const AutosuggestContentWrapper = ({
  fill = false,
  children,
}: AutosuggestContentWrapperProps) => {
  return fill ? (
    <Grid>
      <Column>{children}</Column>
    </Grid>
  ) : (
    <>{children}</>
  );
};
