import "@globals/layers.css";
import "@globals/reset.css";
import styles from "./Main.module.scss";
import type { MainProps } from "./Main.types";
import { tokenClassNames } from "_utility";

export const Main = ({ header, footer, children }: MainProps) => {
  return (
    <>
      {!!header && header}
      <main id="main-content" className={tokenClassNames(styles, "main")}>
        {children}
      </main>
      {!!footer && footer}
    </>
  );
};
