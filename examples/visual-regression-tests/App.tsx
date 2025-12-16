import { ThemeProvider } from "@odido-portals/glow-react-native";
import { Link, NavigationContainer } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AccordionScreen } from "tests/accordion/Accordion.screen";
import {
  ActionButtonDefaultScreen,
  ActionButtonGroupScreen,
  ActionButtonIconScreen,
} from "tests/actionButton/ActionButton.screen";
import {
  AddOnCardHorizontalScreen,
  AddOnCardVerticalScreen,
} from "tests/addOnCard/AddOnCard.screen";
import { AddOnListScreen } from "tests/addOnList/addOnList.screen";
import { AddonScreen } from "tests/addon/Addon.screen";
import { AFMScreen } from "tests/afm/AFM.screen";
import { AppIconScreen } from "tests/appIcon/AppIcon.screen";
import { AttentionTextScreen } from "tests/attentionText/AttentionText.screen";
import {
  BadgeDefaultScreen,
  BadgeStatusScreen,
} from "tests/badge/Badge.screen";
import { BoxDemoScreen } from "tests/box/Box.screen";
import { BundleCardScreen } from "tests/bundleCard/BundleCard.screen";
import {
  ButtonDefaultScreen,
  ButtonEmphasisedScreen,
  ButtonLoadingScreen,
  ButtonSecondaryScreen,
} from "tests/button/Button.screen";
import { CalloutScreen } from "tests/callout/Callout.screen";
import { CheckboxScreen } from "tests/checkbox/Checkbox.screen";
import { CheckboxGroupScreen } from "tests/checkboxGroup/CheckboxGroup.screen";
import {
  CounterDefaultScreen,
  CounterHoursScreen,
} from "tests/counter/Counter.screen";
import { DefaultCardScreen } from "tests/defaultCard/defaultCard.screen";
import { DefaultListDemoScreen } from "tests/defaultList/DefaultList.screen";
import { DefaultStickerScreen } from "tests/defaultSticker/DefaultSticker.screen";
import { DefinitionListDemoScreen } from "tests/definitionList/DefinitionList.screen";
import { DisplayDemoScreen } from "tests/display/Display.screen";
import { DividerScreen } from "tests/divider/Divider.screen";
import {
  DonutGraphDefaultScreen,
  DonutGraphLargeScreen,
} from "tests/donutGraph/DonutGraph.screen";
import {
  DottedGraphDefaultScreen,
  DottedGraphLargeScreen,
} from "tests/dottedGraph/DottedGraph.screen";
import {
  FeatureCardBackgroundScreen,
  FeatureCardImageScreen,
  FeatureCardOdidoPaletteScreen,
  FeatureCardTextScreen,
} from "tests/featureCard/featureCard.screen";
import { FooterScreen } from "tests/footer/Footer.screen";
import { GridColumnDemoScreen, GridDemoScreen } from "tests/grid/Grid.screen";
import { HeadingDemoScreen } from "tests/heading/Heading.screen";
import { SubscriptionHeroScreen } from "tests/hero/Hero.screen";
import { IdealScreen } from "tests/ideal/IDEAL.screen";
import { InputDatePickerScreen } from "tests/inputDatePicker/InputDatePicker.screen";
import { InputFieldScreen } from "tests/inputField/InputField.screen";
import {
  InputFieldAutoSuggestionsCategoryScreen,
  InputFieldAutoSuggestionsScreen,
} from "tests/inputField/InputFieldAutoSuggest.screen";
import { InputFieldSearchScreen } from "tests/inputField/InputFieldSearch.screen";
import { LargeStickerScreen } from "tests/largeSticker/LargeSticker.screen";
import { ListDemoScreen } from "tests/list/List.screen";
import { SpinnerScreen } from "tests/loadingIndicator/LoadingIndicator.screen";
import { LocalNavigationScreen } from "tests/localNavigation/LocalNavigation.screen";
import {
  LogosDefaultScreen,
  LogosInvertedScreen,
} from "tests/logos/Logos.screen";
import {
  ModalBottomScreen,
  ModalDefaultScreen,
  ModalImageScreen,
  ModalNoFooterScreen,
  ModalRightScreen,
  ModalSubtleFooterScreen,
  ModalWithCustomHeadingScreen,
  ModalWrapContentScreen,
} from "tests/modal/Modal.screen";
import { NotifyBarScreen } from "tests/notifyBar/NotifyBar.screen";
import { NumberInputScreen } from "tests/numberInput/NumberInput.screen";
import { ParagraphDemoScreen } from "tests/paragraph/Paragraph.screen";
import { PasswordStrengthScreen } from "tests/password-strength/passwordStrength.screen";
import { PhoneBrandScreen } from "tests/phoneBrand/PhoneBrand.screen";
import { PillScreen } from "tests/pill/Pill.screen";
import { PinDemoScreen } from "tests/pin/Pin.screen";
import { PriceDemoScreen } from "tests/price/Price.screen";
import { ProductHeroScreen } from "tests/productHero/ProductHero.screen";
import { RadioButtonGroupScreen } from "tests/radioButtonGroup/RadioButtonGroup.screen";
import { SectionScreen, MySectionScreen } from "tests/section/Section.screen";
import { SegmentedTabScreen } from "tests/segmentedtab/SegmentedTab.screen";
import { SelectScreen } from "tests/select/Select.screen";
import { SelectorScreen } from "tests/selector/Selector.screen";
import { ShopSectionScreen } from "tests/shopSection/ShopSection.screen";
import { SkeletonLoaderScreen } from "tests/skeletonLoader/SkeletonLoader.screen";
import { SliderScreen } from "tests/slider/Slider.screen";
import {
  SnackbarDefaultScreen,
  SnackbarErrorScreen,
  SnackbarLoadingScreen,
  SnackbarSuccessScreen,
} from "tests/snackbar/Snackbar.screen";
import { StatusScreen } from "tests/status/Status.screen";
import {
  StepperScreenHorizontal,
  StepperScreenVertical,
  StepperScreenVerticalCollapse,
  StepperScreenInpage,
} from "tests/stepper/Stepper.screen";
import {
  StickyBarBottomScreen,
  StickyBarTopScreen,
} from "tests/stickyBar/StickyBar.screen";
import { StoreButtonScreen } from "tests/storeButton/StoreButton.screen";
import { SummaryListScreen } from "tests/summaryList/SummaryList.screen";
import { TextAreaScreen } from "tests/textArea/TextArea.screen";
import { TextLinkDemoScreen } from "tests/textLink/TextLink.screen";
import { TimePickerScreen } from "tests/timePicker/TimePicker.screen";
import { ToggleDemoScreen } from "tests/toggle/Toggle.screen";
import { TooltipDemoScreen } from "tests/tooltip/Tooltip.screen";
import {
  TopNavigationDefaultScreen,
  TopNavigationMirrorColorScreen,
} from "tests/topNavigation/TopNavigation.screen";

const screens = [
  { id: "Home", component: HomeScreen },
  { id: "Accordion", component: AccordionScreen },
  { id: "ActionButtonDefault", component: ActionButtonDefaultScreen },
  { id: "ActionButtonGroup", component: ActionButtonGroupScreen },
  { id: "ActionButtonIcon", component: ActionButtonIconScreen },
  { id: "Addon", component: AddonScreen },
  { id: "AddonCardHorizontal", component: AddOnCardHorizontalScreen },
  { id: "AddonCardVertical", component: AddOnCardVerticalScreen },
  { id: "AddOnList", component: AddOnListScreen },
  { id: "AFM", component: AFMScreen },
  { id: "AppIcon", component: AppIconScreen },
  { id: "AttentionText", component: AttentionTextScreen },
  { id: "Badge", component: BadgeDefaultScreen },
  { id: "BadgeStatus", component: BadgeStatusScreen },
  { id: "Box", component: BoxDemoScreen },
  { id: "ButtonDefault", component: ButtonDefaultScreen },
  { id: "ButtonEmphasised", component: ButtonEmphasisedScreen },
  { id: "ButtonLoading", component: ButtonLoadingScreen },
  { id: "ButtonSecondary", component: ButtonSecondaryScreen },
  { id: "BundleCardDefault", component: BundleCardScreen },
  { id: "Callout", component: CalloutScreen },
  { id: "Checkbox", component: CheckboxScreen },
  { id: "CheckboxGroup", component: CheckboxGroupScreen },
  { id: "CounterDefault", component: CounterDefaultScreen },
  { id: "CounterHours", component: CounterHoursScreen },
  { id: "DefaultCard", component: DefaultCardScreen },
  { id: "DefaultList", component: DefaultListDemoScreen },
  { id: "DefaultSticker", component: DefaultStickerScreen },
  { id: "DefinitionList", component: DefinitionListDemoScreen },
  { id: "Display", component: DisplayDemoScreen },
  { id: "Divider", component: DividerScreen },
  { id: "DonutGraphDefault", component: DonutGraphDefaultScreen },
  { id: "DonutGraphLarge", component: DonutGraphLargeScreen },
  { id: "DottedGraphDefault", component: DottedGraphDefaultScreen },
  { id: "DottedGraphLarge", component: DottedGraphLargeScreen },
  { id: "FeatureCardBackground", component: FeatureCardBackgroundScreen },
  { id: "FeatureCardImage", component: FeatureCardImageScreen },
  { id: "FeatureCardOdidoPalette", component: FeatureCardOdidoPaletteScreen },
  { id: "FeatureCardText", component: FeatureCardTextScreen },
  { id: "Footer", component: FooterScreen },
  { id: "Grid", component: GridDemoScreen },
  { id: "GridColumn", component: GridColumnDemoScreen },
  { id: "Heading", component: HeadingDemoScreen },
  { id: "IDEAL", component: IdealScreen },
  { id: "InputDatePicker", component: InputDatePickerScreen },
  { id: "InputField", component: InputFieldScreen },
  { id: "InputFieldAutoSuggest", component: InputFieldAutoSuggestionsScreen },
  {
    id: "InputFieldAutoSuggestCategory",
    component: InputFieldAutoSuggestionsCategoryScreen,
  },
  { id: "InputFieldSearch", component: InputFieldSearchScreen },
  { id: "LargeSticker", component: LargeStickerScreen },
  { id: "List", component: ListDemoScreen },
  { id: "LocalNavigation", component: LocalNavigationScreen },
  { id: "ModalBottom", component: ModalBottomScreen },
  { id: "ModalDefault", component: ModalDefaultScreen },
  { id: "ModalImage", component: ModalImageScreen },
  { id: "ModalNoFooter", component: ModalNoFooterScreen },
  { id: "ModalRight", component: ModalRightScreen },
  { id: "ModalSubtleFooter", component: ModalSubtleFooterScreen },
  { id: "ModalWithCustomHeading", component: ModalWithCustomHeadingScreen },
  { id: "ModalWrapContent", component: ModalWrapContentScreen },
  { id: "NotifyBar", component: NotifyBarScreen },
  { id: "NumberInput", component: NumberInputScreen },
  { id: "Paragraph", component: ParagraphDemoScreen },
  { id: "PasswordStrength", component: PasswordStrengthScreen },
  { id: "PhoneBrand", component: PhoneBrandScreen },
  { id: "Pill", component: PillScreen },
  { id: "Pin", component: PinDemoScreen },
  { id: "Price", component: PriceDemoScreen },
  { id: "ProductHero", component: ProductHeroScreen },
  { id: "RadioButtonGroup", component: RadioButtonGroupScreen },
  { id: "Section", component: SectionScreen },
  { id: "MySection", component: MySectionScreen },
  { id: "SegmentedTab", component: SegmentedTabScreen },
  { id: "Select", component: SelectScreen },
  { id: "Selector", component: SelectorScreen },
  { id: "ShopSection", component: ShopSectionScreen },
  { id: "SkeletonLoader", component: SkeletonLoaderScreen },
  { id: "Slider", component: SliderScreen },
  { id: "SnackbarDefault", component: SnackbarDefaultScreen },
  { id: "SnackbarError", component: SnackbarErrorScreen },
  { id: "SnackbarLoading", component: SnackbarLoadingScreen },
  { id: "SnackbarSuccess", component: SnackbarSuccessScreen },
  { id: "Spinner", component: SpinnerScreen },
  { id: "Status", component: StatusScreen },
  { id: "StepperHorizontal", component: StepperScreenHorizontal },
  { id: "StepperInPage", component: StepperScreenInpage },
  { id: "StepperVertical", component: StepperScreenVertical },
  { id: "StepperVerticalCollapse", component: StepperScreenVerticalCollapse },
  { id: "StickyBarBottom", component: StickyBarBottomScreen },
  { id: "StickyBarTop", component: StickyBarTopScreen },
  { id: "StoreButton", component: StoreButtonScreen },
  { id: "SubscriptionHero", component: SubscriptionHeroScreen },
  { id: "SummaryList", component: SummaryListScreen },
  { id: "TextArea", component: TextAreaScreen },
  { id: "TextLink", component: TextLinkDemoScreen },
  { id: "TimePicker", component: TimePickerScreen },
  { id: "Toggle", component: ToggleDemoScreen },
  { id: "Tooltip", component: TooltipDemoScreen },
  { id: "TopNavigationDefault", component: TopNavigationDefaultScreen },
  { id: "TopNavigationMirrorColor", component: TopNavigationMirrorColorScreen },
  { id: "LogosDefault", component: LogosDefaultScreen },
  { id: "LogosInverted", component: LogosInvertedScreen },
  // Add other components here as needed
] as const;

// Create a union type of all screen names
type ScreenNames = (typeof screens)[number]["id"];

// type ComponentType = keyof typeof Components;
type ScreenListProps = {
  navigation: NativeStackNavigationProp<Record<ScreenNames, undefined>>;
};

function HomeScreen({ navigation }: ScreenListProps) {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <FlatList
      style={{ marginBottom: safeAreaInsets.bottom }}
      data={screens}
      // numColumns={3}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { id } }) => (
        <View style={{ margin: 6 }}>
          <Link
            key={id}
            to={{ screen: id }}
            testID={`${id}`}
            style={{
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
            }}
          >
            {`${id}`}
          </Link>
        </View>
      )}
    />
  );
}

// Create a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider brand="odido" theme="light">
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            {screens.map(
              ({ id, component }) =>
                id !== "Home" && (
                  <Stack.Screen key={id} name={id} component={component} />
                ),
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
