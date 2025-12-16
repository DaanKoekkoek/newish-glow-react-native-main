import { render } from "@testing-library/react";
import { Marker } from "./Marker";
import { MarkerStatus } from "./Marker.types";

describe("Marker component", () => {
  it.each(["default", "active", "completed", "inactive"])(
    "renders %s marker and matches snapshot",
    (status) => {
      const { asFragment } = render(
        <Marker status={status as MarkerStatus} index={1} />,
      );
      expect(asFragment()).toMatchSnapshot();
    },
  );
});
