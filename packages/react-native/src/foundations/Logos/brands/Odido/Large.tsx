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

const OdidoLarge = ({ fillOverride }: { fillOverride?: string }) => {
  return (
    <Svg width={158} height={42} viewBox="0 0 158 42" fill="none">
      <Rect
        width="100%"
        height="100%"
        fill={fillOverride ? undefined : "transparent"}
      />
      <G>
        {fillOverride ? (
          <Path
            d="M20.95 42c11.6 0 20.95-9.4 20.95-21S32.55 0 20.95 0 0 9.4 0 21s9.4 21 20.95 21zm116.1 0c11.6 0 20.95-9.4 20.95-21s-9.4-21-20.95-21C125.5 0 116.1 9.4 116.1 21s9.4 21 20.95 21zM65.7 21c0 11.6-9.4 21-20.95 21V0C56.35 0 65.7 9.4 65.7 21zm47.55 21c-11.6 0-20.95-9.4-20.95-21s9.35-21 20.95-21v42zM68.5 0h20.95v42H68.5V0z"
            fill="#fff"
          />
        ) : (
          <>
            <Path
              d="M20.95 42C32.55 42 41.9 32.6 41.9 21C41.9 9.4 32.55 0 20.95 0C9.35 0 0 9.4 0 21C0 32.6 9.4 42 20.95 42ZM137.05 42C148.65 42 158 32.6 158 21C158 9.4 148.6 0 137.05 0C125.5 0 116.1 9.4 116.1 21C116.1 32.6 125.5 42 137.05 42ZM65.7 21C65.7 32.6 56.3 42 44.75 42V0C56.35 0 65.7 9.4 65.7 21ZM113.25 42C101.65 42 92.3 32.6 92.3 21C92.3 9.4 101.65 0 113.25 0V42ZM68.5 0H89.45V42H68.5V0Z"
              fill="url(#pattern0_1260_2539)"
            />
            <Defs>
              <Pattern
                id="pattern0_1260_2539"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
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

export default OdidoLarge;
