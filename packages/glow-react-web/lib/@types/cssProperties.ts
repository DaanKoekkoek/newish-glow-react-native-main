// Extend CSSProperties interface to allow passing css variables

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export {};
