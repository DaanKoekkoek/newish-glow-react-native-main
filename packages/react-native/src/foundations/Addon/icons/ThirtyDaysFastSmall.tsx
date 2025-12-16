import React, { useId } from "react";
import { Svg, Path, Defs, ClipPath, G } from "react-native-svg";

const ThirtyDaysFastSmall = ({ fillOverride }: { fillOverride?: string }) => {
  const clipPathID = useId();

  return (
    <Svg viewBox="0 0 64 64" fill="none">
      <G clipPath={`url(#${clipPathID})`}>
        <Path
          transform="translate(0 .001)"
          fill={fillOverride ? "transparent" : "#8F85F9"}
          d="M0 0H64V64.0002H0z"
        />
        <Path
          d="M32 19.965c-7.84 0-14.21 6.38-14.21 14.22 0 3.56 1.34 6.97 3.76 9.61l.22.24h20.46l.22-.24a14.15 14.15 0 003.76-9.61c0-7.84-6.38-14.21-14.21-14.21v-.01zm9.57 22.57H22.43a12.674 12.674 0 01-3.15-8.35c0-7.01 5.7-12.71 12.71-12.71 7.01 0 12.71 5.7 12.71 12.71 0 3.07-1.12 6.03-3.15 8.35h.02zm-18.51-8.33c0 1.07.2 2.13.59 3.16l-1.4.53c-.45-1.2-.68-2.44-.68-3.69 0-5.75 4.68-10.43 10.43-10.43 1.74 0 3.46.44 4.97 1.26l-.72 1.32a8.898 8.898 0 00-4.26-1.08c-4.93 0-8.93 4.01-8.93 8.93zm16.29-7.28l1.06 1.06-7.89 7.89-1.06-1.06 7.89-7.89z"
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

export default ThirtyDaysFastSmall;
