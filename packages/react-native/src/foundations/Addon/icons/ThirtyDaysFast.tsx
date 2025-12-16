import React, { useId } from "react";
import { Svg, Path, Defs, ClipPath, G } from "react-native-svg";

const ThirtyDaysFast = ({ fillOverride }: { fillOverride?: string }) => {
  const clipPathID = useId();

  return (
    <Svg viewBox="0 0 310 155" fill="none">
      <G clipPath={`url(#${clipPathID})`}>
        <Path
          transform="translate(0 .001)"
          fill={fillOverride ? "transparent" : "#8F85F9"}
          d="M0 0H310V155H0z"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M197.751 84.188c0 11.275-4.338 21.9-12.225 29.925v-.013l-.463.462h-60.125l-.462-.462c-7.888-8.013-12.225-18.65-12.225-29.925 0-23.575 19.175-42.737 42.75-42.737s42.75 19.174 42.75 42.75zm-82.388-.013c0 10.237 3.863 19.9 10.888 27.275h57.475c7.025-7.375 10.887-17.038 10.887-27.275 0-21.85-17.775-39.625-39.625-39.625s-39.625 17.775-39.625 39.625zm39.638-29c11.125 0 20.8 6.3 25.662 15.525h-3.612c-4.563-7.425-12.725-12.4-22.05-12.4-14.263 0-25.875 11.6-25.875 25.875 0 5.112 1.475 10.025 4.25 14.225l-2.613 1.725a28.905 28.905 0 01-4.762-15.95c0-15.987 13.012-29 29-29zm25.875 29c0 5.1-1.463 10.025-4.25 14.225l2.612 1.725c3.113-4.713 4.763-10.225 4.763-15.95h-3.125zM169.325 77.8a1.996 1.996 0 012.3.55c.575.688.613 1.638.15 2.363L162 96.263a7.932 7.932 0 01-12.837.938 7.932 7.932 0 01.975-11.188 8.098 8.098 0 012.175-1.3l17.012-6.913z"
          fill={fillOverride || "black"}
        />
      </G>
      <Defs>
        <ClipPath id={clipPathID}>
          <Path
            d="M0 12.001c0-6.627 5.373-12 12-12h286c6.627 0 12 5.373 12 12v131c0 6.628-5.373 12-12 12H12c-6.627 0-12-5.372-12-12v-131z"
            fill={fillOverride || "white"}
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ThirtyDaysFast;
