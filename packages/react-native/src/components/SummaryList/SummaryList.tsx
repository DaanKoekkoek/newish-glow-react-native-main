import { UL, LI } from "@expo/html-elements";
import { Attention } from "_internals/index";
import { Addon, Heading, Image, Paragraph } from "foundations/index";
import React, { createContext, useContext, useMemo } from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { summaryListStyles } from "./SummaryList.styles";
import type {
  SummaryListItemProps,
  SummaryListProps,
  SummaryListContextProps,
} from "./SummaryList.types";
import { ActionButtonIcon } from "../ActionButton";
import type { ActionButtonIconProps } from "../ActionButton";
import { Button } from "../Button";
import type { ButtonProps, ButtonIconProps } from "../Button";
import { BaseButtonIcon } from "../Button/BaseButton";
import type { DefaultListItemProps, DefaultListProps } from "../DefaultList";
import { DefaultList } from "../DefaultList";
import { Divider } from "../Divider";
import type { NumberInputProps } from "../NumberInput";
import { NumberInput } from "../NumberInput";
import type { PriceProps } from "../Price";
import { Price } from "../Price";
import { Status } from "../Status";

const SummaryListContext = createContext<SummaryListContextProps>({
  stateContext: "default",
});

export const useSummaryListContext = () => useContext(SummaryListContext);

const SummaryList = ({
  children,
  state = "default",
}: SummaryListProps): JSX.Element => {
  const { styles } = useStyles(summaryListStyles);

  return (
    <SummaryListContext.Provider value={{ stateContext: state }}>
      <UL testID="summary-list" style={styles.list}>
        {React.Children.toArray(children).map((child, index) => (
          <LI
            style={styles.listItem}
            key={`summary-list-item-${index}`}
            testID={`summary-list-item-${index}`}
          >
            <View>
              {child}
              {index < React.Children.count(children) - 1 && (
                <Divider prominence="subtle" />
              )}
            </View>
          </LI>
        ))}
      </UL>
    </SummaryListContext.Provider>
  );
};

const Item = ({
  heading,
  subheading,
  image,
  state = "default",
  status,
  price,
  actions,
  list,
  promotionText,
  children,
}: SummaryListItemProps) => {
  const { stateContext } = useSummaryListContext();

  const itemState = useMemo(() => {
    return state !== "default" ? state : stateContext;
  }, [state, stateContext]);

  const { styles } = useStyles(summaryListStyles, {
    state: itemState === "default" ? undefined : itemState,
  });

  const actionButtons = React.Children.toArray(actions).filter(
    (child) =>
      React.isValidElement(child) && child.type === SummaryList.ActionButton,
  );

  const otherActions = React.Children.toArray(actions).filter(
    (child) =>
      React.isValidElement(child) && child.type !== SummaryList.ActionButton,
  );

  return (
    <SummaryListContext.Provider value={{ stateContext: itemState }}>
      <View>
        <View style={styles.item}>
          {!!image &&
            (image.name ? (
              <Addon name={image.name} size="sm" state={itemState} />
            ) : (
              (!!image.src || !!image.localSrc) && (
                <Image
                  type="foreground"
                  src={image?.src}
                  localSrc={image?.localSrc}
                  alt={image?.alt}
                  resizeMode="contain"
                  imageStyle={styles.image}
                />
              )
            ))}
          <View style={styles.content}>
            <View style={styles.topContent}>
              <View style={styles.headingContent}>
                {subheading && (
                  <Paragraph size="sm" style={styles.subheading}>
                    {subheading}
                  </Paragraph>
                )}
                <Heading size="sm" as="h3" style={styles.heading}>
                  {heading}
                </Heading>
              </View>
              {status && itemState !== "inactive" && (
                <Status type={status.type} statusText={status.statusText} />
              )}
              {promotionText && itemState !== "inactive" && (
                <Attention text={promotionText} size="sm" />
              )}
              {list && (
                <DefaultList
                  {...list.props}
                  size="sm"
                  inactive={itemState === "inactive"}
                />
              )}
            </View>
            {(actionButtons.length > 0 || otherActions.length > 0 || price) && (
              <View style={styles.footerContent}>
                {/* {itemState !== "inactive" && ( */}
                <View style={styles.actions} testID="summary-list-actions">
                  {otherActions.length > 0 && otherActions}
                  {actionButtons.length > 0 && (
                    <View style={styles.actionButtons}>{actionButtons}</View>
                  )}
                </View>
                {/* )} */}
                {price && (
                  <Price
                    {...price.props}
                    style={styles.price}
                    state={itemState === "inactive" ? "disabled" : "default"}
                    size="sm"
                    showDecimal
                  />
                )}
              </View>
            )}
          </View>
        </View>
        <View style={styles.additionalContent}>
          {React.isValidElement(children) ? (
            children
          ) : (
            <Paragraph style={styles.additionalContentText}>
              {children}
            </Paragraph>
          )}
        </View>
      </View>
    </SummaryListContext.Provider>
  );
};

SummaryList.Item = Item;
Item.displayName = "SummaryList.Item";

const SummaryDefaultList = (_props: DefaultListProps) => null;
SummaryDefaultList.displayName = "SummaryList.List";
SummaryList.List = SummaryDefaultList;

const SummaryDefaultListItem = (_props: DefaultListItemProps) => null;
SummaryDefaultListItem.displayName = "SummaryList.List.Item";
SummaryDefaultList.Item = SummaryDefaultListItem;

const SummaryPrice = (_props: PriceProps) => null;
SummaryPrice.displayName = "SummaryList.Price";
SummaryList.Price = SummaryPrice;

const SummaryButton = (props: ButtonProps) => (
  <Button {...props} size="sm" prominence="secondary" />
);
SummaryButton.displayName = "SummaryList.Button";

const SummaryButtonIcon = (props: ButtonIconProps) => (
  <BaseButtonIcon {...props} />
);
SummaryButtonIcon.displayName = "SummaryList.Button.Icon";
SummaryButton.Icon = SummaryButtonIcon;

SummaryList.Button = SummaryButton;

const SummaryNumberInput = (props: NumberInputProps) => (
  <NumberInput {...props} size="sm" />
);
SummaryNumberInput.displayName = "SummaryList.NumberInput";
SummaryList.NumberInput = SummaryNumberInput;

const SummaryActionButton = (props: ActionButtonIconProps) => (
  <ActionButtonIcon {...props} size="sm" prominence="default" inverted />
);
SummaryActionButton.displayName = "SummaryList.ActionButton";
SummaryList.ActionButton = SummaryActionButton;

export { SummaryList };
