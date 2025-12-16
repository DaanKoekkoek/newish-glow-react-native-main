import React, { useId } from "react";
import { Svg, Path, Defs, ClipPath, G } from "react-native-svg";

const ThirtyDaysFastestSmall = ({
  fillOverride,
}: {
  fillOverride?: string;
}) => {
  const clipPathID = useId();

  return (
    <Svg viewBox="0 0 64 64" fill="none">
      <G clipPath={`url(#${clipPathID})`}>
        <Path
          transform="translate(0 .001)"
          fill={fillOverride ? "transparent" : "#7466F8"}
          d="M0 0H64V64.0002H0z"
        />
        <Path
          d="M32 19.97c-7.84 0-14.21 6.37-14.21 14.21 0 3.56 1.34 6.97 3.76 9.61l.22.24h20.46l.22-.24a14.15 14.15 0 003.76-9.61c0-7.84-6.38-14.21-14.21-14.21zm9.57 22.56H22.43a12.693 12.693 0 01-3.15-8.35c0-7.01 5.7-12.71 12.71-12.71 7.01 0 12.71 5.7 12.71 12.71 0 3.07-1.12 6.03-3.15 8.35h.02zM23.06 34.2c0 1.07.2 2.13.59 3.16l-1.4.53c-.45-1.19-.68-2.44-.68-3.69 0-5.75 4.68-10.43 10.43-10.43 4.88 0 9.06 3.31 10.16 8.06l-1.46.34a8.895 8.895 0 00-8.7-6.9c-4.93 0-8.93 4.01-8.93 8.93h-.01zm19.46.39v1.5H31.99v-1.5h10.53z"
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

export default ThirtyDaysFastestSmall;
