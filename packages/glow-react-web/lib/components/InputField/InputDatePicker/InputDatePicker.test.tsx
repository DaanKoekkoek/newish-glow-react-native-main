import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { InputFieldDatePicker } from "./InputFieldDatePicker";

jest.mock("react-datepicker", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dayjs = require("dayjs");

  return {
    __esModule: true,
    default: ({
      selected,
      onChange,
      ...props
    }: {
      selected: string | null;
      onChange: (date: string) => void;
      [key: string]: unknown;
    }) => (
      <input
        {...props}
        data-testid="datepicker-input"
        value={selected ? dayjs(selected).format("DD-MM-YYYY") : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(dayjs(e.target.value, "DD-MM-YYYY").toDate())
        }
      />
    ),
    registerLocale: jest.fn(),
  };
});

describe("<InputFieldDatePicker />", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("calls onChange after date change", async () => {
    const initialDate = "10-29-2025";
    render(
      <InputFieldDatePicker
        id="datepicker"
        value={initialDate}
        format="dd-MM-YYYY"
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByTestId("datepicker-input") as HTMLInputElement;
    await userEvent.clear(input);
    await userEvent.type(input, "30-10-2025");

    expect(mockOnChange).toHaveBeenCalled();
  });
});
