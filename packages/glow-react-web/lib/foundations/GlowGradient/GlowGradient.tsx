import { useId } from "react";
import type {
  BaseSvgProps,
  LinearGradientProps,
  RadialGradientProps,
  GlowGradientProps,
  GradientSvgProps,
} from "./GlowGradient.types";
import { getGradientTransform, getGradientConfig } from "./GlowGradient.utils";
import styles from "./GlowGradient.module.scss";
import { tokenClassNames } from "_utility";

const CustomLinearGradient = ({
  id,
  x1,
  y1,
  x2,
  y2,
  stops,
  gradientUnits,
  gradientTransform,
  zoom,
}: LinearGradientProps) => (
  <linearGradient
    id={id}
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    gradientUnits={gradientUnits}
    gradientTransform={getGradientTransform(gradientTransform, zoom)}
  >
    {stops.map((stop, index) => (
      <stop
        key={index}
        offset={stop.offset}
        stopColor={stop.stopColor}
        stopOpacity={stop.stopOpacity}
      />
    ))}
  </linearGradient>
);

const CustomRadialGradient = ({
  id,
  cx,
  cy,
  r,
  gradientTransform,
  stops,
  zoom,
}: RadialGradientProps) => (
  <radialGradient
    id={id}
    cx={cx}
    cy={cy}
    r={r}
    gradientUnits="userSpaceOnUse"
    gradientTransform={getGradientTransform(gradientTransform, zoom)}
  >
    {stops.map((stop, index) => (
      <stop
        key={index}
        offset={stop.offset}
        stopColor={stop.stopColor}
        stopOpacity={stop.stopOpacity}
      />
    ))}
  </radialGradient>
);

const BaseSvg = ({
  preserveAspectRatio = "default",
  children,
}: BaseSvgProps) => {
  const aspectRatioMap: Record<
    NonNullable<BaseSvgProps["preserveAspectRatio"]>,
    string
  > = {
    default: "xMidYMid slice",
    meet: "xMidYMid meet",
    none: "none",
  };

  const aspectRatio = aspectRatioMap[preserveAspectRatio] ?? "none";

  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio={aspectRatio}
      viewBox="0 0 960 1080"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
};

const BaseGradient = ({
  radialGradientsProps,
  linearGradientProps,
  zoom,
}: GradientSvgProps) => {
  const uid = useId();

  return (
    <g>
      <g clipPath={`url(#clip${uid})`}>
        <path
          d="M960 0H0v1080h960V0z"
          fill={`url(#${linearGradientProps?.id}-${uid})`}
        />
        {radialGradientsProps?.map((radialProps, index) => (
          <path
            key={index}
            d="M960 0H0v1080h960V0z"
            fill={`url(#${radialProps.id}-${uid})`}
          />
        ))}
      </g>
      <defs>
        {linearGradientProps &&
          (() => {
            const { id, ...rest } = linearGradientProps;
            return (
              <CustomLinearGradient id={`${id}-${uid}`} zoom={zoom} {...rest} />
            );
          })()}
        {radialGradientsProps?.map((radialProps, index) => {
          const { id, ...rest } = radialProps;
          return (
            <CustomRadialGradient
              key={index}
              {...rest}
              zoom={zoom}
              id={`${id}-${uid}`}
            />
          );
        })}
        <clipPath id={`clip${uid}`}>
          <path fill="#fff" d="M0 0H960V1080H0z" />
        </clipPath>
      </defs>
    </g>
  );
};

const GradientSvg = ({ preserveAspectRatio, ...props }: GradientSvgProps) => (
  <BaseSvg preserveAspectRatio={preserveAspectRatio}>
    <BaseGradient {...props} />
  </BaseSvg>
);

export const GlowGradient = ({
  as: Tag = "div",
  zIndex = 0,
  palette = "default",
  style,
  type,
  mask = false,
  className,
  enableHover = false,
  preserveAspectRatio = "default",
  zoom,
}: GlowGradientProps) => {
  const { config, glow } = getGradientConfig(palette, type);

  const { linearGradientProps, radialGradientProps } = config;

  return mask ? (
    <BaseGradient
      linearGradientProps={linearGradientProps ?? undefined}
      radialGradientsProps={radialGradientProps ?? undefined}
      zoom={zoom}
    />
  ) : (
    <Tag
      className={tokenClassNames(
        styles,
        "glow-gradient",
        styles[glow],
        className,
        {
          [styles["no-hover"]]: !enableHover,
        },
      )}
      style={{ ...style, zIndex: zIndex - 1 }}
      data-testid="glow-gradient"
      aria-hidden="true"
    >
      <GradientSvg
        preserveAspectRatio={preserveAspectRatio}
        linearGradientProps={linearGradientProps ?? undefined}
        radialGradientsProps={radialGradientProps ?? undefined}
        zoom={zoom}
      />
    </Tag>
  );
};
