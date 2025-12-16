import type { BundleWidgetProps } from "./BundleWidget.types";

const bundleTypeUnitMap: Omit<
  Record<Exclude<BundleWidgetProps["bundleType"], "internet-speed">, string>,
  "internet-speed"
> = {
  data: "GB",
  minutes: "MIN",
  "minutes+sms": "MIN/SMS",
  sms: "SMS",
};

export const getUnitForBundleType = (
  bundleType: BundleWidgetProps["bundleType"],
  variant?: BundleWidgetProps["variant"],
): string => {
  if (bundleType === "internet-speed") {
    return variant === "Gbit" ? "Gbit/s" : "Mbit/s";
  }
  return bundleTypeUnitMap[bundleType];
};
