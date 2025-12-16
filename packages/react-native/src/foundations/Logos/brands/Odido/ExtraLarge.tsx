import React from "react";
import {
  Svg,
  Path,
  Rect,
  G,
  Defs,
  Pattern,
  Image,
  Use,
} from "react-native-svg";

import glowOne from "../../../../../assets/images/glowOne.png";

const OdidoXl = ({ fillOverride }: { fillOverride?: string }) => {
  return (
    <Svg width={316} height={84} viewBox="0 0 316 84" fill="none">
      <Rect
        width="100%"
        height="100%"
        fill={fillOverride ? undefined : "transparent"}
      />
      <G fillRule="evenodd" clipRule="evenodd">
        {fillOverride ? (
          <Path
            fill="#fff"
            d="M41.9 84c23.2 0 41.9-18.8 41.9-42S65.1 0 41.9 0 0 18.8 0 42s18.8 42 41.9 42Zm232.2 0c23.2 0 41.9-18.8 41.9-42S297.2 0 274.1 0c-23.1 0-41.9 18.8-41.9 42s18.8 42 41.9 42ZM131.4 42c0 23.2-18.8 42-41.9 42V0c23.2 0 41.9 18.8 41.9 42Zm95.1 42c-23.2 0-41.9-18.8-41.9-42s18.7-42 41.9-42v84ZM137 0h41.9v84H137V0Z"
          />
        ) : (
          <>
            <Path
              fill="url(#a)"
              d="M41.9 84c23.2 0 41.9-18.8 41.9-42S65.1 0 41.9 0 0 18.8 0 42s18.8 42 41.9 42Zm232.2 0c23.2 0 41.9-18.8 41.9-42S297.2 0 274.1 0c-23.1 0-41.9 18.8-41.9 42s18.8 42 41.9 42ZM131.4 42c0 23.2-18.8 42-41.9 42V0c23.2 0 41.9 18.8 41.9 42Zm95.1 42c-23.2 0-41.9-18.8-41.9-42s18.7-42 41.9-42v84ZM137 0h41.9v84H137V0Z"
            />
            <Defs>
              <Pattern
                id="a"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
              >
                <Use
                  xlinkHref="#b"
                  transform="matrix(0.000884956 0 0 0.00332912 0 -0.00103245)"
                />
              </Pattern>
              <Image id="b" width={1135} height={301} xlinkHref={glowOne} />
            </Defs>
          </>
        )}
      </G>
    </Svg>
  );
};

export default OdidoXl;
