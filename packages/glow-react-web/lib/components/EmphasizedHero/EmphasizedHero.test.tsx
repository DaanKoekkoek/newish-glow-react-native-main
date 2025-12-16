import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./EmphasizedHero.stories";
import { Counter } from "..";

const EmphasizedHeroStory = composeStory(Default, meta);

describe("<EmphasizedHero />", () => {
  let fixedDate;
  let targetDate: Date;
  let hoursDate: Date;

  beforeEach(() => {
    jest.useFakeTimers();

    fixedDate = new Date();
    fixedDate.setUTCDate(fixedDate.getDate() + 1);
    jest.setSystemTime(fixedDate);

    targetDate = new Date(fixedDate);
    targetDate.setUTCDate(targetDate.getDate() + 3);
    hoursDate = new Date(fixedDate);
    hoursDate.setUTCDate(hoursDate.getDate() + 1);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should not have any accessibility violations", async () => {
    jest.useRealTimers();

    const { container } = render(
      <EmphasizedHeroStory {...EmphasizedHeroStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <EmphasizedHeroStory
        {...EmphasizedHeroStory.args}
        countdown={
          <Counter
            targetDate={targetDate.toISOString()}
            size={{ mobileSmall: "default", tablet: "lg" }}
          />
        }
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with a title and subtitle", () => {
    render(
      <EmphasizedHeroStory
        {...Default.args}
        heading={{
          title: "Test Title",
          subTitle: "Test Subtitle",
        }}
      />,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("does not render if heading is missing", () => {
    render(<EmphasizedHeroStory {...Default.args} heading={undefined} />);
    const container = screen.queryByTestId("emphasized-hero");
    expect(container).not.toBeInTheDocument();
  });

  it("renders footnote inside a paragraph when children is not a React element", () => {
    render(
      <EmphasizedHeroStory {...Default.args} footnote="Note here">
        Some text
      </EmphasizedHeroStory>,
    );
    expect(screen.getByText("Note here")).toBeInTheDocument();
  });

  it("renders children inside a paragraph when not an element", () => {
    render(
      <EmphasizedHeroStory {...Default.args}>Child Text</EmphasizedHeroStory>,
    );
    expect(screen.getByText("Child Text")).toBeInTheDocument();
  });
});
