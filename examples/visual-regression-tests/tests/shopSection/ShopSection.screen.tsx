import {
  Main,
  ShopSection,
  Box,
  Paragraph,
} from "@odido-portals/glow-react-native";
import React from "react";

export function ShopSectionScreen() {
  return (
    <Main>
      <ShopSection>
        <ShopSection.Container>
          <Box prominence="outline" size="sm">
            <Paragraph alignment="center">Example component</Paragraph>
          </Box>
          <Box prominence="outline" size="sm">
            <Paragraph alignment="center">Example component</Paragraph>
          </Box>
        </ShopSection.Container>
        <ShopSection.Sidebar>
          <Box prominence="outline" size="sm">
            <Paragraph alignment="center">Cart component</Paragraph>
          </Box>
          <Box prominence="outline" size="sm">
            <Paragraph alignment="center">Example component</Paragraph>
          </Box>
        </ShopSection.Sidebar>
      </ShopSection>
    </Main>
  );
}
