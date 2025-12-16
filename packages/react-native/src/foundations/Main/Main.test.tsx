import { composeStory } from "@storybook/react";
import { render, waitFor } from "_test-utils";
import { Grid, Section } from "foundations/index";
import React from "react";

import meta, { Basic } from "./Main.stories";

const Main = composeStory(Basic, meta);

describe("<Main/>", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Main {...Main.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders multiple children correctly", async () => {
    const { toJSON } = render(
      <Main>
        <Section>
          <Grid>
            <Grid.Column>Column section 1</Grid.Column>
          </Grid>
        </Section>
        <Section>
          <Grid>
            <Grid.Column>Column section 2</Grid.Column>
          </Grid>
        </Section>
        <Section>
          <Grid>
            <Grid.Column>Column section 3</Grid.Column>
          </Grid>
        </Section>
      </Main>,
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("contains the snackbar when the 'hasSnackbar' prop is true", () => {
    const { queryByTestId, getByTestId, rerender } = render(<Main />);

    expect(queryByTestId("snackbar")).toBeNull();

    rerender(<Main hasSnackbar />);

    expect(getByTestId("snackbar")).toBeTruthy();
  });
});
