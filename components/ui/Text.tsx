import { VariantProps, cva } from "class-variance-authority";
import React, {
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
} from "react";

const textStyles = cva([], {
  variants: {
    size: {
      small: "text-sm",
      medium: "text-md",
      large: "text-lg",
    },
    weight: {
      light: "font-light",
      normal: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
});

type TextStylesProps = VariantProps<typeof textStyles>;

export interface TextProps extends Omit<TextStylesProps, "size" | "weight"> {
  variant: `${NonNullable<TextStylesProps["size"]>}/${NonNullable<
    TextStylesProps["weight"]
  >}`;
  children?: ReactNode;
}

export function Text({ variant, children }: TextProps) {
  const [size, weight] = variant.split("/") as [
    TextStylesProps["size"],
    TextStylesProps["weight"]
  ];

  return (
    <>
      {React.Children.map(children, (child) =>
        addClassToNode(child, textStyles({ size, weight }))
      )}
    </>
  );
}

function addClassToNode(node: ReactNode, className: string): ReactNode {
  if (node == null) {
    node satisfies null | undefined;

    return node;
  }

  if (typeof node !== "object") {
    node satisfies string | number | boolean;

    // wrap in a span, somewhat arbitrary decision
    return <span className={className}>{node}</span>;
  }

  if ("props" in node) {
    node satisfies ReactElement | ReactPortal;

    const existing: unknown = node?.props?.className;
    if (existing && typeof existing === "string") {
      className = `${existing} ${className}`;
    }
    return React.cloneElement(node, { className });
  }

  if ("then" in node) {
    node satisfies PromiseLikeOfReactNode;

    return node.then((n) => addClassToNode(n, className));
  }

  node satisfies ReactFragment;

  // wrap in div, somewhat arbitrary decision
  return <div className={className}>{node}</div>;
}
