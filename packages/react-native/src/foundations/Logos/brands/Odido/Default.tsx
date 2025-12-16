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
    <Svg width={109} height={30} viewBox="0 0 109 30" fill="none">
      <Rect width="100%" height="100%" />
      <G fillRule="evenodd" clipRule="nonzero">
        {fillOverride ? (
          <Path
            d="M14.4528 29C22.4554 29 28.9057 22.5095 28.9057 14.5C28.9057 6.49048 22.4554 0 14.4528 0C6.45032 0 0 6.49048 0 14.5C0 22.5095 6.48481 29 14.4528 29ZM94.5471 29C102.55 29 109 22.5095 109 14.5C109 6.49048 102.515 0 94.5471 0C86.5791 0 80.0943 6.49048 80.0943 14.5C80.0943 22.5095 86.5791 29 94.5471 29ZM45.3247 14.5C45.3247 22.5095 38.8399 29 30.8718 29V0C38.8744 0 45.3247 6.49048 45.3247 14.5ZM78.1282 29C70.1256 29 63.6753 22.5095 63.6753 14.5C63.6753 6.49048 70.1256 0 78.1282 0V29ZM47.2563 0H61.7092V29H47.2563V0Z"
            fill="#fff"
          />
        ) : (
          <>
            <Path
              d="M14.453 29c8.002 0 14.453-6.49 14.453-14.5S22.456 0 14.453 0 0 6.49 0 14.5 6.485 29 14.453 29zm80.094 0C102.55 29 109 22.51 109 14.5S102.515 0 94.547 0C86.58 0 80.094 6.49 80.094 14.5S86.58 29 94.547 29zM45.325 14.5c0 8.01-6.485 14.5-14.453 14.5V0c8.002 0 14.453 6.49 14.453 14.5zM78.128 29c-8.002 0-14.453-6.49-14.453-14.5S70.125 0 78.128 0v29zM47.256 0H61.71v29H47.256V0z"
              fill="url(#pattern0_1260_2541)"
            />
            <Defs>
              <Pattern
                id="pattern0_1260_2541"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
              >
                <Use
                  xlinkHref="#b"
                  transform="matrix(0.000884956 0 0 0.00332621 0 -0.000595056)"
                />
              </Pattern>
              <Image id="b" width={1130} height={301} xlinkHref={glowOne} />
            </Defs>
          </>
        )}
      </G>
    </Svg>
  );
};

export default OdidoXl;
