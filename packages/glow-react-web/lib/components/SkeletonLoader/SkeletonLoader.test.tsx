import { render } from "@testing-library/react";
import { SkeletonLoader } from "./SkeletonLoader";

describe("<SkeletonLoader />", () => {
  it.each([
    ["default", undefined],
    ["small", "sm"],
    ["large", "lg"],
  ])("renders %s skeleton loader", (_label, size) => {
    const { asFragment } = render(
      <SkeletonLoader size={size as "sm" | "default" | "lg"} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
