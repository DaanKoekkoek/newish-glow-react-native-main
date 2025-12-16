import React from "react";
import { View } from "react-native";

import { Paragraph, Stack } from "foundations/index";

export const stickybarDummyData = () => {
  return {
    content: (
      <Stack gap={0}>
        <Stack direction="row" gap="lg">
          <View style={{ flexGrow: 1 }}>
            <Paragraph>Maandelijks</Paragraph>
          </View>
          <View>
            <Paragraph>€ 33,00</Paragraph>
          </View>
        </Stack>
        <Stack direction="row" gap="lg">
          <View style={{ flexGrow: 1 }}>
            <Paragraph style={{ color: "gray" }}>Eenmalig</Paragraph>
          </View>
          <View>
            <Paragraph style={{ color: "gray" }}>€ 10,00</Paragraph>
          </View>
        </Stack>
      </Stack>
    ),
    modal: (
      <Stack gap={0}>
        <Stack direction="row" gap={0}>
          <View style={{ flexGrow: 1 }}>
            <Paragraph>Maandelijks</Paragraph>
          </View>
          <View>
            <Paragraph>€ 32,00</Paragraph>
          </View>
        </Stack>
        <Stack direction="row" gap={0}>
          <View style={{ flexGrow: 1 }}>
            <Paragraph style={{ color: "gray" }}>Extra's</Paragraph>
          </View>
          <View>
            <Paragraph style={{ color: "gray" }}>€ 1,00</Paragraph>
          </View>
        </Stack>
        <Stack direction="row" gap={0}>
          <View style={{ flexGrow: 1 }}>
            <Paragraph style={{ color: "gray" }}>Eenmalig</Paragraph>
          </View>
          <View>
            <Paragraph style={{ color: "gray" }}>€ 10,00</Paragraph>
          </View>
        </Stack>
      </Stack>
    ),
  };
};
