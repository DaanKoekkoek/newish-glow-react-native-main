import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import meta, { Default } from "./LargeSticker.stories";
import { LargeStickerProps } from "./LargeSticker.types";
import { LargeSticker } from "./LargeSticker";
import { DefaultList } from "components/DefaultList";

const Story = composeStory<LargeStickerProps>(Default, meta);

describe("<LargeSticker />", () => {
  it("renders stable snapshot", () => {
    const { asFragment } = render(<Story {...Story.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with list component", () => {
    const { asFragment } = render(
      <LargeSticker
        type="usp"
        palette="green"
        list={
          <DefaultList
            inverted
            items={[
              {
                icon: "checkmark",
                text: "List item 1",
              },
              {
                icon: "checkmark",
                text: "List item 2",
              },
              {
                icon: "checkmark",
                text: "List item 3",
              },
            ]}
            size="default"
            variant="icon"
          />
        }
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with price component", () => {
    const { asFragment } = render(<Story {...Story.args} type="default" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with price component in emphasised variant", () => {
    const { asFragment } = render(
      <Story {...Story.args} variant="emphasised" type="default" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with description", () => {
    const { asFragment } = render(
      <Story
        {...Story.args}
        type="default"
        description="Describe your promotion"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
