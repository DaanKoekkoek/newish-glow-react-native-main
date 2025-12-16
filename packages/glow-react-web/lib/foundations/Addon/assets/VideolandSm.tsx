import { useId } from "react";

export const VideolandSm = (props: Record<string, string>) => {
  const id = useId();
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#clip${id})`}>
        <rect
          width="64"
          height="64.0002"
          transform="translate(0 0.00109863)"
          fill="#EB4B4E"
        />
        <path
          d="M25.5276 19.0011H17L32.0716 45.256L47.1433 19.0011H38.6157L32.0716 31.3446L25.5276 19.0011Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id={`clip${id}`}>
          <path
            d="M0 12.0011C0 5.37368 5.37258 0.00109863 12 0.00109863H52C58.6274 0.00109863 64 5.37368 64 12.0011V52.0013C64 58.6287 58.6274 64.0013 52 64.0013H12C5.37258 64.0013 0 58.6287 0 52.0013V12.0011Z"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
