import { CalloutProps } from "./Callout.types";
import { BaseStatusButton } from "_internals/Button";
import { Heading } from "foundations/Heading";
import { IconNames, Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Visible } from "utilities/Visibility";
import styles from "./Callout.module.scss";
import { tokenClassNames } from "_utility";

export const Callout = ({
  children,
  content = "default",
  description,
  className,
  prominence = "default",
  status = "default",
  tipPosition = "default",
  title,
  titleAs,
  buttonPrimary,
  buttonSecondary,
  testID = "callout",
}: CalloutProps) => {
  const iconName = (status: CalloutProps["status"]): IconNames => {
    switch (status) {
      case "error":
        return "status-error";
      case "success":
        return "status-success";
      case "warning":
        return "status-warning";
      default:
        return "status-info";
    }
  };

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "callout",
        styles[iconName(status)],
        {
          [styles["tip-position-default"]]: tipPosition === "default",
          [styles["tip-position-top"]]: tipPosition === "top",
          [styles["prominence-default"]]: prominence === "default",
          [styles["prominence-subtle"]]: prominence === "subtle",
        },
        className,
      )}
    >
      <div className={styles["callout-content"]}>
        <div className={styles["callout-header"]}>
          <Icon
            name={iconName(status)}
            solid
            className={styles["callout-header-icon"]}
            testID={`${iconName(status)}-icon`}
          />
          <Heading
            size="sm"
            as={titleAs}
            className={styles["callout-header-heading"]}
          >
            {title}
          </Heading>
        </div>

        {content === "default" ? (
          <Paragraph className={styles["callout-paragraph"]}>
            {description}
          </Paragraph>
        ) : (
          <div className={styles["callout-paragraph"]}>{children}</div>
        )}
      </div>
      {(buttonPrimary || buttonSecondary) && (
        <div className={styles["callout-call-to-actions"]}>
          {buttonPrimary && (
            <>
              <Visible below="laptop">
                <BaseStatusButton
                  {...buttonPrimary.props}
                  status={status === "default" ? "information" : status}
                  size="sm"
                />
              </Visible>
              <Visible above="laptop">
                <BaseStatusButton
                  {...buttonPrimary.props}
                  status={status === "default" ? "information" : status}
                />
              </Visible>
            </>
          )}
          {buttonSecondary && (
            <>
              <Visible below="laptop">
                <BaseStatusButton
                  {...buttonSecondary.props}
                  status={status === "default" ? "information" : status}
                  size="sm"
                />
              </Visible>
              <Visible above="laptop">
                <BaseStatusButton
                  {...buttonSecondary.props}
                  status={status === "default" ? "information" : status}
                />
              </Visible>
            </>
          )}
        </div>
      )}
    </div>
  );
};
