/**
 * Represents `AccordionPanel` properties.
 * @type {AccordionPanelProps}
 * @property {string} title - Sets the title of an accordion panel
 * @property {string | (React.ReactElement | React.ReactElement[])} [children] - The content of an accordion panel
 * @property {string} [testID] - Additional testID applied on the accordion panel
 */
export type AccordionPanelProps = {
  title: string;
  children: string | (React.ReactElement | React.ReactElement[]);
  testID?: string | undefined;
};

/**
 * Represents `Accordion` properties.
 * @type {AccordionProps}
 * @property {React.ReactNode} [children] - The content of an accordion, only accepts AccordionPanel
 * @property {number[]} [active] - The indices maps to panels. Opens a panel by default
 * @property {boolean} [multiple='true'] - Allow multiple panels to open up simultaneously
 * @property {boolean} [inverted='false'] - Inverted styling for the accordion
 * @property {string} [testID] - Additional testID applied on the accordion
 */
export type AccordionProps = {
  children: React.ReactNode;
  active?: number[];
  multiple?: boolean;
  inverted?: boolean;
  testID?: string | undefined;
  className?: string;
};

/**
 * Represents `AccordionContextProps` properties.
 * @type {AccordionContextProps}
 * @property {number} index - The index of the clicked panel
 * @property {boolean} active - Opens the panel if set to `true`
 * @property {activeHandler} activeHandler - Callback that sets a panel to active
 */
export type AccordionContextProps = {
  index: number;
  active: boolean;
  activeHandler: (id: number) => void;
};
