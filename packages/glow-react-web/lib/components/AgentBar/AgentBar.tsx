import styles from "./AgentBar.module.scss";
import { AgentBarProps } from "./AgentBar.types";
import { Visible } from "utilities/Visibility";
import { Strong } from "foundations/Strong";
import { AgentBarLink } from "./AgentBarLink";
import { Column, Grid } from "foundations/Grid";
import { tokenClassNames } from "_utility";

export const AgentBar = ({
  appointmentLink,
  logoutLink,
  telesalesLink,
  userId,
  agentId,
  className,
}: AgentBarProps) => {
  return (
    <div
      className={tokenClassNames(styles, "agent-bar", className)}
      aria-label="agent bar"
    >
      <Grid>
        <Column className={styles["agent-bar-column"]}>
          <div className={styles["agent-bar-content"]}>
            <AgentBarLink link={telesalesLink} icon="arrow-left" />
            {appointmentLink && (
              <AgentBarLink link={appointmentLink} icon="fixed-phone" />
            )}
          </div>
          <div className={styles["agent-bar-content"]}>
            <div className={styles["agent-bar-data"]}>
              <Strong size="sm">{agentId.label}</Strong>
              <Visible above="tablet">
                <Strong size="sm">{agentId.extension}</Strong>
              </Visible>
            </div>
            <Strong size="sm">{userId}</Strong>
            <AgentBarLink link={logoutLink} icon="logout" />
          </div>
        </Column>
      </Grid>
    </div>
  );
};
