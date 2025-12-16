# @odido-portals/glow-react-web

## 0.127.3

### Patch Changes

- fix: Vertical stepper show dotted line, update tokens, fix marker size

## 0.127.2

### Patch Changes

- d26fd9f: Adjust FixedSettingsNavigation to adhere to previous implementation better.

## 0.127.1

### Patch Changes

- 0ca0689: export FixedSettingsNavigation

## 0.127.0

### Minor Changes

- 631dc2f: Add FixedSettingsNavigation component

## 0.126.2

### Patch Changes

- feat: update list item tokens

## 0.126.1

### Patch Changes

- 483c5cc: Fix: local nav compact variant height stays consistent when changing the `titleSize`

## 0.126.0

### Minor Changes

- Add: RangeSlider component

## 0.125.0

### Minor Changes

- feat: add DonutGraph component

## 0.124.4

### Patch Changes

- Update MySectionTitleProps to take an 'as' prop

## 0.124.3

### Patch Changes

- Fix: MainNavigation - made links property optional
- Fix: MainNavigation - hydration issue in nextjs related to useId.
- Add block padding to mysection instead of just top padding

## 0.124.2

### Patch Changes

- Fix: MainNavigation - apply logo when there's only a logo

## 0.124.1

### Patch Changes

- Fix: MainNavigation - check if window obj is defined

## 0.124.0

### Minor Changes

- ba38cc9: Autosuggest input fix

### Patch Changes

- fix: DefaultCard - fix hover states, border size

## 0.123.0

### Minor Changes

- Autosuggest input

### Patch Changes

- bf05d3a: Input Fields Refactor:

  - InputField - changed `disabled` property to `inactive`.
  - InputField - changed state value of `success` into `valid`.
  - Prevented hover effects on disabled input fields and their buttons
  - Fix: Tooltip - When inactive and while not visible, the tooltip was still clickable.

## 0.122.0

### Minor Changes

- My Section paddingTop should take a boolean

## 0.121.0

### Minor Changes

- 7fc1135: Add option to hide close icon on modal manually

## 0.120.0

### Minor Changes

- Autosuggest fix

## 0.119.1

### Patch Changes

- Update Glow-icon to version 0.6.7

## 0.119.0

### Minor Changes

- 8198d4d: add force-bottom-divider prop to <ListItem />
- 378080a: Added SupportText to the SummaryList

### Patch Changes

- 52943d7: Glow effect now being added on the loading Icon.

## 0.118.2

### Patch Changes

- a0e16d1: Fix: MainNavigation - do not display the menu toggle button when a subtree is not present

## 0.118.1

### Patch Changes

- 5adec60: Add: StickyBar - `hideWhenVisibleRef`. This allows the bar to automatically hide when the referenced element enters the viewport.

## 0.118.0

### Minor Changes

- Autosuggestion input fix (Enter key press)

## 0.117.0

### Minor Changes

- 3257844: Add: Stack - `size` property. Behaves the same as Column. The `columnSize` property now applies a width to each of its child (as described in the docs).

  - [!!!] `columnSize` applies a max-width to its children now. Use `size` instead if you want to apply a size directly on Stack.

## 0.116.2

### Patch Changes

- cee6b7a: Fix: reduced dependency of @layer due to style presedence issues

## 0.116.1

### Patch Changes

- dddea6c: Add: Stack - justifyContent `stretch` value. Applies a flex: 1 on its children.

## 0.116.0

### Minor Changes

- edb6483: - Add: MainNavigation - `routeKey` property. Enforces resetting state within the main navigation when updated.
  - Add: Simwallet theme.
  - Fix: focus trap triggers focus on nextjs.
  - Fix: CSS' @layer reordered into correct sorting order.
  - Docs: Updated README to include prefetching instructions for Glow SVGs.
  - [!!!] Callout - changed `triggers` property into `callToAction`.
  - [!!!] DefaultCard - changed `triggers` property into `callToAction`.
  - [!!!] EmphasizedHero - changed `triggers` property into `callToAction`.
  - [!!!] Hero - changed `triggers` property into `callToAction`.
  - [!!!] StickyBar - changed `triggers` property into `callToAction`.

## 0.115.0

### Minor Changes

- Datepicker input improvements

## 0.114.1

### Patch Changes

- StickyBar, fix grow behavior

## 0.114.0

### Minor Changes

- 3f83000: Added DotNav component

## 0.113.1

### Patch Changes

- 572cfdf: Feat: allow onClick on logo

## 0.113.0

### Minor Changes

- Add footerTopPadding prop to <Modal /> component

## 0.112.1

### Patch Changes

- Fix: animated logo video height

## 0.112.0

### Minor Changes

- feat: `MainNavigation` component added.

  - Fix: BannerCard - `banne-card` export typo resolved. Use `banner-card` instead.
  - Change: AutoSuggestion input - `autosuggestClassName` property becomes `autoSuggestionClassName`.
  - Change: AutoSuggestion input - added `popupClassName` to allow to restyle the autosuggestion popup.
  - Removed: Autosuggestion - `autoSuggestCategory` property.
  - Change: NotifyBar - `message` property becomes `children`. Accepts `ReactNode` instead of `string`.
  - Add: Stack - added `alignSelf` property. Accepts the same properties as `alignItems`.

## 0.111.2

### Patch Changes

- Fix: sticky bar token v0 to v1 reference

## 0.111.1

### Patch Changes

- Fix: sticky bar token v0 to v1 reference

## 0.111.0

### Minor Changes

- 08e927d: added error state to <Selector />

## 0.110.0

### Minor Changes

- Add logoHref to Header

## 0.109.1

### Patch Changes

- All Selectors (Selector, SelectorLight and SelectorImage): do have a pointer on hovering to indicate it's clickable

## 0.109.0

### Minor Changes

- Fix issue with TextLink contained in Checkbox label

## 0.108.0

### Minor Changes

- Add scroll to autosuggestion list in autosuggestion input field component

## 0.107.1

### Patch Changes

- e1327a8: Fix: token bump to include missing breakpoint tokens

## 0.107.0

### Minor Changes

- Fix: Remove unwanted centering of bullet and text in lists

## 0.106.7

### Patch Changes

- <Header /> has the option to hide the login, search or shop button by passing the visible: false prop. <AgentBar /> the appointment link is an optional param now.

## 0.106.6

### Patch Changes

- Fix: grid vertical padding removed

## 0.106.5

### Patch Changes

- Fix: grid gutters was off by 2px

## 0.106.4

### Patch Changes

- feat: add leadingContent prop to ListItem, rename action to trailingContent

## 0.106.3

### Patch Changes

- feat: add direction prop to BannerCard

## 0.106.2

### Patch Changes

- 78ed59b: Fix: input container label alignment

## 0.106.1

### Patch Changes

- 2649a9e: - Added

  - New command-line flags for token versions generation script:
    - `--only-timeline`: Generate only timeline history
    - `--only-current`: Generate only current version documentation
  - Comprehensive documentation for token versions workflow
  - Changed
  - Optimized `changeset:version` command to use `--only-timeline` flag for faster execution
  - Removed
  - Remove Storybook `onboarding` addon as it is no longer needed

## 0.106.0

### Minor Changes

- Move autosuggestion className to container

## 0.105.0

### Minor Changes

- Allow to pass autosuggestClassName in autosuggest popup input

## 0.104.2

### Patch Changes

- feat: add size prop to Hero component

## 0.105.0

### Minor Changes

- Add missing label in PasswordStrength

## 0.104.1

### Patch Changes

- Fix: AddonList and SummaryList styling

## 0.104.0

### Minor Changes

- c05bd8a: CSS: Token variables are now included directly in each component’s CSS module instead of being loaded globally.
  This avoids shipping unused tokens, improves code-splitting in Next.js/Storybook/React, and makes the growing token library easier to maintain.

  **Migration:** Global token imports are no longer required and can be safely removed:

  ```diff
  - import "@odido-portals/glow-react-web/odido-dark-tokens.css";
  - import "@odido-portals/glow-react-web/odido-light-tokens.css";
  ```

  - [!!!] List: removed `onChange`, use `action` and `<Toggle />` `onChange` instead.
  - [!!!] List: removed `checked`, use `action` and `<Toggle />` `checked` instead.

## 0.103.1

### Patch Changes

- Updated List component.

  - Add: ListItem `onChange` property. Used when rendering a `<Toggle />` component inside `<ListItem />`.
  - Add: ListItem `checked` property. Used when rendering a `<Toggle />` component inside `<ListItem />`.
  - Add: ListItem `href` property. Used when `clickable` is set to `true`.

## 0.103.0

### Minor Changes

- Updated props for Selector and SelectorImage

  - [!!!] Selector: `secondaryAction` prop changed to `TextLinkBaseProps`.
  - [!!!] Selector: `price` prop changed to `PriceProps`.
  - [!!!] Selector: `badge` prop changed to `BadgeProps`.
  - [!!!] Selector: `list` prop changed to `DefaultListProps`.
  - [!!!] TextLink: `disabled` prop changed to `inactive` and moved to TextLinkBaseProps.

## 0.102.2

### Patch Changes

- Fix css parsing issue

## 0.102.1

### Patch Changes

- Adjust LocalNav to fit maxwidth according to layout

## 0.102.0

### Minor Changes

- Added BannerCard component

## 0.101.0

### Minor Changes

- 982d1b3: Change: GlowGradient is now mapped to palette color

  - [!!!] Removed `brand` property from `Box`, `Icon`, and `Section` — now applied automatically.
  - [!!!] Removed `gradient` or `glow` properties from multiple components (`Box`, `Section`, `DefaultCard`, `DefaultSticker`, `LargeSticker`, `ModalCustomHeader`, `EmphasisedHero`, `EmphasisedHeroSection`, `SelectorLight`) — set gradients via `palette` instead.
  - [!!!] Renamed `AddOnList` to `AddonList`; exported as `addon-list`.

## 0.100.0

### Minor Changes

- Improved Stepper Vertical UI

## 0.99.0

### Minor Changes

- 1b266e7: Add: SelectorLight component

  - Checkbox: styling and controlled / uncontrolled behavior improved.
  - GlowGradient: added `enableHover` to disable changing colors on hover.
  - [!!!] ImageSelector: renamed to `SelectorImage` to be in line with Figma.
  - [!!!] SelectorImage: changed `isSelected` to `checked`.
  - [!!!] Selector: changed `isSelected` to `checked`.
  - [!!!] GlowGradient: removed properties `animatedStyle`, `renderAs` and `brightness` in favor of handling it natively in css
  - [!!!] GlowGradient: changed accepted property values of `type` into lowercase. For example; `glow1` instead of `Glow1`.

## 0.98.1

### Patch Changes

- Shop section tweaks

## 0.98.0

### Minor Changes

- Fix the jump to top of page when radio button clicked

## 0.96.0

### Minor Changes

- Accesibility fixes

## 0.95.0

### Minor Changes

- Export CustomModalHeader

## 0.94.2

### Patch Changes

- 5178dc5: Fix and small updates for the PostalCodeCheck Input and Output

## 0.94.1

### Patch Changes

- 20a2517: Updates and fixes for Large Sticker
  - Worked on LargeSticker component for defaultlist and palette color handling.
  - Matched Figma designs

## 0.94.0

### Minor Changes

- # Exported ModalCustomHeader and adding white option as bg
- fb40312: Review All Buttons Sets and Variants

  Features:

  - Added comprehensive ZVariants story for Button component showcasing multiple configurations
  - Enhanced ZVariants story with column headers and improved descriptions
  - Added inverted icon colors for secondary button prominence

  Refactoring & Improvements:

  - Improved Button component stories structure and consistency
  - Enhanced icon handling across button components
  - Updated ActionButton and ActionButtonGroup stories with better naming conventions
  - Refined ActionButtonIcon styling and documentation:
    - Adjusted padding properties for consistency
    - Renamed `state-disabled` to `state-inactive` for better clarity
    - Updated token version headings for consistency
  - Ensured consistent text color for action button labels
  - Cleaned up unused styles and improved code comments

  Documentation:

  - Enhanced clarity and formatting across ActionButton components
  - Updated component documentation with better context and examples

  This release focuses on standardizing and improving the Button component ecosystem with better stories, consistent styling, and enhanced documentation.

## 0.93.0

### Minor Changes

- Fixed TextLink as "button" when used inside a <form>

## 0.92.0

### Minor Changes

- Fixed InputFieldDatePicker calendar button when contained in a <form>

## 0.91.2

### Patch Changes

- StepperVerticalStepProps: titleAs to optional

## 0.91.1

### Patch Changes

- VerticalStepper: update the component so the step titles will be rendered as span by default, with the option to overwrite it.

## 0.91.0

### Minor Changes

- Shopping Cart atom changes

## 0.90.3

### Patch Changes

- Token versioning documentation updated with Timeline History

## 0.90.2

### Patch Changes

- 56a0079: - Default Card: Fix variants issues
  - Horizontal Card: Fix variants issues
  - Update styles to match designs
  - Update documentations

## 0.90.1

### Patch Changes

- fc620c1: Small updates and tweaks on the Checkbox and Checkbox group

## 0.90.0

### Minor Changes

- c839a46: Add: BundleWidget component

## 0.89.1

### Patch Changes

- LocalNavigation: Option to render just a LeftAction button. DefaultList: Option to render a list with different icon colors.

## 0.89.0

### Minor Changes

- Allow passing testID to Selector component

## 0.88.4

### Patch Changes

- Fix on Selector Price alignment

## 0.88.3

### Patch Changes

- [!!!] LocalNavigation update `action` with `href` property and change TextLink to default `a` type

## 0.88.2

### Patch Changes

- - Review Accordian component
  - Review and update documentation for File InputField component
  - Update IputField component to now accepting Tooltip Component in `info` prop in legend

## 0.88.1

### Patch Changes

- 080ca6d: Fix: unknown prop reference

## 0.88.0

### Minor Changes

- 9f87429: Change: StepperInpage component

  - [!!!] Removed `withTerminalDivider`. Use `divider` of `StepperInpageStep` instead.

  Change: StepperInpageStep component

  - Added `callout` property
  - Setting the `state` property to `inactive` in `StepperInpageStep` now passes this `inactive` state into `textLink` and `badge`.
  - [!!!]: Replaced `content` prop with `children`. Accepts `ReactNode`.
  - [!!!]: Replaced `status` prop with `state`.

  Change: StepperHorizontal

  - [!!!]: Replaced `status` prop with `state`.

  Change: StepperVertical

  - [!!!]: Replaced `status` prop with `state`.

## 0.87.3

### Patch Changes

- Added Tooltip component to ShoppingCard

## 0.87.2

### Patch Changes

- Fix: stack flex-utilities per breakpoint

## 0.87.1

### Patch Changes

- [!!!] `type` prop added to BadeStatus which accepts `icon` to show icon or `default` which shows `count` as number.
- Fixes for Badge token usage

## 0.87.0

### Minor Changes

- 5750d7b: Change: DefaultList

  - [!!!] `inactive` prop renamed to `state`. This prop accepts either `inactive` or `default`.
  - [!!!] `color` prop renamed to `inverted` prop, which is a boolean.

## 0.86.2

### Patch Changes

- Fix: last item in Shopping Cart spacing

## 0.86.1

### Patch Changes

- cb06fb8: Remove: JQuery dependency from slick-carousel

## 0.86.0

### Minor Changes

- 6cbb62a: Add: EmphasisedHeroSection component
  Add: EmphasizedHero component

  - MySection: fixed issue with `paddingTop` not being set to 0 if set to `none`.
  - Counter: `size` prop accepts breakpoints as well.
  - [!!!] Counter: `size` prop - replaced `large` with `lg`.

## 0.85.4

### Patch Changes

- 5c3194c: Fix: Convert `stop-color` to `stopColor` for SVG in JSX

## 0.85.3

### Patch Changes

- Add carousel component tokens

## 0.85.2

### Patch Changes

- fix: update TextLink style in AgentBar

## 0.85.1

### Patch Changes

- Price: update invactive color, remove showDecimal prop

## 0.85.0

### Minor Changes

- f80f13f: Add: UserNavigation component

## 0.84.2

### Patch Changes

- c643197: Update: Selector - made `variant`, `state` and `list` optional properties

  - Fix: Selector takes up 100% of width by default
  - Fix: ImageSelector takes up 100% of width by default
  - Fix: Stickybar `children` now applies `color` to each child

## 0.84.1

### Patch Changes

- Pass Button as a CallToActionButton prop on PostCodeCheckerInput component

## 0.84.0

### Minor Changes

- SummaryList: Add option to render divider via prop. Callout: Add option to render the h tag to need of the context.

## 0.83.0

### Minor Changes

- Refactored tooltip to Portal-Based Rendering

## 0.82.6

### Patch Changes

- Set default text color for ShoppingCart details icon

## 0.82.5

### Patch Changes

- Fix: make price component conditional during the render

## 0.82.4

### Patch Changes

- 16ef96f: Fix: deduplicated :root output

## 0.82.3

### Patch Changes

- TextLink fixes: hover, active state color, underline

## 0.82.2

### Patch Changes

- Fix build output by emitting declaration files via ts

## 0.82.1

### Patch Changes

- 4ee1c50: Fix: Highlight now applies the correct token on text.

  - Selector: `price` property now allows you to control the size of the Price.
  - Selector: `title` property can be custom formatted using square brackets (`[]`) and pipes (`|`).
  - ImageSelector: `title` property can be custom formatted using square brackets (`[]`) and pipes (`|`).

## 0.82.0

### Minor Changes

- Add AgentBar component

## 0.81.3

### Patch Changes

- update logic for classes and styles for LocalNavigation with compact variant and default fontSize parameters

## 0.81.2

### Patch Changes

- Update documentation title for Section

## 0.81.1

### Patch Changes

- Fix for Navbar dark mode

## 0.81.0

### Minor Changes

- 9dac3ca: [!!!] ShoppingCart - removed properties `title`, `titleInfo`, `cartAccordion`, `textLink`, `primaryButton` and `secondaryButton` in favor of `children`, `triggers` and `footnote`.

## 0.80.6

### Patch Changes

- Provide default variant for PostCodeChecker Input component

## 0.80.5

### Patch Changes

- d7d4a20: Update: Button - apply inactive style when button is rendered as anchor

## 0.80.4

### Patch Changes

- fix: checkbox label

## 0.80.3

### Patch Changes

- Revert TextLink alignment when icon present

## 0.80.2

### Patch Changes

- Provide default values for LocalNav

## 0.80.1

### Patch Changes

- StickyBar z-index fix and checkbox with list as label fix

## 0.80.0

### Minor Changes

- Skeleton Loader in react web

## 0.79.12

### Patch Changes

- 2290895: Add: Toggle - extends from HTMLInputElement

## 0.79.11

### Patch Changes

- Add insurance AddOn variant

## 0.79.10

### Patch Changes

- Shopping Cart export fixes

## 0.79.9

### Patch Changes

- Fixes on PostCodeChecker component

## 0.79.8

### Patch Changes

- Fix: Box - stack content vertically by default

## 0.79.7

### Patch Changes

- Fix PostCodeCheck component export

## 0.79.6

### Patch Changes

- Update: Accordion Tokens and fixes based on UX Review

## 0.79.5

### Patch Changes

- 00a58cd: Fix: MySection - allow children to inherit full width of the container

## 0.79.4

### Patch Changes

- 50a6ff1: Add: Stack - `columnSize` property

## 0.79.3

### Patch Changes

- Fixes on TextLink, LocalNav and ShoppingCart components

## 0.79.2

### Patch Changes

- 9e33e95: Update: Tokens update Button and Hero
- 919af44: Fix: Callout token fixes
- Remove extra padding on product hero

## 0.79.1

### Patch Changes

- fix local navigation

## 0.79.1

### Patch Changes

- Add On List polishing

## 0.79.0

### Minor Changes

- Added: File upload variant for InputField

## 0.78.0

### Minor Changes

- d7583cd: Change: Heading and Display

  - Heading: you're now able to add custom formatting using square brackets (`[]`) and pipes (`|`).
  - Display: you're now able to add custom formatting using square brackets (`[]`) and pipes (`|`).

## 0.77.1

### Patch Changes

- Fix container gap in InPage Stepper

## 0.77.0

### Minor Changes

- Added Tooltip component

## 0.76.0

### Minor Changes

- Add: HeroSection component

## 0.75.1

### Patch Changes

- Bump token version in callout

## 0.75.0

### Minor Changes

- ec8d308: Add Breadcrumb component

## 0.74.0

### Minor Changes

- b1f42f3: Add: Carousel component

  - Grid: added `noGutters` property
  - [!!!] HorizontalCard: Replaced `paragraph` with `children`

## 0.73.3

### Patch Changes

- Bug fixes for default card and Definition list

## 0.73.2

### Patch Changes

- fix: add Modal footer background tokens

## 0.73.1

### Patch Changes

- Add minus to Price component

## 0.73.0

### Minor Changes

- Add: GlowIcon component (can be imported from Icon)

## 0.72.2

### Patch Changes

- Add ProgressBar to index file

## 0.72.1

### Patch Changes

- Allow descriptions on ListItem to be ReactElements

## 0.72.0

### Minor Changes

- Refactor: ProgressBar rename steps

## 0.71.0

### Minor Changes

- Add Slider component

## 0.70.1

### Patch Changes

- Bump lib version to get fixed font icons

## 0.70.0

### Minor Changes

- Add ProgressBar component

## 0.69.2

### Patch Changes

- Change: bumped glow-token to `0.4.11`
- Extend Grid to allow passing container size

## 0.69.1

### Patch Changes

- Fix on Modal when open via visible prop

## 0.69.0

### Minor Changes

- c0dbd29: Add PostalCodeCheckInput component
- 8818b5e: Add PostalCodeCheckInput component

## 0.68.0

### Minor Changes

- Fix: InputDatePicker locale in NextJS

  - [!!!] InputDatePicker: `locale` property accepts `{ code: string, object: Locale }` instead of `string`.

## 0.67.0

### Minor Changes

- Add: Hero component

  - Image: `ratio` property now supports breakpoints
  - Button: `fill` property now supports breakpoints

## 0.66.0

### Minor Changes

- 2c25a81: - Change: Button now supports changing the `as` tag,enabling text link behavior.
  - [!!!] Footer - Changed `logo` into `brand`

## 0.65.1

### Patch Changes

- Token bump version 1.19.0

## 0.65.0

### Minor Changes

- 945d79a: Fixed ShoppingCart exports

## 0.64.5

### Patch Changes

- shopping cart documentation

## 0.64.4

### Patch Changes

- Fix: make secondary actions clickable on Selector

## 0.64.3

### Patch Changes

- 25e50dc: Fix: Box now can be server rendered
  - Add: Box property `brand`
    Fix: Section now can be server rendered
  - Add: Section property `brand`

## 0.64.2

### Patch Changes

- Fix: InputFieldAutosuggest and InputFieldDatePicker exports

## 0.64.1

### Patch Changes

- Fix: update icon padding for loading state in Button component

## 0.64.0

### Minor Changes

- Added: A11y linting check for improved accessibility- a
- 75fe6e:
  Add: PostalCodeOutput component
  Add: BadgeStatus property `variant`: `information` value
- [!!!] DefinitionList: `description` property changed into `children`.

## 0.63.0

### Minor Changes

- 6a2765a: Added Header Navigation Component

### Patch Changes

- 6ea2154: Fix: Footer - Footerlink aria-label now gives better context

## 0.60.1

### Patch Changes

- 631f726: Fix: selector and selector image border render inside component

## 0.60.0

### Minor Changes

- Add Shopping Cart atoms

## 0.59.4

### Patch Changes

- 6b9792b: fix: selector pill height size

## 0.59.3

### Patch Changes

- 1346f23: Fix selector radio option

## 0.59.2

### Patch Changes

- Change: Updated InpageStepper to use the Badge component for badge rendering.

## 0.59.1

### Patch Changes

- Fix: update <ListItem /> compnent so it's not modifying the test id in the implementation.

## 0.59.0

### Minor Changes

- Add: StatusButton as an internal component
- Change: Refactored Callout component to use StatusButton
- Move: Relocated BaseButton to internal directory

## 0.58.3

### Patch Changes

- fix: error message icon alignment

## 0.58.2

### Patch Changes

- fix: <StickyBar /> buttons when having a bigger text

## 0.58.1

### Patch Changes

- Add id to Section component

## 0.58.0

### Minor Changes

- Fixes to Pin component

## 0.57.0

### Minor Changes

- d9e8f0e: Fix: Button icon prop testID is now correctly applied

  - ActionButton: Added `ariaLabel` property
  - [!!!] Icon: Removed `role` property

### Patch Changes

- 225c4fd: fix footer underline link and social visited link color and some minor docs improvements

## 0.56.0

### Minor Changes

- 98076e8: Change: Input variants have a clear button

  - [!!!] The `DatePicker` is no longer bundled within `InputField`. Use the new `InputFieldDatePicker` (exported from `@odido-portals/glow-react-web/input-field-datepicker`) component instead.

## 0.55.0

### Minor Changes

- 15071a1: Add: Pill Component

## 0.54.1

### Minor Changes

- NotifyBar export casing updated

## 0.54.0

### Minor Changes

- Add Image Selector component

## 0.53.0

### Minor Changes

- Added Pin component

## 0.52.2

### Patch Changes

- Remove limit inpage stepper

## 0.52.1

### Patch Changes

- List and ListItem fixes

## 0.52.0

### Minor Changes

- Add horizontal card component

## 0.51.0

### Minor Changes

- 630447b: Add: InputField Autosuggest

## 0.50.0

### Minor Changes

- 24aec67: Add: SummaryList component

## 0.49.1

### Patch Changes

- Small fixes: remove console.log() from modal and cleanup main component

## 0.49.0

### Minor Changes

- e001992: Add: Definition List component

## 0.48.0

### Minor Changes

- Add Selector component

## 0.47.0

### Minor Changes

- 9632565: Change: Refactored `LogosAndVisuals` to render SVGs inline as JSX components instead of separate assets.

## 0.46.1

### Patch Changes

- Trim leading zeros in NumberInput

## 0.46.0

### Minor Changes

- Date Picker component

## 0.45.2

### Patch Changes

- InputField allow to use any native html type

## 0.45.1

### Patch Changes

- db5f562: Add: Internal component Visual

  [!!!]: Image property change: `type` → `renderType`

## 0.45.0

### Minor Changes

- Add NumberInput component

## 0.44.0

### Minor Changes

- Improvements and changes to `TextLink` component.

## 0.43.0

### Minor Changes

- Modal fix: Use of ::backdrop pseudoelement and provide SSR compatibility

## 0.42.0

### Minor Changes

- AddOnList component

## 0.41.0

### Minor Changes

- 217b74a: Add: Select component

## 0.40.0

### Minor Changes

- d6791e5: Add: PhoneBrand component

## 0.39.1

### Patch Changes

- e268b84: Fix: TextLink href tag

## 0.39.0

### Minor Changes

- Allow TextLinks in DefaultList items

## 0.38.0

### Minor Changes

- 86c957b: Add: DefaultCard component

## 0.37.0

### Minor Changes

- Add: PromotionalCard component

## 0.36.2

### Patch Changes

- Fixed Price component styling

## 0.36.1

### Patch Changes

- 666d791: Stack: GapSize updated:
  - Now supports configuration per breakpoint.
  - GapSize uses tokens instead of inline px value.

## 0.36.0

### Minor Changes

- aa41394: Add: RadioButton and RadioButtonGroup components

## 0.35.1

### Patch Changes

- Improvements and bugfixes for in page stepper

## 0.35.0

### Minor Changes

- Component fixes [Modal, Callout, DefaultList]

## 0.34.1

### Patch Changes

- Fixes: text input label for input id and the styles of the textlink rendered as button

## 0.34.0

### Minor Changes

- 81dbae4: Add: TextLink: `tag` and `stretched` properties.

  [!!!] MySection: `type` prop replaced with Grid's `columnSize` prop for more flexibility.

## 0.33.0

### Minor Changes

- Added App StoreButton

## 0.32.0

### Minor Changes

- Refactored Segmented tab for better SSR Support

## 0.31.0

### Minor Changes

- added LocalNavigation

## 0.30.0

### Minor Changes

- 0f7fcf5: Fix: hydration mismatch of ShopSection in nextjs

## 0.29.1

### Patch Changes

- Export GRW ListItem

## 0.29.0

### Minor Changes

- Refactored Main and StickyBar for better SSR support

## 0.28.1

### Patch Changes

- 1db29b0: Fix: moved Modal inside a createPortal wrapper

## 0.28.0

### Minor Changes

- Added font-weight to Paragraph component

## 0.27.0

### Minor Changes

- FIX: Snackbar set selector specificity

## 0.26.0

### Minor Changes

- Add: AFM banner component to foundations

## 0.25.4

### Patch Changes

- Refactor Toggle to serverside component

## 0.25.3

### Patch Changes

- 5545cff: Fix missing shopsection exports

## 0.25.1

### Patch Changes

- Add classname prop to the HorizontalStepper

## 0.25.0

### Minor Changes

- Fix in Legend: Move cursor pointer property to button instead of span

## 0.24.0

### Minor Changes

- Fixes on SegmentedTab styles and added cursor-pointer to the InputField (info icon)

## 0.23.2

### Patch Changes

- Fix: horizontal stepper bottom padding

## 0.23.1

### Patch Changes

- d050866: Fix: button label is wrapped in a span due to hydration issue in nextjs
  Removed:
  - button prop: `isHovered`
  - button prop: `isActive`

## 0.23.0

### Minor Changes

- Add iDEAL and iDIN Logo Component

## 0.22.1

### Patch Changes

- Fix: callout button, rendering of buttons

## 0.22.0

### Minor Changes

- cf18e04: Add List Component

## 0.21.1

### Patch Changes

- Modal heading margin was not functioning well in all contexts. Issue is fixed with this PR.

## 0.21.0

### Minor Changes

- Add: Status component

## 0.20.0

### Minor Changes

- Revert: cjs as format. Needs some more config to work properly

## 0.19.0

### Minor Changes

- ee4d5ff: Add: Addon component
  Add: Hide utility
  Add: Show utility

## 0.18.0

### Minor Changes

- Export horizontal step, missing part for the horizontal stepper

## 0.17.0

### Minor Changes

- 95796fd: Add: Stickybar component
- Add CommonJS exports from the bundle

## 0.16.0

### Minor Changes

- Export horizontal stepper from package

## 0.15.0

### Minor Changes

- Add: Footer component
- 6b3de40: Add: Toggle component

## 0.14.0

### Minor Changes

- ea41597: Add: Logos component

## 0.13.0

### Minor Changes

- dc432b9: Add Toggle component

## 0.12.0

### Patch Changes

- Add DefaultSticker component

## 0.11.0

### Minor Changes

- 0d6995c: Add: MySection component

## 0.10.0

### Minor Changes

- Add: ShopSection component

## 0.9.0

### Minor Changes

- Added DefaultList component

## 0.8.0

### Minor Changes

- Add: BadgeStatus

## 0.7.1

### Patch Changes

- Fix: rollback hook dependency on Icon

## 0.7.0

### Minor Changes

- Add: Accordion for web

## 0.6.0

### Minor Changes

- 9b512be: ActionButton for web

## 0.5.1

### Patch Changes

- Fix: Grid max-width added

## 0.5.0

### Minor Changes

- Added: CheckboxGroup component

## 0.4.0

### Minor Changes

- Newly available: ThemeProvider, PasswordStrength, Paragraph

## 0.3.0

### Minor Changes

- Added Grid component

## 0.2.0

### Minor Changes

- Divider for react-web

## 0.1.0

### Minor Changes

- 8162038: Add: Spinner
- 5888b70: Add: Paragraph component
  Add: Strong component
  Add: GlowGradient component
  Add: TextLink component
  Add: Button component
  Add: Stack component

## 0.0.1

### Patch Changes

- Add: CI / CD scripts for new setup
