import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { StickyBarActionButtonProps, StickyBarProps } from "./StickyBar.types";
import styles from "./StickyBar.module.scss";
import { Modal, ActionButtonIcon, ModalProps } from "components/index";
import { Grid, Column } from "foundations/Grid";
import { useGenerateClassNames } from "_global-hooks";
import { tokenClassNames } from "_utility";
import { IconNames } from "foundations/Icon";

export const StickyBar = ({
  children,
  modal,
  callToAction,
  layout = "default",
  position = "bottom",
  testID = "sticky-bar",
  width = "default",
  hideWhenVisibleRef,
}: StickyBarProps) => {
  const layoutClass = useGenerateClassNames(
    styles,
    layout,
    "sticky-bar-column",
  );
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const [stickyHeight, setStickyHeight] = useState<number>(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!stickyBarRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!stickyBarRef.current) return;
      const { height } = stickyBarRef.current.getBoundingClientRect();
      setStickyHeight(height);
    });

    observer.observe(stickyBarRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = hideWhenVisibleRef?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hideWhenVisibleRef]);

  useEffect(() => {
    const mainElement = document.body;
    if (!mainElement) return;

    if (position === "top") {
      mainElement.style.paddingTop = `${stickyHeight}px`;
      mainElement.style.paddingBottom = "0px";
    } else if (position === "bottom") {
      mainElement.style.paddingTop = "0px";

      if (isHidden) {
        mainElement.style.paddingBottom = "0px";
      } else {
        mainElement.style.paddingBottom = `${stickyHeight}px`;
      }
    } else {
      mainElement.style.paddingBlock = "0px";
    }

    return () => {
      mainElement.style.paddingTop = "0px";
      mainElement.style.paddingBottom = "0px";
    };
  }, [position, stickyHeight, isHidden]);

  return (
    <div
      ref={stickyBarRef}
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "sticky-bar",
        styles[`sticky-bar-position-${position}`],
        {
          [styles[`sticky-bar-hide-${position}`]]: isHidden,
        },
      )}
    >
      <Grid containerClassName={styles[`sticky-bar-width-${width}`]}>
        <Column
          className={classNames(styles["sticky-bar-column"], layoutClass)}
        >
          {(!!children || !!modal) && (
            <div className={styles["sticky-bar-content"]}>
              {!!children && (
                <div className={styles["sticky-bar-content-children"]}>
                  {children}
                </div>
              )}
              {!!modal && <StickyBarModal {...modal} />}
            </div>
          )}
          <div
            className={classNames(styles["sticky-bar-buttons"], {
              [styles["sticky-bar-buttons-only"]]: !children && !modal,
            })}
          >
            {callToAction}
          </div>
        </Column>
      </Grid>
    </div>
  );
};

const StickyBarModal = ({ ...props }: ModalProps) => (
  <Modal {...props} position="bottom" />
);

export const StickyBarActionButton = ({
  ...props
}: StickyBarActionButtonProps) => {
  const initialIcon: IconNames =
    props.position === "bottom" ? "chevron-up" : "chevron-down";
  const toggledIcon: IconNames =
    props.position === "bottom" ? "chevron-down" : "chevron-up";

  const [iconName, setIconName] = useState<IconNames>(initialIcon);

  useEffect(() => {
    setIconName(props.isModalOpen ? toggledIcon : initialIcon);
  }, [props.isModalOpen, initialIcon, toggledIcon]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIconName(iconName === initialIcon ? toggledIcon : initialIcon);
    props.onClick?.(e);
  };

  return (
    <ActionButtonIcon
      {...props}
      ariaLabel={iconName}
      icon={iconName}
      inverted
      onClick={handleClick}
    />
  );
};
