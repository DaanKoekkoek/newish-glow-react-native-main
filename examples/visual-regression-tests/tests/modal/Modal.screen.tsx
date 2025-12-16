import {
  Main,
  Section,
  Grid,
  Modal,
  Paragraph,
  Image,
  Button,
} from "@odido-portals/glow-react-native";
import React from "react";
import type { ImageSourcePropType } from "react-native";

import qr_code from "../../assets/QR_code.png";

const IMAGES: {
  "qr-code": ImageSourcePropType;
} = {
  "qr-code": qr_code,
} as const;

export function ModalDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open default modal</Button>}
              title="Modal header"
              buttonLabel="Submit"
              visible
              position="default"
              footerChildren={<Paragraph>Content</Paragraph>}
              dismissButtonLabel="Sluiten"
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalSubtleFooterScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open subtle footer modal</Button>}
              title="Modal header"
              footer="subtle"
              visible
              position="default"
              dismissButtonLabel="Sluiten"
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalNoFooterScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open no footer modal</Button>}
              title="Modal header"
              footer="none"
              visible
              position="default"
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalImageScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              title="Modal header"
              trigger={<Button>Open modal with image</Button>}
              image={{
                src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
                alt: "alt",
              }}
              visible
              position="default"
              dismissButtonLabel="Sluiten"
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalRightScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open right modal</Button>}
              title="Modal header (positioned right)"
              visible
              position="right"
              dismissButtonLabel="Sluiten"
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalBottomScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open bottom modal</Button>}
              title="Modal header (bottom positioned)"
              visible
              position="bottom"
              dismissButtonLabel="Sluiten"
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalWithCustomHeadingScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open modal with custom heading</Button>}
              title="Modal header (custom heading)"
              headerRatio="3/1"
              dismissButtonLabel="Sluiten"
              customHeader={
                <Modal.CustomHeader
                  verticalPadding
                  glow="Glow1"
                  variant="emphasised"
                  ratio="1/1"
                >
                  <Image localSrc={IMAGES["qr-code"]} alt="alternate text" />
                </Modal.CustomHeader>
              }
              visible
            >
              <ModalContent />
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ModalWrapContentScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Modal
              trigger={<Button>Open modal wrap content</Button>}
              title="Modal header"
              buttonLabel="Submit"
              visible
              position="default"
              wrapToContent
              footer="none"
              dismissButtonLabel="Sluiten"
            >
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                elementum varius neque, volutpat hendrerit risus.
              </Paragraph>
            </Modal>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

const ModalContent = () => (
  <Paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam elementum
    varius neque, volutpat hendrerit risus. Curabitur sollicitudin sapien vitae
    tortor sollicitudin venenatis. Vestibulum lobortis quam risus, ut laoreet
    augue gravida nec. Integer augue nulla, finibus ut velit non, fermentum
    viverra dolor. Aenean scelerisque maximus orci id euismod. Vestibulum
    pretium condimentum venenatis. Praesent gravida dolor in viverra maximus. Ut
    aliquam, mauris et rhoncus tincidunt, nibh mi aliquet arcu, non bibendum
    felis dui vitae sapien. Pellentesque vitae ligula eget mauris ornare
    dignissim. Pellentesque habitant morbi tristique senectus et netus et
    malesuada fames ac turpis egestas. Sed ante risus, tincidunt a auctor non,
    dignissim nec nibh. Etiam dignissim est a lacus semper, quis luctus lectus
    congue. Praesent suscipit nisl eget scelerisque suscipit. In feugiat semper
    sollicitudin. Pellentesque eget ipsum et dolor volutpat placerat. Aenean nec
    vestibulum nunc, in facilisis ex.
  </Paragraph>
);
