import { Tooltip } from "components/Tooltip/Tooltip.js";
import { Icon } from "foundations/Icon";
import styles from "./CartButton.module.scss";
import { CartButtonProps } from "./CartButton.types.js";
import { useShoppingCart } from "../ShoppingCartContext";
import { tokenClassNames } from "_utility";

export const CartButton = ({
  tooltip,
  icon = { name: "status-info" },
  onClick,
  enableTooltip = true,
  as: Tag = "button",
}: CartButtonProps) => {
  const { active } = useShoppingCart();
  if (tooltip) {
    return (
      <Tooltip {...tooltip} active={enableTooltip ? true : active}>
        <div
          className={tokenClassNames(styles, "cart-button", {
            [styles.inactive]: !enableTooltip,
          })}
        >
          <Icon {...icon} className={styles.icon} size="sm" />
        </div>
      </Tooltip>
    );
  }

  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      onClick={Tag === "button" ? onClick : undefined}
      className={tokenClassNames(styles, "cart-button", {
        [styles.inactive]: enableTooltip,
      })}
      disabled={Tag === "button" ? (enableTooltip ? true : !active) : undefined}
    >
      <Icon {...icon} className={styles.icon} size="sm" />
    </Tag>
  );
};
