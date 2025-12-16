import { Heading, Icon, Paragraph } from "foundations/index";
import React, { createContext, useContext } from "react";
import classNames from "classnames";
import styles from "./Accordion.module.scss";
import { useDelayedUnmount, useAccordionState } from "./hooks";

import type {
  AccordionProps,
  AccordionPanelProps,
  AccordionContextProps,
} from "./Accordion.types";
import { tokenClassNames } from "_utility";

const AccordionContext = createContext<AccordionContextProps>({
  index: 0,
  active: false,
  activeHandler: () => {},
});

const useAccordionContext = () => useContext(AccordionContext);

export const Accordion = ({
  children,
  testID = "accordion",
  inverted = false,
  active,
  multiple = true,
  className,
}: AccordionProps) => {
  const { activePanels, togglePanel } = useAccordionState(active, multiple);

  return (
    <div
      className={tokenClassNames(styles, "accordion", className, {
        [styles["is-inverted"]]: !!inverted,
      })}
      data-testid={testID}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          throw new Error(
            "Accordion component only accepts Panel as children.",
          );
        }
        return (
          <AccordionContext.Provider
            value={{
              active: activePanels.includes(index),
              activeHandler: togglePanel,
              index: index,
            }}
          >
            <AccordionPanel
              children={child.props.children}
              testID={`${testID}-panel`}
              title={child.props.title}
              key={index}
            />
          </AccordionContext.Provider>
        );
      })}
    </div>
  );
};

export const AccordionPanel = ({
  title,
  children,
  testID,
}: AccordionPanelProps) => {
  const { index, active, activeHandler } = useAccordionContext();
  const shouldRenderContent = useDelayedUnmount(active ?? false, 300);

  return (
    <div
      className={classNames(styles["accordion-panel"], {
        [styles["is-active"]]: !!active,
      })}
      data-testid={testID}
    >
      <button
        type="button"
        aria-label={title}
        aria-expanded={!!shouldRenderContent}
        aria-controls={`panel-${index}`}
        className={styles["accordion-toggle"]}
        onClick={() => activeHandler?.(index ?? 0)}
      >
        <Heading
          as="h3"
          className={classNames(
            styles["accordion-heading"],
            styles["accordion-toggle-heading"],
          )}
        >
          {title}
        </Heading>
        <div className={styles["accordion-icon"]}>
          <div
            className={classNames(styles["accordion-icon-expanded"], {
              [styles["is-active"]]: !!active,
            })}
          >
            <Icon name="min" />
          </div>
          <div
            className={classNames(styles["accordion-icon-collapsed"], {
              [styles["is-active"]]: !!active,
            })}
          >
            <Icon name="plus" />
          </div>
        </div>
      </button>
      <div
        aria-hidden={!active}
        className={classNames(styles["accordion-panel-content"], {
          [styles["is-active"]]: !!active,
        })}
        id={`panel-${index}`}
        role="region"
      >
        {!!shouldRenderContent && (
          <div className={styles["accordion-panel-content-child"]}>
            {React.Children.map(children, (child) =>
              React.isValidElement(child) ? (
                child
              ) : (
                <Paragraph size="sm">{child}</Paragraph>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};
