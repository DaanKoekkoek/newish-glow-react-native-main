import {
  type StickyBarPosition,
  Button,
  Divider,
  Grid,
  List,
  Main,
  Paragraph,
  Price,
  Section,
  Stack,
  StickyBar,
  Toggle,
} from "@odido-portals/glow-react-native";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = (position: StickyBarPosition) => {
  const insets = useSafeAreaInsets();

  return (
    <Main
      hasStickybar
      safeAreaInsets={insets}
      headerComponent={
        <>
          <View
            style={{
              paddingVertical: 8,
              backgroundColor: "white",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Grid>
              <Grid.Column>
                <Paragraph>Header</Paragraph>
              </Grid.Column>
            </Grid>
          </View>
          <Divider />
        </>
      }
      footerComponent={
        <>
          <View
            style={{
              paddingVertical: 8,
              backgroundColor: "blue",
              justifyContent: "center",
              height: 200,
            }}
          >
            <Grid>
              <Grid.Column>
                <Paragraph style={{ color: "white" }}>Footer</Paragraph>
              </Grid.Column>
            </Grid>
          </View>
          <Divider />
        </>
      }
    >
      <Section>
        <Grid>
          <Grid.Column>
            <List background="default">
              <List.Item
                icon="calendar"
                title="title"
                description1="description1"
                description2="description2"
                attention={{
                  text: "attention (attentionPurpose: success)",
                  variant: "success",
                }}
                detail="detail (notification 1)"
                notification={1}
              />
              <List.Item
                icon="prepaid"
                title="title (variant: price)"
                attention={{
                  text: "attention (attentionPurpose: information)",
                  variant: "information",
                }}
                onPress={() => {}}
                action={
                  <Price
                    beforeText="default"
                    fromValue="€ 100,59"
                    showAsterisk
                    showCurrency
                    showDecimal
                    showFrequency
                    showVAT
                    size="default"
                    state="default"
                    value="€ 100,59"
                  />
                }
              />
              <List.Item
                title="title"
                description1="description1"
                description2="description2"
                attention={{
                  text: "attention (attentionPurpose: error)",
                  variant: "error",
                }}
                action={<Button onPress={() => {}}>Button</Button>}
              />
              <List.Item
                title="title"
                description1="description1"
                description2="description2"
                attention={{
                  text: "attention (attentionPurpose: warning)",
                  variant: "warning",
                }}
                action={<Toggle ariaLabel="toggle" onPress={() => {}} />}
              />
              <List.Item
                title="title (variant: default)"
                detail="detail"
                onPress={() => {}}
              />
              <List.Item title="title" />
            </List>
          </Grid.Column>
        </Grid>
      </Section>
      <StickyBar
        position={position}
        width="default"
        layout="default"
        button={{
          text: "Checkout",
          onPress: () => console.log("Checkout button pressed!"),
        }}
        modal={{
          title: "Cart title",
          children: (
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
        }}
      >
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
      </StickyBar>
    </Main>
  );
};

export const StickyBarTopScreen = () => Layout("top");

export const StickyBarBottomScreen = () => Layout("bottom");
