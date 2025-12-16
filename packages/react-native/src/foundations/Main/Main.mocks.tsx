import {
  type ModalHandle,
  type SnackbarPosition,
  Box,
  Button,
  Modal,
  snackbarHelper,
} from "components/index";
import React, { useEffect, useRef } from "react";
import type { GestureResponderEvent } from "react-native";

import { Paragraph } from "../Paragraph";
import { Grid, Section, Stack } from "../index";

export const MainChildrenMock = ({
  numberOfSections = 5,
}: {
  numberOfSections?: number;
}) => {
  return (
    <>
      {Array.from({ length: numberOfSections }, (_, i) => i + 1).map((i) => (
        <Section
          key={i}
          variant={i % 2 === 1 ? "subtle" : "default"}
          palette={i % 2 === 1 ? "default" : undefined}
        >
          <Grid>
            <Grid.Column>
              <Box prominence={i % 2 === 1 ? "outline" : "color"} size="sm">
                <Paragraph>Box within Column</Paragraph>
              </Box>
            </Grid.Column>
          </Grid>
        </Section>
      ))}
    </>
  );
};

export const MainChildrenWithModalAndSnackbarMock = ({
  position = "bottom",
}: {
  position?: SnackbarPosition;
}) => {
  const modalRef = useRef<ModalHandle>(null);

  const openModal = (e: GestureResponderEvent) => {
    modalRef.current?.triggerModalOpen(e);
  };

  useEffect(() => snackbarHelper.remove(), []);

  const addSnackToSnackbar = (isModal = false) => {
    snackbarHelper({
      position,
      type: "default",
      message: "Your message goes here..",
      icon: { name: "chat", solid: true },
      context: isModal ? "modal" : "default",
    });
  };

  return (
    <>
      <Section key={1} variant="default">
        <Grid>
          <Grid.Column>
            <Stack>
              <Button onPress={() => addSnackToSnackbar(false)}>
                + 1 snack
                <Button.Icon name="loading" />
              </Button>
              <Box prominence="color" size="sm">
                <Paragraph>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Saepe, sequi voluptatum harum ratione libero quisquam
                  dignissimos? Ut deleniti, enim animi eos rerum commodi dolorem
                  consectetur molestiae officiis rem neque blanditiis. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Quo autem
                  eligendi neque expedita aut esse. Perferendis, hic. Similique
                  illum aspernatur quo, voluptate inventore itaque dicta eaque
                  dolorum dolores aut quasi.
                </Paragraph>
              </Box>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>

      <Section key={2} variant="subtle" palette="default">
        <Grid>
          <Grid.Column>
            <Stack>
              <Button onPress={openModal}>
                Open modal
                <Button.Icon name="change-player-pop-in" />
              </Button>
              <Box prominence="outline" size="sm">
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  autem eligendi neque expedita aut esse. Perferendis, hic.
                  Similique illum aspernatur quo, voluptate inventore itaque
                  dicta eaque dolorum dolores aut quasi. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quo autem eligendi neque
                  expedita aut esse. Perferendis, hic. Similique illum
                  aspernatur quo, voluptate inventore itaque dicta eaque dolorum
                  dolores aut quasi.
                </Paragraph>
              </Box>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Modal
        ref={modalRef}
        buttonLabel="+1 snack"
        title="Modal header"
        hasSnackbar
        onPress={() => addSnackToSnackbar(true)}
        image={{
          src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
        }}
        children={
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur totam explicabo voluptatum, doloribus laudantium quaerat
            officiis?
          </Paragraph>
        }
      />
    </>
  );
};
