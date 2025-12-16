import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Paragraph } from "foundations/Paragraph";
import { useRef } from "react";
import type { ModalEvent, ModalHandle } from "components/Modal/Modal.types.ts";
import { TextLink } from "components/TextLink";
import IMAGES from "foundations/Image/Image.mock.ts";
import { ratios } from "foundations/Image/Image.constants.ts";
import { Selector } from "components/Selector";
import { Stack } from "foundations/Stack";

const meta: Meta<typeof Modal> = {
  title: "DesignSystem/Components/Overlay/Modal",
  component: Modal,
  args: {
    backdrop: "default",
    position: "default",
    closable: true,
    visible: false,
    trigger: <Button>Modal button</Button>,
    title: "Modal header text",
    buttonLabel: "Submit",
    dismissButtonLabel: "Close",
    children: (
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pellentesque eros orci, nec mollis odio congue ac. Integer consequat
        magna et justo sodales, sit amet imperdiet erat varius. Suspendisse at
        magna pretium, sagittis justo nec, ultrices ipsum. Ut ultricies eu lorem
        vitae hendrerit. Nulla lobortis odio augue, ac varius turpis maximus ac.
        Integer sed nibh in leo vulputate sagittis. Class aptent taciti sociosqu
        ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam
        mi dolor, maximus sed ex a, lobortis accumsan neque. Donec hendrerit at
        nulla vitae vulputate. Aliquam rutrum metus sed aliquet scelerisque.
        Vivamus accumsan porta quam, posuere venenatis mauris sagittis at. Donec
        gravida turpis nec aliquet vehicula. Donec quis fermentum est, id mollis
        turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Duis ipsum ante, vulputate ac ex vel, tincidunt hendrerit dui. In
        interdum iaculis enim in rhoncus. Proin venenatis nec tellus vitae
        eleifend. Aenean maximus posuere sapien, a commodo nisi congue ut. Donec
        faucibus dui a sapien convallis, id sollicitudin ante tincidunt. Nulla
        ultrices mauris sit amet lacus convallis iaculis. Sed nec volutpat
        purus. Aenean at arcu id velit suscipit laoreet. Phasellus elementum
        aliquam purus laoreet vehicula. Pellentesque blandit, risus nec
        venenatis dignissim, sem felis convallis enim, vel tempus lectus ligula
        ac erat. Proin cursus maximus velit in congue. Nunc in gravida eros.
        Etiam vitae cursus magna, id ullamcorper mi. Etiam maximus dui vel
        lectus tristique laoreet.
      </Paragraph>
    ),
    footerChildren: <Paragraph>displayed on top of buttons</Paragraph>,
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      localSrc: IMAGES["stock-photo"],
      alt: "alt",
    },
  },
  argTypes: {
    footer: {
      description:
        "Replaces the default gradient background of the footer with a fixed background, along with the `Divider` component at the top of the footer when set to `strong`. Hides the footer when set to `none`. Also changes the `ScrollView` behavior of a modal when the `position` is set to `default`.",
      control: {
        type: "select",
      },
      options: ["subtle", "strong", "none"],
    },
    width: {
      description: "Set the width of the modal",
      control: {
        type: "select",
      },
      options: ["default", "wide", "narrow"],
    },
    onClick: {
      type: "function",
      description:
        "Callback function that is triggered when the generated button from `buttonLabel` is pressed.",
    },
    onClose: {
      type: "function",
      description:
        "Callback function that is triggered when the modal is closed or the generated button from `dismissButtonLabel` is pressed.",
    },
    onOpen: {
      type: "function",
      description:
        "Callback function that is triggered when the modal is opened.",
    },
    visible: {
      description: "Opens the modal (on mount) when set to `true`.",
    },
    backdrop: {
      description: "Sets the color of the backdrop.",
      control: {
        type: "select",
      },
      options: ["default", "subtle"],
    },
    title: {
      description: "Heading shown inside the modal dialog.",
    },
    titleSize: {
      description: "Set the title font size.",
      control: {
        type: "select",
      },
      options: ["lg", "md"],
    },
    customHeader: {
      description:
        "Custom header to apply content within the header of the modal.",
    },
    headerRatio: {
      description: "Applies `aspect-ratio` to the header",
      control: {
        type: "select",
      },
      options: ratios,
    },
    image: {
      description: "Image shown inside the modal dialog.",
    },
    position: {
      description:
        "Changes the rendering position of the `Modal`. Can also be applied per breakpoint. `ModalPosition | ModalPositionPerBreakpoint`.",
      options: [
        "default",
        "bottom",
        "right",
        { mobileSmall: "bottom", laptop: "default" },
      ],
      control: { type: "select" },
    },
    closable: {
      description:
        "When set to true, modal can also be closable by firing an event via an imperative event handler. Can be closed by using a `ref.current` with `triggerModalOpen` or `triggerModalClose`.A close button will appear in the top-right corner, and users can also close the modal by clicking outside of it.",
    },
    trigger: {
      description:
        "The trigger to open the modal. Can be any React Element as long as it accepts the `onClick` property.",
      control: false,
    },
    buttonLabel: {
      description:
        "Generates an additional button within the dialog of the modal. Triggers the `onClick` callback.",
    },
    dismissButtonLabel: {
      description:
        "Generates a dismiss button within the dialog of the modal if `onClose` callback is defined as well. Triggers the `onClose` callback",
    },
    footerChildren: {
      description:
        "Additional content within the modal footer. Accepts a `React.ReactNode` and renders above the buttons.",
      type: "string",
    },
    children: {
      type: "string",
      description:
        "The content of the modal body. Accepts a `React.ReactNode`. Renders below the `header`.",
    },
    footerTopPadding: {
      description:
        "Sets the top padding for the modal footer. Use 'none' for tight spacing or 'default' for standard spacing.",
      control: {
        type: "select",
      },
      options: ["default", "none"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithoutFooter: Story = {
  args: {
    trigger: <Button>Without footer</Button>,
    footer: "none",
  },
};

export const Right: Story = {
  args: {
    trigger: <Button>Right Modal</Button>,
    position: "right",
  },
};

export const Bottom: Story = {
  args: {
    trigger: <Button>Bottom Modal</Button>,
    position: "bottom",
  },
};

export const OpenOrCloseWithoutTrigger: Story = {
  args: {
    trigger: <></>,
  },
  render: function Render(params) {
    const {
      onOpen = (e: ModalEvent) => console.log(e),
      onClose = (e: ModalEvent) => console.log(e),
    } = params;

    const modalRef = useRef<ModalHandle>(null);

    const openModal = (e: ModalEvent) => {
      modalRef.current?.triggerModalOpen(e);
    };

    const closeModal = (e: ModalEvent) => {
      modalRef.current?.triggerModalClose(e);
    };

    return (
      <>
        <TextLink onClick={openModal}>Open modal</TextLink>
        <Modal
          ref={modalRef}
          title="Opened without `trigger`"
          closable={false}
          footer="none"
          onOpen={onOpen}
          onClose={onClose}
        >
          <span>Unclosable modal, or is it?</span>
          <br />
          <Button onClick={closeModal}>Close modal</Button>
        </Modal>
      </>
    );
  },
};

export const WrapContent: Story = {
  args: {
    trigger: <Button>Open modal</Button>,
    wrapToContent: true,
    footer: "none",
    image: undefined,
    children: (
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pellentesque eros orci, nec mollis odio congue ac. Integer consequat
      </Paragraph>
    ),
  },
};

export const CustomFooterPadding: Story = {
  args: {
    trigger: <Button>Custom Footer Padding</Button>,
    title: "Modal with Custom Footer Padding",
    footerTopPadding: "none",
    customHeader: undefined,
    buttonLabel: undefined,
    dismissButtonLabel: "",
    footer: "subtle",
    footerChildren: (
      <Stack direction="row" gap={"sm"}>
        <Button fill prominence="secondary">
          Annuleren
        </Button>
        <Button fill>Opslaan</Button>
      </Stack>
    ),
    children: (
      <>
        <Paragraph>
          This modal demonstrates the configurable footer top padding feature.
          The footer padding is set to 'none', allowing content to flow closer
          to the footer buttons. This is useful when you want tighter spacing
          between content and actions.
        </Paragraph>
        <Stack alignItems={"stretch"}>
          <Selector id="1" title="Selector one" />
          <Selector id="2" title="Selector two" />
        </Stack>
      </>
    ),
  },
};

export const HideCloseIconButton: Story = {
  args: {
    trigger: <Button>Modal with hidden close icon</Button>,
    title: "Modal with hidden close icon",
    footerTopPadding: "none",
    customHeader: undefined,
    buttonLabel: undefined,
    dismissButtonLabel: "",
    hideCloseIconButton: true,
    footer: "subtle",
    footerChildren: (
      <Stack direction="row" gap={"sm"}>
        <Button fill prominence="secondary">
          Annuleren
        </Button>
        <Button fill>Opslaan</Button>
      </Stack>
    ),
    children: (
      <>
        <Paragraph>
          Modal with hidden close icon. The close icon in the top-right corner
          is hidden even though the modal is closable.
        </Paragraph>
      </>
    ),
  },
};
