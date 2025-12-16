import { createElement } from "react";

type ReplaceTagProps = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
};

export const formatStringWithTag = (
  input?: string | null,
  { tag = "span", className }: ReplaceTagProps = {},
): React.ReactNode[] | null => {
  if (!input) return null;

  const regex = /\[(.*?)\]|\|/g;
  const parts: React.ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    const start = match.index;

    // Add plain text before the match
    if (start > lastIndex) {
      parts.push(input.slice(lastIndex, start));
    }

    if (match[0] === "|") {
      parts.push(createElement("br", { key: `br-${parts.length}` }));
    } else if (match[1]) {
      parts.push(
        createElement(tag, { key: `tag-${parts.length}`, className }, match[1]),
      );
    }

    lastIndex = start + match[0].length;
  }

  // Add remaining text
  if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  return parts;
};
