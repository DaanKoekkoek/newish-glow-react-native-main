/**
 * @type {import('next').NextConfig}
 */
export const isStaticExport =
  process.env.STATIC_EXPORT === "true" && process.env.OUT_SERVE === "false";

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isStaticExport ? "/react/examples" : "",
  },
  output: "export",
  assetPrefix: isStaticExport
    ? "https://design.odido.nl/react/examples"
    : undefined,
  publicRuntimeConfig: {
    basePath: isStaticExport ? "/react/examples" : "",
  },
  basePath: isStaticExport ? "/react/examples" : undefined,
  trailingSlash: true, // Helps prevent routing issues in static hosting
};

export default nextConfig;
