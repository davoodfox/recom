import { ReactNode, ComponentProps } from "react";

type DividerProps = ComponentProps<"div">;

export default function Divider({ children, className }: DividerProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="flex-grow border-t border-gray-200"></div>
      <span className="flex-shrink mx-2">{children}</span>
      <div className="flex-grow border-t border-gray-200"></div>
    </div>
  );
}
