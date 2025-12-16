import classNames, { Argument } from "classnames";

type Styles = Record<string, string>;

/**
 * Merges all token-* classes from the SCSS module with an optional main component class,
 * and allows additional conditional or extra classes.
 *
 * Example:
 * tokenClassNames(
 *  // Contains all the styles coming from an imported style module.
 *  styles,
 *  // Top-level selector.
 *  "component",
 *  // Other styling, works the same as classNames.
 *  styles["extra-styling"],
 *  {
 *    // Conditional styling, works the same as classNames.
 *    [styles["conditional-styling"]]: condition
 *   }
 * )
 */
export function tokenClassNames(
  styles: Styles,
  componentClass?: string,
  ...extra: Argument[]
) {
  const tokenClasses: string[] = Object.entries(styles)
    .filter(([key]) => key.startsWith("token-"))
    .map(([, value]) => value);

  if (componentClass && styles[componentClass]) {
    tokenClasses.push(styles[componentClass]);
  }

  return classNames(...tokenClasses, ...extra);
}
