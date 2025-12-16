import { composeStory } from "@storybook/react";
import { render, waitFor } from "_test-utils";
import React from "react";

import meta, {
  Basic,
  WithBeforeValue,
  WithFrequency,
  WithFrequencyAsterix,
  WithoutCurrency,
  WithVAT,
} from "./Price.stories";

const Price = composeStory(Basic, meta);
const PriceWithVAT = composeStory(WithVAT, meta);
const PriceWithFrequency = composeStory(WithFrequency, meta);
const PriceWithFrequencyAsterix = composeStory(WithFrequencyAsterix, meta);
const PriceWithBeforeValue = composeStory(WithBeforeValue, meta);
const PriceWithoutCurrency = composeStory(WithoutCurrency, meta);

describe("<Price />", () => {
  it("a stable snapshot", () => {
    const { toJSON } = render(<Price {...Price.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays properly with only value prop provided", async () => {
    const { getByTestId, toJSON } = render(<Price value="€5,99" />);

    await waitFor(() => {
      const wholePrice = getByTestId("whole_display", { hidden: true });
      expect(wholePrice.props.children).toBe("5");
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("sets inverted text color when inverted prop is provided", async () => {
    const { toJSON, getByTestId } = render(<Price {...Price.args} inverted />);

    await waitFor(() => {
      const priceStyle = getByTestId("currency_display", { hidden: true }).props
        .style;
      const hasWhiteText = priceStyle.color === "#ffffff";
      expect(hasWhiteText).toBe(true);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("displays VAT", async () => {
    const { toJSON, getByTestId } = render(
      <PriceWithVAT {...PriceWithVAT.args} />,
    );

    await waitFor(() => {
      const priceVAT = getByTestId("after_paragraph", { hidden: true });
      expect(priceVAT).not.toBe(null);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("displays before value", async () => {
    const { toJSON, getByTestId } = render(
      <PriceWithBeforeValue {...PriceWithBeforeValue.args} />,
    );

    await waitFor(() => {
      const priceBefore = getByTestId("before_paragraph", { hidden: true });
      expect(priceBefore).not.toBe(null);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("displays frequency", async () => {
    const { toJSON, getByTestId } = render(
      <PriceWithFrequency {...PriceWithFrequency.args} />,
    );

    await waitFor(() => {
      const priceFrequency = getByTestId("frequency_display", { hidden: true });
      expect(priceFrequency).not.toBe(null);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("displays frequency with asterix", async () => {
    const { toJSON, getByText } = render(
      <PriceWithFrequencyAsterix {...PriceWithFrequencyAsterix.args} />,
    );

    await waitFor(() => {
      const priceFrequencyAsterix = getByText("\uE701", { hidden: true });
      expect(priceFrequencyAsterix).not.toBe(null);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("displays currency despite value not containing currency", async () => {
    const { toJSON, getByText } = render(
      <PriceWithoutCurrency {...PriceWithoutCurrency.args} />,
    );

    await waitFor(() => {
      const currencySymbol = getByText("€", { hidden: true });
      expect(currencySymbol).not.toBe(null);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("displays negative value", async () => {
    const { getByText, toJSON } = render(<Price value="-€5,99" />);

    await waitFor(() => {
      const negativePrice = getByText("-€ 5,99", { hidden: true });
      expect(negativePrice).not.toBe(null);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
