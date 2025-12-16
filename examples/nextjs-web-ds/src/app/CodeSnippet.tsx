"use client";

import { Divider } from "@odido-portals/glow-react-web/divider";
import { Icon } from "@odido-portals/glow-react-web/icon";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { TextLink } from "@odido-portals/glow-react-web/text-link";
import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atelierEstuaryDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export type CodeSnippetProps = {
  code: string;
};

export const CodeSnippet = ({ code }: CodeSnippetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Stack gap="sm" alignItems="stretch">
      <Divider prominence="subtle" />
      <TextLink onClick={() => setIsVisible(!isVisible)}>
        <Icon name="code" size="sm" />
        {isVisible ? "Hide Code" : "Show Code"}
      </TextLink>
      {isVisible && (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter language="tsx" style={atelierEstuaryDark}>
            {code}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem",
              cursor: "pointer",
            }}
          >
            {copied ? "Copied!" : <Icon name="file" size="sm" />}
          </button>
        </div>
      )}
    </Stack>
  );
};
