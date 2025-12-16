import { Paragraph } from "foundations/Paragraph";

type PlaceholderProps = {
  className?: string;
};

export const Placeholder = ({ className }: PlaceholderProps) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
        width: "100%",
        height: "100%",
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: "column",
        alignSelf: "stretch",
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "dashed",
        boxSizing: "border-box",
      }}
    >
      <Paragraph>Replace me</Paragraph>
    </div>
  );
};
