import { Main, LocalNavigation } from "@odido-portals/glow-react-native";
import React from "react";
import { View } from "react-native";

export function LocalNavigationScreen() {
  return (
    <Main>
      <View style={{ gap: 10 }}>
        <LocalNavigation
          variant="default"
          title="Title"
          leftAction={{
            title: "Terug",
            icon: "chevron-left",
            onPress: () => {},
          }}
          prominence="emphasised"
          rightAction={{
            title: "Action right",
            icon: "add",
            onPress: () => {},
          }}
        />
        <LocalNavigation
          variant="compact"
          title="Title"
          leftAction={{
            title: "Terug",
            icon: "chevron-left",
            onPress: () => {},
          }}
          rightAction={{
            title: "Action right",
            icon: "add",
            onPress: () => {},
          }}
        />
        <LocalNavigation
          variant="compact"
          title="Title"
          prominence="emphasised"
          leftAction={{
            title: "Terug",
            icon: "chevron-left",
            onPress: () => {},
          }}
        />
        <LocalNavigation
          title="Title"
          variant="compact"
          rightAction={{
            title: "Action right",
            icon: "add",
            onPress: () => {},
          }}
        />
        <LocalNavigation
          variant="default"
          title="Title"
          paragraph="Paragraph"
          rightAction={{
            title: "Action right",
            icon: "add",
            onPress: () => {},
          }}
        />
        <LocalNavigation
          variant="default"
          title="Title"
          leftAction={{
            title: "Terug",
            icon: "chevron-left",
            onPress: () => {},
          }}
          rightAction={{
            title: "Action right",
            icon: "add",
            onPress: () => {},
          }}
        />
      </View>
    </Main>
  );
}
