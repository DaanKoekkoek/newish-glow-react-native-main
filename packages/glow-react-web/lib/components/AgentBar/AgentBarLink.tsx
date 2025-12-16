import { Icon, IconNames } from "foundations/Icon";
import { AgentBarLink as AgentBarLinkProps } from "./AgentBar.types";
import styles from "./AgentBar.module.scss";
import { TextLink } from "components/TextLink";
import { Visible } from "utilities/Visibility";
import { BaseText } from "_internals/Typography";

export const AgentBarLink = ({
  link,
  icon,
}: {
  link: AgentBarLinkProps;
  icon: IconNames;
}) => (
  <TextLink
    href={link.href}
    title={link.title}
    onClick={link.onClick}
    className={styles["agent-bar-link"]}
  >
    <Icon className={styles["agent-bar-icon"]} name={icon} />
    <Visible above="laptop">
      <BaseText className={styles["agent-bar-link-text"]}>
        {link.label}
      </BaseText>
    </Visible>
  </TextLink>
);
