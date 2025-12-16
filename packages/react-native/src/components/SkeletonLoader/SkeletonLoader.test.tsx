import { render } from "_test-utils";

import { SkeletonLoader } from "./SkeletonLoader";

test("renders most default skeleton loader", () => {
  const { toJSON } = render(<SkeletonLoader />);

  expect(toJSON()).toMatchSnapshot();
});
