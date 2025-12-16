import { Tooltip, Icon } from "@odido-portals/glow-react-native";
import React from "react";
import { View } from "react-native";

export function TooltipDemoScreen() {
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          position: "relative",
          paddingVertical: 75,
          justifyContent: "center",
          alignSelf: "flex-start",
        }}
      >
        <Tooltip
          description="Description 2"
          testID="Tooltip-1"
          posHorizontal="Right"
        >
          <Icon name="status-info" />
        </Tooltip>
      </View>
      <View
        style={{
          position: "relative",
          paddingVertical: 75,
          justifyContent: "center",
          alignSelf: "flex-start",
        }}
      >
        <Tooltip description="Description 2" testID="Tooltip-2">
          <Icon name="status-info" />
        </Tooltip>
      </View>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          paddingVertical: 75,
          alignSelf: "flex-end",
        }}
      >
        <Tooltip
          description="Description 2"
          testID="Tooltip-3"
          posHorizontal="Right"
        >
          <Icon name="status-info" />
        </Tooltip>
      </View>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          paddingVertical: 75,
          alignSelf: "flex-end",
        }}
      >
        <Tooltip description="Description 2" testID="Tooltip-4">
          <Icon name="status-info" />
        </Tooltip>
      </View>
    </View>
  );
}
