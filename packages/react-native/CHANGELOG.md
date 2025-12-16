## 0.44.2

## 0.50.1

### Patch Changes

- a4e21ca: Add 'as' to MySectionTitleProps for better accessibility flexibility

## 0.50.0

### Minor Changes

- Add missing label in PasswordStrength

## 0.49.3

### Patch Changes

- Change: bumped glow-token to `0.4.10`

## 0.49.2

### Patch Changes

- Token bump version 1.19

## 0.49.1

### Patch Changes

- Update feature card min height tokens

## 0.49.0

### Minor Changes

- FeatureCard title minHeight on Switch

## 0.48.1

### Patch Changes

- Add fixes for large font size for: List, Icon, NumberInput, Checkbox, RadioButton

## 0.48.0

### Minor Changes

- Allow passing AllowFontScaling prop to typo components

## 0.47.1

### Patch Changes

- Fix Number input

## 0.47.0

### Minor Changes

- Fix on accordion and modal button

## 0.46.0

### Minor Changes

- Fixes on Button, RadioButton, AddonListItem

## 0.45.0

### Minor Changes

- Bump glow-icon version

### Patch Changes

- fix: SVG for Addon,
  fix: BundleCard button pass palette,
  chore: update naming for palettes to use OdidoPaletter, SwitchPalette or CommonPalette

## 0.44.1

### Patch Changes

- Update Addon types

## 0.44.0

### Minor Changes

- Add new add ons, add fix for NumberInput

## 0.43.0

### Minor Changes

- Add BundleCard component

### Minor Changes

- Added Donut and Dotted graph components

## 0.42.0

### Major Changes

- Reverted RN and EXPO version bumps and kept already created components and functionality

## 1.0.1

### Major Changes

- Update react-native from 0.73.6 to 0.77.0 and expo from 50.0.20 to 52.0.31

## 0.41.0

### Minor Changes

- 0a96d4f: Add: Footer component
- dc39788: Add: Logos component

### Patch Changes

- c34c350: Fix: cannot update component while rendering ThemeProvider warning
  Add: Tooltip.Icon
  Add: TextLink.Icon

## 0.40.0

### Minor Changes

- Allow disabled summary list items to be removed

## 0.39.0

### Minor Changes

- Slider component

## 0.38.0

### Minor Changes

- Add: MySection

## 0.37.0

### Minor Changes

- Update glow-tokens package version 1.9.0

## 0.36.0

### Minor Changes

- 621d154: Add: ShopSection

### Patch Changes

- bugfixed on selector description missmatched design
- 621d154: [!!!] Section: prop `noPadding` removed, use `paddingTop` and/or `paddingBottom` instead. For example, if you have `noPadding="top"`, you should use `paddingTop="none"` instead.

## 0.35.0

### Minor Changes

- Add ShopSection component

## 0.34.2

### Patch Changes

- Update glow-tokens on nextjs app

## 0.35.0

### Minor Changes

- Add DefaultSticker component

## 0.34.1

### Patch Changes

- Adds testing example to nextJs

## 0.34.0

### Minor Changes

- Default Card

## 0.33.0

### Minor Changes

- Added Input Search component

## 0.32.0

### Minor Changes

- Add TimePicker component to the DS

## 0.31.1

### Patch Changes

- Replace expo-crypto 'randomUUID' with React 'useId' hook

## 0.31.0

### Minor Changes

- Added Input Autocomplete component

## 0.30.3

### Patch Changes

- The PasswordStrength has an additional param added to the callback, so the user has the flexibility to use the password strength value.

## 0.30.2

### Patch Changes

- Add jjest preset

## 0.30.1

### Patch Changes

- Allow negative numbers in Price component

## 0.31.0

### Minor Changes

- Remove default value from dismissButtonLabel in Modal to avoid button being always displayed

## 0.30.0

### Minor Changes

- Update glow-tokens package version 1.6.0
- Text Area component

## 0.29.0

### Patch Changes

- Rollback: expo-crypto is back. An alternative needs to be found later.

## 0.29.0

### Minor Changes

- Allow not closable modals to be closed with dismiss buttons

## 0.28.8

### Patch Changes

- Fix: password strength progress bar color for usage within NextJS apps

## 0.28.7

### Patch Changes

- Localization of PasswordStrength component

## 0.28.6

### Patch Changes

- Use testID as a prop instead of testId

## 0.28.5

### Patch Changes

- Resolve expo-crypto dependency issues with SSR web apps

## 0.28.4

### Patch Changes

- Remove Section limitation that only allowed Grid as direct child

## 0.28.3

### Patch Changes

- 486b442: Start skeleton loader with animation

## 0.28.2

### Patch Changes

- Fix the placement of Price on the Selector component

## 0.28.1

### Patch Changes

- 1487067: Fix Grid types issues

## 0.28.0

### Patch Changes

- Polish: TopNavigation bugs fixed

## 0.27.8

### Patch Changes

- Add: Counter onCompleted callback"

## 0.27.7

### Patch Changes

- a88dff8: Polish: AddOnList prop `promo` replaced with `attention`.

  - [!!!] The `attention` prop accepts an `object` containing `text` (`string`), and optionally `variant` (`success` | `warning` | `information` | `danger`).
  - [!!!] List: the `attention` prop now accepts an `object` instead of a `string`.
  - [!!!] List: removed the `attentionPurpose` prop in favor of `variant` within `attention`.

## 0.27.6

### Patch Changes

- b5ea9c9: Polish: Price a11y-friendly description

## 0.27.5

### Patch Changes

- 8d9024d: Docs: restructured stories

## 0.27.4

### Patch Changes

- Add callback to Segmented Tab on tab change

## 0.27.3

### Patch Changes

- Updated Modal to allow complete outside control.

## 0.27.2

### Patch Changes

- Subtle variant of Segmented Tab doesn't run animation

## 0.27.1

### Patch Changes

- ed5ba7b: Add glow icon

## 0.27.0

### Minor Changes

- 9ae3519: Add AppIcon component

## 0.26.0

### Minor Changes

- Fix Input Field component: Issue with the styles of the error message.

## 0.25.4

### Patch Changes

- Add test ids to skeleton loader and stack

## 0.25.3

### Patch Changes

- Polish: TopNavigation

## 0.25.2

### Patch Changes

- Polish: Modal property `customHeader` and `titleSize` added.

  - [!!!] prop: removed `imageSize`, use `image={resizeMode:""}` instead.
  - [!!!] prop: changed `imageRatio` into `headerRatio`.
  - [!!!] prop: changed `header` into `title`.

## 0.25.1

### Patch Changes

- Add loading state to all buttons

## 0.25.0

### Minor Changes

- add counter component

## 0.24.3

### Patch Changes

- Fix: switching between dark and light mode will automatically update the heading font-family

## 0.24.2

### Patch Changes

- Fix AddOn SVG images

## 0.24.1

### Patch Changes

- Fix: allow Checkbox label to be a ReactElement

## 0.24.0

### Minor Changes

- a9a2363: Add: TopNavigation

  - [!!!] Main: prop `stickyHeader` changed to `hasStickyHeader`

## 0.23.1

### Patch Changes

- Fixes to AddOnList

## 0.23.0

### Minor Changes

- Update glow-tokens package version

## 0.22.0

### Minor Changes

- Integration of components library into Next js example project

## 0.21.1

### Patch Changes

- Fix issue with stickybar reloading

## 0.21.0

### Minor Changes

- Add PhoneBrands component

## 0.20.0

### Minor Changes

- Added tooltip component

### Patch Changes

- 7523810: ListItem, added wrapper prop to wrap content of listItem.

## 0.19.0

### Minor Changes

- Add StoreButton component

## 0.18.0

### Minor Changes

- Add SkeletonLoader component

## 0.17.16

### Patch Changes

- Fix: headerImage in AddOnList now is restricted to stay within the frame

## 0.17.15

### Patch Changes

- Feat: Extends `AddOnList` to allow for `headerImage` to either be of `src` or `localSrc`.

## 0.17.14

### Patch Changes

- fix: stickybar without modal

## 0.17.13

### Patch Changes

- Radio button group fix, to also work without a default selection.

## 0.17.12

### Patch Changes

- Fix: list item font size

## 0.17.11

### Patch Changes

- Fix for usage of the SafeAreaContext in combination with the Stickybar and Snackbar

## 0.17.10

### Patch Changes

- Stickybar styling fixes

## 0.17.9

### Patch Changes

- b2048ff: Fix: info icon of input label correspond with dark/light mode

## 0.17.8

### Patch Changes

- e57d516: Add: Section property `noPadding` updated with `vertical`.

  - [!!!] Grid prop `alignment` removed.

- f8948a3: Add: Typography components property `color`.
- 3e20043: Add: theme dark mode.
- e62345a: Fix: Stepper - not taking up additional height when `title` is set.

  - [!!!] Removed: stepper - `palette`

- cf70320: Add: NotifyBar component property `closeText`.

## 0.17.7

### Patch Changes

- Fix modal image style prop

## 0.17.6

### Patch Changes

- Fix selector styling when it has a checkbox

## 0.17.5

### Patch Changes

- f0e7e06: Polish: Section prop `palette` added.

  - [!!!] prop: changed `paddingTop` to `noPadding`
  - [!!!] prop: changed `prominence` to `variant`
  - [!!!] prop: removed `title`
  - [!!!] prop: removed `subTitle`
  - [!!!] prop: removed `triggers`
  - [!!!] prop: removed `description`
  - [!!!] DefaultList: prop `odidoPalette` changed to `palette`
  - [!!!] Badge: prop `odidoPalette` changed to `palette`

- 144e444: Polish: Box property `gradient` added, Box now displays a gradient when `prominence` is set to `emphasised`.
  Add: GlowGradient property `type` updated with `Glow2` and `Glow3`
- 169d58f: [!!!] Accordion: changed `body` property into `children`
- d9229d2: Add: Modal prop `imageSize` added to configure `resizeMode` of Image
  Fix: Image source scales to parent container

## 0.17.4

### Patch Changes

- Date picker input resize and modal cleanup (unlock scroll)

## 0.17.3

### Patch Changes

- InputField.Date fix, from position sticky to absolute when used in the context of a package consumer.

## 0.17.2

### Patch Changes

- Fix issues with Selector on android/ios

## 0.17.1

### Patch Changes

- InputDatePicker fix for the opening position relative to the viewport offset

## 0.17.0

### Minor Changes

- Add On List

## 0.16.1

### Patch Changes

- Fix Selector issues on ios

## 0.16.0

### Minor Changes

- Add: Snackbar

## 0.15.0

### Minor Changes

- f2960ba: - Add: Summary list
  - [!!!] Modal: prop `imageSource` removed, use `image: localSrc` instead.
  - [!!!] FeatureCard: prop `imageSource` removed, use `image: localSrc` instead.
  - [!!!] SubscriptionHero: prop `imageSource` removed, use `image: localSrc` instead.

### Patch Changes

- 2d54a69: - Add: Addon property `size="xs"`
  - [!!!] prop: `disabled` removed, use `state`

## 0.14.1

### Patch Changes

- 8e3a33e: Use a working version of unistyles

## 0.14.0

### Minor Changes

- - Added: Input DatePicker [#102](https://github.com/odido-portals/glow-react-native/pull/102)
  - Added: Selector [#77](https://github.com/odido-portals/glow-react-native/pull/77)
  - Fixed: Avoid dropdown open when disabled [#139](https://github.com/odido-portals/glow-react-native/pull/139)

## 0.13.1

### Patch Changes

- updated: button font weight from `400` to `500`
  - updated: callout background color change.
  - updated: defaultList palette colors to `iconColored` variant.

## 0.13.0

### Minor Changes

- ec212cc: Add: NotifyBar

### Patch Changes

- c98c44f: Add: components using images now accepts local image source:
  - Feature Card
  - Subscription Hero
  - Modal

## 0.12.0

### Minor Changes

- fixed: input checkbox styling [27f19d2](https://github.com/odido-portals/glow-react-native/commit/27f19d295d61c98422cb334ab3184625aaccf9a2)
- added: test ID's to all components [a60d364](https://github.com/odido-portals/glow-react-native/commit/a60d36458c9d2a71b1e616fe0c6fd94691a5f8cc)
- added: select (dropdown) [94f6e75](https://github.com/odido-portals/glow-react-native/commit/94f6e75180b920f8ce45d0630695e17f373eae80)
- fixed: modals, needing an event on there triggers[061a243](https://github.com/odido-portals/glow-react-native/commit/061a243079cfe74363a5a3a86731522ac4c397b1)
- fixed: icon color revert to expo 50, due to sb regression [616e7b3](https://github.com/odido-portals/glow-react-native/commit/616e7b335d86ffd246fee6553afec584eb191592)

## 0.11.0

### Minor Changes

- Extend: input number, add small variant [ec22fa5](https://github.com/odido-portals/glow-react-native/commit/d278750db969f578f4968d0fb0b202f50)
- upgrade expo bump deps, includes fix for reanimated cyclical errors[a2ff803](https://github.com/odido-portals/glow-react-native/commit/a2ff8031a8e9eb6ce39356eea46d6a7cbd171d10)
- Added: addOn [3128819](https://github.com/odido-portals/glow-react-native/commit/3128819)

## 0.10.0

### Minor Changes

- b92b9ab: Added hero subscription

### Patch Changes

- Fix: cyclical import bug

## 0.9.1

### Patch Changes

- Fix: vertical alignment of loading icon within <Pin />

## 0.9.0

### Minor Changes

- fc3f6e0: Added spinner
- f342d31: Added modal

  - [!!!] Changed Button prop `style` into `baseStyle`
  - Added Button prop `pressableStyle`

## 0.8.0

### Minor Changes

- 89c97e0: Added customAffix prop to InputField, for internal use, will be refactored in the future.
- 4a6fb04: Updated layout components along with other minor (but breaking) changes.

  - [!!!] SectionGroup: Removed. Use Main instead.
  - [!!!] Container: Removed. Use Grid instead.
  - [!!!] ControlGroup: `direction` prop values changed from `"vertical" | "horizontal"` to `"row" | "column"`.
  - [!!!] Paragraph: `paragraphStyle` prop changed to `style`.
  - [!!!] Display: `styles` prop changed to `style`.
  - [!!!] Heading: `styles` prop changed to `style`.
  - [!!!] Button: `styles` prop changed to `style`.

### Patch Changes

- 6e75cfa: added odidoPalette on badge, tokens update on defaultList, updated images for VR tests
- 60c9496: Fixed usePropAcrossBreakpoints hook

## 0.7.0

### Minor Changes

- added components stepper, segemented tab, password strength
- 8a7ba3b: Added status
- eb12db0: Change InputField structure
  - [!!!] prop: `helperMessage` changed, to `helperText`
  - [!!!] prop: `state` removed, use `validated` and `disabled`
  - [!!!] prop: label changed, expects and object with `text` property

### Patch Changes

- 3a5ea51: Fixed inverted status of the divider.

  - [!!!] Divider: changed `style` prop to `variant`.

- 04ff77d: Pin: removed onLayout to set the width

## 0.6.0

### Minor Changes

- Added callout

## 0.5.0

### Minor Changes

- Added divider

## 0.4.0

### Minor Changes

- Added list variants: list, default, definition

## 0.3.0

### Minor Changes

- 0c505d8: Added feature card

### Patch Changes

- a381858: [Breaking change] replaced style prop with styles for the following components:
  - Heading
  - Paragraph
  - Display

## 0.2.0

### Minor Changes

- Added feature card component
- Added action button component

## 0.1.0

### Minor Changes

- ThemeProvider implementation

## 0.0.19

### Patch Changes

- Price currency fix

## 0.0.18

### Patch Changes

- button alignment

## 0.0.17

### Patch Changes

- b2718f6: Clean-up

## 0.0.16

### Patch Changes

- f627cc2: Clean up

## 0.0.15

### Patch Changes

- Reverting last version

## 0.0.14

### Patch Changes

- Updated restriction on layout components

## 0.0.13

### Patch Changes

- Improved section component

## 0.0.12

### Patch Changes

- d4e540f: Updated package

## 0.0.11

### Patch Changes

- bdf535e: Updated components:
  - Button
  - TextLink
  - Typography naming
  - InputText (improved for using with Zod + React Hook Forms)

## 0.0.10

### Patch Changes

- New components: Display, Heading, Paragraph, Strong, InputField

## 0.0.9

### Patch Changes

- New components: Box and TextLink

## 0.0.8

### Patch Changes

- New component Grid

## 0.0.7

### Patch Changes

- Changed default direction of Stack component

## 0.0.6

### Patch Changes

- Updated theming with support for Simpel and new Stack component

## 0.0.5

### Patch Changes

- Changed internal setup

## 0.0.4

### Patch Changes

- Updated README.md + working on setup Jest for component testing.

## 0.0.3

### Patch Changes

- Updated README.md

## 0.0.2

### Patch Changes

- Updated README.md

## 0.0.1

### Patch Changes

- f054978: Initial version of glow react native components
