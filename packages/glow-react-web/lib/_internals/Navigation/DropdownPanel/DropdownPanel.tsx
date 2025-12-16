import classNames from "classnames";
import styles from "./DropdownPanel.module.scss";
import { DropdownPanelProps } from "./DropdownPanel.types";
import { Divider } from "components/Divider";
import { Button } from "components/Button";
import { tokenClassNames } from "_utility";
import { Stagger } from "_internals/Animation";

export const DropdownPanel = ({
  animated = false,
  maxHeight = false,
  cornerPosition = "right",
  footerChildren,
  callToAction,
  children,
  testID = "dropdown-panel",
}: DropdownPanelProps) => {
  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "dropdown-panel",
        styles[`dropdown-panel-corner-${cornerPosition}`],
      )}
    >
      {!!children &&
        (animated ? (
          <Stagger
            open
            delay={0.7}
            tabIndex={maxHeight ? -1 : 0}
            className={classNames(styles["dropdown-panel-container"], {
              [styles["dropdown-panel-max-height"]]: maxHeight,
            })}
          >
            {children}
          </Stagger>
        ) : (
          <div
            tabIndex={maxHeight ? -1 : 0}
            className={classNames(styles["dropdown-panel-container"], {
              [styles["dropdown-panel-max-height"]]: maxHeight,
            })}
          >
            {children}
          </div>
        ))}
      {(!!footerChildren || !!callToAction) && (
        <>
          {!!children && (
            <>
              <Divider prominence="subtle" variant="default" />
              {footerChildren}
            </>
          )}
          {animated ? (
            <Stagger
              open
              delay={0.8}
              className={styles["dropdown-panel-container"]}
            >
              {!!callToAction && <Button {...callToAction} fill />}
            </Stagger>
          ) : (
            <div className={styles["dropdown-panel-container"]}>
              {!!callToAction && <Button {...callToAction} fill />}
            </div>
          )}
        </>
      )}
    </div>
  );
};
