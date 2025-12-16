import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders a stable snapshot", () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});
