import React, { useId } from "react";
import { Svg, Path, Rect, Circle, ClipPath, Defs, G } from "react-native-svg";

const PodimoSmall = ({ fillOverride }: { fillOverride?: string }) => {
  const clipPathID = useId();

  return (
    <Svg viewBox="0 0 64 64" fill="none">
      <G clipPath={`url(#${clipPathID})`}>
        <Rect
          width="64"
          height="64.0002"
          transform="translate(0 0.000732422)"
          fill={fillOverride ? "transparent" : "#8249FF"}
        />
        <Circle
          cx="24.72"
          cy="45.961"
          r="6.72"
          fill={fillOverride || "#EAEAEA"}
        />
        <Path
          d="M18.1602 35.8678V15.0809C18.1602 14.0205 19.0216 13.1547 20.0725 13.2963C24.6629 13.9148 31.3496 16.8036 31.2802 25.0009C31.2802 33.6531 24.7966 36.7255 20.2279 37.6584C19.125 37.8836 18.1602 36.9934 18.1602 35.8678Z"
          fill={fillOverride || "#EAEAEA"}
        />
        <Path
          d="M33.6797 42.9009V14.9207C33.6797 13.8603 34.5388 12.9947 35.5922 13.116C41.303 13.7731 50.0878 17.4094 49.999 28.2782C49.999 39.7711 41.4524 43.6339 35.7559 44.7097C34.6475 44.919 33.6797 44.029 33.6797 42.9009Z"
          fill={fillOverride || "#EAEAEA"}
        />
      </G>
      <Defs>
        <ClipPath id={clipPathID}>
          <Path
            d="M0 12.0007C0 5.37331 5.37258 0.000732422 12 0.000732422H52C58.6274 0.000732422 64 5.37332 64 12.0007V52.001C64 58.6284 58.6274 64.0009 52 64.0009H12C5.37258 64.0009 0 58.6284 0 52.0009V12.0007Z"
            fill={fillOverride || "white"}
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PodimoSmall;
