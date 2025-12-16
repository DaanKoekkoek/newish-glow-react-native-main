import React, { useId } from "react";
import { Svg, Path, Defs, ClipPath, G } from "react-native-svg";

const ThirtyDaysBasicSmall = ({ fillOverride }: { fillOverride?: string }) => {
  const clipPathID = useId();

  return (
    <Svg viewBox="0 0 64 64" fill="none">
      <G clipPath={`url(#${clipPathID})`}>
        <Path
          transform="translate(0 .001)"
          fill={fillOverride ? "transparent" : "#AAA3FA"}
          d="M0 0H64V64.0002H0z"
        />
        <Path
          d="M32 19.966c-7.84 0-14.21 6.38-14.21 14.22 0 3.56 1.34 6.97 3.76 9.61l.22.24h20.46l.22-.24a14.15 14.15 0 003.76-9.61c0-7.84-6.38-14.21-14.21-14.21v-.01zm9.57 22.57H22.43a12.674 12.674 0 01-3.15-8.35c0-7.01 5.7-12.71 12.71-12.71 7.01 0 12.71 5.7 12.71 12.71 0 3.08-1.12 6.03-3.15 8.35h.02zm-13.34-18.06l.54 1.4c-3.42 1.32-5.71 4.67-5.71 8.33 0 1.07.2 2.13.59 3.16l-1.4.53c-.45-1.2-.68-2.44-.68-3.69 0-4.28 2.68-8.19 6.67-9.73h-.01zm3.02-.36h1.5v11.16h-1.5v-11.16z"
          fill={fillOverride || "black"}
        />
      </G>
      <Defs>
        <ClipPath id={clipPathID}>
          <Path
            d="M0 12.001c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.628-5.373 12-12 12H12c-6.627 0-12-5.372-12-12v-40z"
            fill={fillOverride || "white"}
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ThirtyDaysBasicSmall;
