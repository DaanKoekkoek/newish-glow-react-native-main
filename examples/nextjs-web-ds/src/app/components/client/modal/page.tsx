"use client";

import { Button } from "@odido-portals/glow-react-web/button";
import { Modal } from "@odido-portals/glow-react-web/modal";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";

import BaseLayout from "../../../BaseLayout";

export default function ModalPage() {
  return (
    <BaseLayout title="Modal">
      <Modal title="Title" trigger={<Button>Open modal</Button>}>
        <Paragraph>Content of modal</Paragraph>
      </Modal>
    </BaseLayout>
  );
}
