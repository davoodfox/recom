"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./Button";
interface Props extends ButtonProps {
  loading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({
  loading = false,
  disabled = false,
  children,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={loading || disabled || pending} {...props}>
      {children}
    </Button>
  );
}
