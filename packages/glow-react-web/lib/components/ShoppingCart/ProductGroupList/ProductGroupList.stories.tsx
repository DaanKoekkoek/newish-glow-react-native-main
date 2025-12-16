import type { Meta } from "@storybook/react";

import { ProductGroupList, ProductGroup } from "./ProductGroupList";
import { CartProduct } from "../CartProduct/CartProduct";

const meta: Meta<typeof ProductGroupList> = {
  title: "DesignSystem/Components/ShoppingCart/ProductGroupList",
  component: ProductGroupList,
  args: {
    productGroups: [
      <ProductGroup
        title="Product group title"
        products={[
          <CartProduct
            title="Product title"
            description={["Description"]}
            image={{
              src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
              alt: "alt",
            }}
          />,
          <CartProduct
            title="Product title"
            description={["Description"]}
            image={{
              src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
              alt: "alt",
            }}
          />,
        ]}
      />,
      <ProductGroup
        title="Product group title"
        products={[
          <CartProduct
            title="Product title"
            description={["Description"]}
            image={{
              src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
              alt: "alt",
            }}
          />,
          <CartProduct
            title="Product title"
            description={["Description"]}
            image={{
              src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
              alt: "alt",
            }}
          />,
        ]}
      />,
    ],
  },

  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return <ProductGroupList {...args} />;
  },
};
