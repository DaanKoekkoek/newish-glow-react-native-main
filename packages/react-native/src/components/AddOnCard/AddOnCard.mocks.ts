import type { AddOnCardProps } from "./AddOnCard.types";

export const AddOnCardPropsMock: AddOnCardProps = {
  id: "1",
  onPress: () => {},
  title: "Title",
  description: "Description",
  promotion: "Promotion",
  button: { selected: { text: "Wijzig" }, unselected: { text: "Voeg toe" } },
  highlight: "Highlight",
  applyHighlightOffset: false,
  addon: "Netflix",
  direction: "horizontal",
  selected: false,
  state: "default",
  price: {
    showFrequency: true,
    beforeText: "vanaf",
    value: "10,00",
  },
};

export const createAddOnCardPropMocks = (numberOfMocks: number) =>
  Array.from({ length: numberOfMocks }, (_, index) => ({
    ...AddOnCardPropsMock,
    id: index.toString(),
  }));
