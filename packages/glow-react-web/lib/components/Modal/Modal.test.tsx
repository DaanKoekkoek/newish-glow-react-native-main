import { composeStory } from "@storybook/react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { Modal } from "./Modal";
import meta, {
  Basic,
  Right,
  Bottom,
  WithoutFooter,
  OpenOrCloseWithoutTrigger,
} from "./Modal.stories";
import styles from "./Modal.module.scss";
import { Button } from "../Button";
import { ModalCustomHeader } from "components/Modal/ModalCustomHeader.tsx";
import { Placeholder } from "components/Modal/Placeholder.tsx";
import IMAGES from "foundations/Image/Image.mock.ts";
import { Image } from "foundations/Image/Image.tsx";

jest.mock("react-dom", () => ({
  ...jest.requireActual<typeof import("react-dom")>("react-dom"),
  createPortal: (node: unknown) => node,
}));

const ModalBasic = composeStory(Basic, meta);
const ModalRight = composeStory(Right, meta);
const ModalBottom = composeStory(Bottom, meta);
const ModalWithoutFooter = composeStory(WithoutFooter, meta);
const ModalWithoutTrigger = composeStory(OpenOrCloseWithoutTrigger, meta);

describe("<Modal />", () => {
  describe.each([
    ["Basic", ModalBasic],
    ["Right", ModalRight],
    ["Bottom", ModalBottom],
    ["WithoutFooter", ModalWithoutFooter],
  ])("%s Modal", (_, Story) => {
    test("renders a stable snapshot", async () => {
      const { asFragment } = render(<Story {...Story.args} />);
      expect(asFragment()).toMatchSnapshot();
      fireEvent.click(await screen.findByTestId("button"));
      expect(await screen.findByTestId("dialog")).toBeDefined();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("opens the modal when trigger is pressed", async () => {
    render(<ModalBasic {...Basic.args} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();
  });

  it("closes the modal when the backdrop is pressed", async () => {
    render(<ModalBasic {...Basic.args} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.click(await screen.findByTestId("dialog"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("contains a custom header when customHeader is set", async () => {
    render(
      <Modal
        title="Custom header modal"
        trigger={<Button>Custom header modal</Button>}
        customHeader={<ModalCustomHeader children={<>Custom content</>} />}
      />,
    );

    fireEvent.click(await screen.findByTestId("button"));

    expect(screen.getByTestId("modal-custom-header")).toBeDefined();
  });

  it("applies gradient to emphasised variant of customHeader", async () => {
    render(
      <Modal
        title="Custom header modal"
        trigger={<Button>Custom header modal</Button>}
        customHeader={
          <ModalCustomHeader
            children={
              <>
                Custom content
                <Placeholder />
              </>
            }
            variant={"emphasised"}
          />
        }
      />,
    );

    fireEvent.click(await screen.findByTestId("button"));

    expect(screen.getByTestId("modal-custom-header")).toBeDefined();
    expect(screen.getByTestId("glow-gradient")).toBeDefined();
  });

  it("applies gradient to emphasised variant of customHeader", async () => {
    const { asFragment } = render(
      <Modal
        title="Custom header modal"
        trigger={<Button>Custom header modal</Button>}
        customHeader={
          <ModalCustomHeader
            children={
              <Image
                resizeMode="contain"
                src="https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp"
                localSrc={IMAGES["tophero-app-only-deal"]}
                alt="alt text"
              />
            }
          />
        }
      />,
    );

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    expect(screen.getByTestId("modal-custom-header")).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("run onOpen callback when opens", async () => {
    const onOpen = jest.fn();

    render(<ModalBasic {...Basic.args} onOpen={onOpen} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();
    expect(onOpen).toHaveBeenCalled();
  });

  it("run onClose callback when closed", async () => {
    const onClose = jest.fn();

    render(<ModalBasic {...Basic.args} onClose={onClose} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.click(await screen.findByTestId("modal-close-icon"));

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("ignore click by backdrop if dialog is not closable", async () => {
    const onClose = jest.fn();
    render(<ModalBasic {...Basic.args} onClose={onClose} closable={false} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.click(await screen.findByTestId("dialog"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    expect(onClose).not.toHaveBeenCalled();
  });

  it("close modal when close icon is pressed", async () => {
    render(<ModalBasic {...Basic.args} dismissButtonLabel={"Close Me"} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.click(await screen.findByTestId("modal-close-icon"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("does not render close icon when hideCloseIconButton is true", async () => {
    render(<ModalBasic {...Basic.args} hideCloseIconButton={true} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    expect(screen.queryByTestId("modal-close-icon")).not.toBeInTheDocument();
  });

  it("close modal when close button is pressed", async () => {
    render(<ModalBasic {...Basic.args} dismissButtonLabel={"Close Me"} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.click(await screen.findByTestId("modal-close"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("close modal when Esc is pressed", async () => {
    render(<ModalBasic {...Basic.args} />);

    fireEvent.click(await screen.findByTestId("button"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.keyDown(screen.getByTestId("dialog"), {
      key: "Escape",
      code: "Escape",
    });

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("manipulate by modal via ref", async () => {
    render(
      <ModalWithoutTrigger
        {...OpenOrCloseWithoutTrigger.args}
        onOpen={() => {}}
        onClose={() => {}}
      />,
    );

    fireEvent.click(await screen.findByText("Open modal"));

    expect(await screen.findByTestId("dialog")).toBeDefined();

    fireEvent.click(await screen.findByText("Close modal"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("opens the modal properly when opened via visible", async () => {
    render(<Modal title="Open modal via visible" visible={true} />);

    expect(await screen.findByTestId("dialog")).toBeDefined();

    const dialog = await screen.findByTestId("dialog");

    /* open classes should now be present */
    expect(dialog.classList).toContain(styles.open);
    expect(dialog.classList).toContain(styles["backdrop-opened"]);
  });
});
