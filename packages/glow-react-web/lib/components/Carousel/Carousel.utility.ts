/**
 * Updates the tabIndex of focusable elements within each slide to improve accessibility.
 *
 * React Slick renders all slides in the DOM but only shows a subset as active.
 * Without this, focusable elements (like buttons or links) in hidden slides remain keyboard-accessible,
 * violating accessibility guidelines (e.g., Axe DevTools rule: 'aria-hidden elements must not contain focusable elements').
 *
 * This function ensures that only elements in visible (`.slick-active`) slides are keyboard-focusable.
 *
 * It's throttled using `requestAnimationFrame` to avoid frequent and expensive DOM queries
 * when slide transitions or re-renders happen in rapid succession.
 */

let scheduled = false;

export const updateSlideFocusableElements = () => {
  if (scheduled) return;

  scheduled = true;

  requestAnimationFrame(() => {
    const slides = document.querySelectorAll(".slick-slide");
    slides.forEach((slide) => {
      const focusableElements = slide.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const isActive = slide.classList.contains("slick-active");

      focusableElements.forEach((el) => {
        el.setAttribute("tabIndex", isActive ? "0" : "-1");
      });
    });

    scheduled = false;
  });
};
