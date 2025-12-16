import React from "react";
import { CartDescriptionProps } from "./CartDescription.types";
import { LineItem } from "../LineItem";
import styles from "./CartDescription.module.scss";
import { Paragraph } from "foundations/Paragraph";
import { useShoppingCart } from "../ShoppingCartContext";
import { tokenClassNames } from "_utility";

export const CartDescription = ({ lines }: CartDescriptionProps) => {
  const { active } = useShoppingCart();

  return (
    <>
      {lines.slice(0, 3).map((line, index) => (
        <Paragraph
          as="div"
          size="sm"
          key={index}
          className={tokenClassNames(styles, "cart-description", {
            [styles["text-inactive"]]: !active,
          })}
        >
          {React.isValidElement(line) ? (
            <LineItem variant="short description" {...line.props} />
          ) : (
            line
          )}
        </Paragraph>
      ))}
    </>
  );
};
