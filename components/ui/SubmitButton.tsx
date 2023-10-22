"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./Button";
import { Oval } from "react-loader-spinner";
interface Props extends ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  wide?: boolean;
}

export function SubmitButton({
  loading = false,
  disabled = false,
  wide = false,
  children,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={loading || disabled || pending}
      className={` relative ${wide && "px-10 sm:px-16 min-w-[210px]"}`}
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
          wrapperClass={wide ? `absolute left-2` : ``}
          visible={pending}
        />
      }
      {pending && !wide ? "" : children}
    </Button>
  );
}
