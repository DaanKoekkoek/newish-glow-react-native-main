import type { BreakpointKeys } from "_theming/breakpoints";
import { View } from "react-native";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

import type {
  AppIconComponentProps,
  AppIconProps,
  AppName,
} from "./AppIcon.types";
import { Essential } from "./icons/Essential";
import { HostedVoice } from "./icons/HostedVoice";
import { Klantkampioen } from "./icons/Klantkampioen";
import { KlikEnKlaar } from "./icons/KlikEnKlaar";
import { OveralVeiligOnline } from "./icons/OveralVeiligOnline";
import { ThuisVeiligOnline } from "./icons/ThuisVeiligOnline";
import { Tv } from "./icons/Tv";
import { TvAnywhere } from "./icons/TvAnywhere";

const appNameToComponentMap: Record<AppName, React.FC<AppIconProps>> = {
  "Klik & Klaar": KlikEnKlaar,
  TV: Tv,
  "TV Anywhere": TvAnywhere,
  "Thuis Veilig Online": ThuisVeiligOnline,
  "Overal Veilig Online": OveralVeiligOnline,
  "Hosted Voice": HostedVoice,
  Essential,
  Klantkampioen,
} as const;

const getAppIconComponent = (appName: AppName) =>
  appNameToComponentMap[appName];

export const AppIcon = ({
  brand,
  app,
  disabled = false,
}: AppIconComponentProps) => {
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const { styles } = useStyles(stylesheet, {
    disabled: disabled ? "true" : "false",
  });

  const {
    theme: {
      themes: {
        components: {
          assets: {
            logosAndVisuals: { appIcons },
          },
        },
      },
    },
  } = useStyles();

  const AppIconComponent = getAppIconComponent(app);

  if (!AppIconComponent) return null;

  return (
    <View testID={`${app}-test`} style={styles.container}>
      <AppIconComponent
        disabled={disabled}
        size={appIcons.size.sm[breakpoint]}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        assets: {
          logosAndVisuals: { appIcons },
        },
      },
    },
  }) => ({
    container: {
      width: appIcons.size.sm,
      height: appIcons.size.sm,
      borderRadius: appIcons.radius.sm,
      borderWidth: appIcons.borderWidth.default,
      borderColor: appIcons.color.border.default,
      backgroundColor: appIcons.color.fill.default,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-start",
      variants: {
        disabled: {
          true: {
            borderWidth: appIcons.borderWidth.inactive,
            borderColor: appIcons.color.border.inactive,
            backgroundColor: "transparent",
          },
          false: {},
        },
      },
    },
  }),
);
