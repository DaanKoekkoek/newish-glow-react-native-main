import {
  autoUpdate,
  flip,
  Placement,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import classNames from "classnames";
import { Icon } from "foundations/Icon";
import { useState, useId } from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.scss";
import { TooltipProps } from "./Tooltip.types";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

export const Tooltip = ({
  description,
  children,
  tipPosition = "left",
  testID = "tooltip",
  closeButton = false,
  animated = false,
  active = true,
}: TooltipProps) => {
  const tipPositionClass = tipPosition === "left" ? "start" : "end";
  const [visibility, setVisibility] = useState(false);
  const tooltipId = useId();

  const toggleVisibility = () => {
    if (!active) return;
    setVisibility((prev) => !prev);
    update();
  };

  const handleClose = () => {
    if (!active) return;
    setVisibility(false);
    update();
  };

  // Handle keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && visibility) {
      handleClose();
    }
  };

  // Handle focus events for keyboard users
  const handleFocus = () => {
    if (!closeButton) {
      if (!active) return;
      setVisibility(true);
      update();
    }
  };

  const handleBlur = () => {
    if (!closeButton) {
      if (!active) return;
      setVisibility(false);
      update();
    }
  };

  const { refs, update, floatingStyles, placement } = useFloating({
    placement: `top-${tipPositionClass}` as Placement,
    middleware: [
      flip({
        fallbackPlacements: [`bottom-${tipPositionClass}`],
        fallbackAxisSideDirection: tipPosition === "left" ? "end" : "start",
        crossAxis: true,
        mainAxis: true,
      }),
      shift({
        mainAxis: true,
        crossAxis: false,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <span
      className={tokenClassNames(styles, "tooltip", {
        [styles.animated]: animated,
      })}
      data-testid={testID}
    >
      <button
        type="button"
        ref={refs.setReference}
        className={styles["tooltip-button"]}
        aria-label="Show tooltip information"
        aria-describedby={tooltipId}
        onKeyDown={handleKeyDown} // Keyboard support
        {...(closeButton
          ? { onClick: toggleVisibility }
          : {
              onMouseEnter: toggleVisibility,
              onMouseLeave: handleClose,
              onFocus: handleFocus,
              onBlur: handleBlur,
            })}
        data-testid={`${testID}-button`}
        disabled={!active}
      >
        {children}
      </button>
      {createPortal(
        <div
          ref={refs.setFloating}
          className={classNames(styles["tooltip-popup"], {
            [styles.animated]: animated,
            [styles.visible]: active && visibility,
            [styles.hidden]: !visibility,
          })}
          style={floatingStyles}
          data-testid={`${testID}-tooltip`}
        >
          <span
            id={tooltipId}
            className={tokenClassNames(
              styles,
              "tooltip-box",
              styles[placement],
            )}
            role="tooltip"
            data-testid={`${testID}-tooltip-box`}
          >
            <Paragraph
              as="span"
              size="sm"
              className={styles["tooltip-description"]}
              testID={`${testID}-description`}
            >
              {description}
            </Paragraph>
            {closeButton && (
              <button
                className={styles["tooltip-close-button"]}
                onClick={handleClose}
                aria-label="Close tooltip"
                data-testid={`${testID}-close-button`}
              >
                <Icon name="close" className={styles["tooltip-close-icon"]} />
              </button>
            )}
          </span>
        </div>,
        document.body,
      )}
    </span>
  );
};
