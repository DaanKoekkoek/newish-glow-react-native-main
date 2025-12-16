import React from "react";
import { Svg, Path, Rect } from "react-native-svg";

const VideolandSmall = ({ fillOverride }: { fillOverride?: string }) => {
  return (
    <Svg viewBox="0 0 64 64" fill="none">
      <Rect
        width="100%"
        height="100%"
        transform="translate(0 0.000366211)"
        fill={fillOverride ? "transparent" : "#EB4B4E"}
      />
      <Path
        d="M25.5276 19.0004H17L32.0716 45.2553L47.1433 19.0004H38.6157L32.0716 31.3439L25.5276 19.0004Z"
        fill={fillOverride || "white"}
      />
    </Svg>
  );
};

export default VideolandSmall;
