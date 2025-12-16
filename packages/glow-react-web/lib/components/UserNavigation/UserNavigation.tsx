import classNames from "classnames";
import { UserNavigationProps } from "./UserNavigation.types";
import styles from "./UserNavigation.module.scss";
import { Grid, Column } from "foundations/Grid";
import { Stack } from "foundations/Stack";
import { Avatar } from "_internals/Navigation";
import { TextLink } from "..";
import { tokenClassNames } from "_utility";

export const UserNavigation = ({
  myAccountLink,
  logoutLink,
  testID = "user-navigation",
}: UserNavigationProps) => (
  <nav
    className={tokenClassNames(styles, "user-navigation")}
    data-testid={testID}
  >
    <Grid>
      <Column className={styles["user-navigation-column"]}>
        <Stack
          direction="row"
          wrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          className={styles["user-navigation-stack"]}
        >
          {myAccountLink && (
            <TextLink
              {...myAccountLink}
              className={classNames(
                styles["user-navigation-link"],
                styles["user-navigation-avatar"],
              )}
            >
              <Stack direction="row" alignItems="center" gap={100}>
                <Avatar className={styles["user-navigation-avatar-initials"]}>
                  {myAccountLink.initials}
                </Avatar>
                <span>{myAccountLink.children}</span>
              </Stack>
            </TextLink>
          )}
          {logoutLink && (
            <TextLink
              {...logoutLink}
              className={styles["user-navigation-link"]}
              textClassName={styles["user-navigation-link-text"]}
            />
          )}
        </Stack>
      </Column>
    </Grid>
  </nav>
);
