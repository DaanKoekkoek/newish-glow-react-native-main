import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryList, SummaryListItem, SummaryListAction } from "./SummaryList";

describe("SummaryList Component", () => {
  it("renders a stable snapshot", async () => {
    const { asFragment } = render(
      <SummaryList>
        <SummaryListItem
          heading="Item 1"
          image={{ src: "image1.jpg", alt: "Item 1 image alt" }}
        />
      </SummaryList>,
    );
    await screen.findByTestId("image");
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders SummaryList with items", () => {
    render(
      <SummaryList>
        <SummaryListItem
          heading="Item 1"
          image={{ src: "image1.jpg", alt: "Item 1 image alt" }}
        />
        <SummaryListItem
          heading="Item 2"
          image={{ src: "image2.jpg", alt: "Item 2 image alt" }}
        />
      </SummaryList>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Item 1 image alt")).toBeInTheDocument();
    expect(screen.getByLabelText("Item 2 image alt")).toBeInTheDocument();
  });

  test("applies inactive state from context", () => {
    render(
      <SummaryList state="inactive">
        <SummaryListItem
          heading="Inactive Item"
          image={{ src: "inactive.jpg", alt: "Inactive Item" }}
        />
      </SummaryList>,
    );

    const item = screen.getByTestId("summary-list-content");
    expect(item).toHaveClass("is-inactive");
  });

  test("renders SummaryListItem with status", () => {
    render(
      <SummaryList>
        <SummaryListItem
          heading="Item with Status"
          status={{ type: "success", statusText: "Status" }}
          image={{ src: "status.jpg", alt: "Status Item" }}
        />
      </SummaryList>,
    );

    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});

describe("SummaryListAction Component", () => {
  test("renders ActionButtonIcon when icon is provided", () => {
    render(<SummaryListAction icon="plus" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders Button when children are provided", () => {
    render(<SummaryListAction icon="edit">Edit</SummaryListAction>);
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  test("triggers onClick when button is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<SummaryListAction icon="trashcan" onClick={handleClick} />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("triggers onChange when number number input is clicked", async () => {
    const handleChange = jest.fn();

    const Controlled = () => {
      const [value, setValue] = useState(1);

      return (
        <SummaryListAction
          numberInput={{
            value,
            onChange: (newValue) => {
              handleChange(newValue);
              setValue(newValue);
            },
          }}
        />
      );
    };

    render(<Controlled />);

    const buttons = screen.getAllByTestId("number-input-button");
    await userEvent.click(buttons[1]);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
