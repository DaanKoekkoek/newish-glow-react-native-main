import { render } from "@testing-library/react";
import { Divider } from "./Divider";

describe("<Divider />", () => {
  it.each`
    variant      | inverted
    ${"default"} | ${false}
    ${"default"} | ${true}
    ${"strong"}  | ${false}
    ${"strong"}  | ${true}
  `(
    "snapshot with variant $variant and inverted $inverted",
    ({ variant, inverted }) => {
      const { asFragment } = render(
        <Divider variant={variant} inverted={inverted} />,
      );
      expect(asFragment()).toMatchSnapshot();
    },
  );

  it("snapshot with subtle prominence", () => {
    const { asFragment } = render(<Divider prominence="subtle" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
