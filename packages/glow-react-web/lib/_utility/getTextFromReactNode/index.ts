import React from "react";

export function getTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return node.toString();
  }
  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).join("");
  }
  if (React.isValidElement(node) && node.props.children) {
    return getTextFromReactNode(node.props.children);
  }
  return "";
}
