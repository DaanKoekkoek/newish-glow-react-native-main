"use server";
import styles from "./Modal.module.scss";

export default function SsrShowDialogScript() {
  // SSR workaround for modal opening backdrop. Because the only way to open with backdrop
  // is to call dialog.showModal() and this method is not available in SSR.
  // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#:~:text=Creating%20a%20modal%20dialog
  return (
    <script
      suppressHydrationWarning
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener("DOMContentLoaded", function() {
            const dialogs = document.querySelectorAll("[data-open]");
            dialogs.forEach((dialog) => {
              dialog.showModal();
              setTimeout(() => {
                dialog.classList.add(
                  "${styles["backdrop-opened"]}",
                  "${styles.open}"
                );
              });
            });
          });
        `,
      }}
    ></script>
  );
}
