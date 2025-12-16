import { useId, useMemo } from "react";
import { useGenerateClassNames } from "_global-hooks";
import { Emerge } from "_internals/Animation";
import type { LogosProps } from "../Logos.types";
import styles from "./AnimatedLogo.module.scss";
import logoStyles from "../Logos.module.scss";
import { Visible } from "utilities/Visibility";
import { tokenClassNames } from "_utility";
import { EmergeProps } from "_internals/Animation/Emerge";

type AnimatedLogosProps = Omit<LogosProps, "brand"> & {
  videoSrc?: string;
  autoplay?: boolean;
  loop?: boolean;
  open?: boolean;
};

export const AnimatedLogo = ({
  variant = "default",
  className,
  testID = "animated-logos",
  videoSrc,
  size = "default",
  autoplay = true,
  loop = true,
  open = false,
}: AnimatedLogosProps) => {
  const id = useId();
  const sizeClass = useGenerateClassNames(logoStyles, size, "logo-size");
  const shapes = [
    // first O
    "M14.4528 29C22.4554 29 28.9057 22.5095 28.9057 14.5C28.9057 6.49048 22.4554 0 14.4528 0C6.45032 0 0 6.49048 0 14.5C0 22.5095 6.48481 29 14.4528 29Z",
    // first D
    "M45.3247 14.5C45.3247 22.5095 38.8399 29 30.8718 29V0C38.8744 0 45.3247 6.49048 45.3247 14.5Z",
    // I
    "M47.2563 0H61.7092V29H47.2563V0Z",
    // second D (reversed)
    "M78.1282 29C70.1256 29 63.6753 22.5095 63.6753 14.5C63.6753 6.49048 70.1256 0 78.1282 0V29Z",
    // second O
    "M94.5471 29C102.55 29 109 22.5095 109 14.5C109 6.49048 102.515 0 94.5471 0C86.5791 0 80.0943 6.49048 80.0943 14.5C80.0943 22.5095 86.5791 29 94.5471 29Z",
  ];

  const shapesDesktop = [
    // first O
    "M20.95 42 C32.55 42 41.9 32.6 41.9 21 C41.9 9.4 32.55 0 20.95 0 C9.35 0 0 9.4 0 21 C0 32.6 9.4 42 20.95 42Z",
    // first D
    "M65.7 21 C65.7 32.6 56.3 42 44.75 42 V0 C56.35 0 65.7 9.4 65.7 21Z",
    // I
    "M68.5 0 H89.45 V42 H68.5 V0Z",
    // second D (reversed)
    "M113.25 42 C101.65 42 92.3 32.6 92.3 21 C92.3 9.4 101.65 0 113.25 0 V42Z",
    // second O
    "M137.05 42 C148.65 42 158 32.6 158 21 C158 9.4 148.6 0 137.05 0 C125.5 0 116.1 9.4 116.1 21 C116.1 32.6 125.5 42 137.05 42Z",
  ];

  const emergeProps = useMemo<EmergeProps>(
    () => ({
      as: "clipPath",
      animation: "fast",
      centerIndex: 2,
      open,
      children: [],
    }),
    [open],
  );

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(logoStyles, "logos", sizeClass, className)}
    >
      <div className={styles["logo-svg"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <Visible as="defs" above="desktop">
            <Emerge id={`clip-${id}-desktop`} {...emergeProps}>
              {shapesDesktop.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </Emerge>
          </Visible>
          <Visible as="defs" below="desktop">
            <Emerge id={`clip-${id}-mobile`} {...emergeProps}>
              {shapes.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </Emerge>
          </Visible>
        </svg>

        {variant === "inverted" ? (
          <div
            className={styles["logo-inverted"]}
            style={{
              "--clip-path-desktop": `url(#clip-${id}-desktop)`,
              "--clip-path-mobile": `url(#clip-${id}-mobile)`,
            }}
          ></div>
        ) : (
          <video
            src={videoSrc}
            autoPlay={autoplay}
            muted
            loop={loop}
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className={styles["logo-video"]}
            style={{
              "--clip-path-desktop": `url(#clip-${id}-desktop)`,
              "--clip-path-mobile": `url(#clip-${id}-mobile)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
