"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./Button";
import { Oval, TailSpin } from "react-loader-spinner";
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
    <Button
      type="submit"
      disabled={loading || disabled || pending}
      className="px-10 sm:px-16 relative"
      {...props}
    >
      {
        <Oval
          height="20"
          width="20"
          color="#fff"
          ariaLabel="tail-spin-loading"
          strokeWidth={4}
          strokeWidthSecondary={4}
          wrapperStyle={{}}
          wrapperClass="absolute left-2"
          visible={pending}
        />
      }
      {children}
    </Button>
  );
}
