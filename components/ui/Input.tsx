import { ComponentProps, forwardRef } from "react";
import { FieldError } from "./Form";
import { Text } from "./Text";
import { cva, VariantProps } from "class-variance-authority";
import { SubmitButton } from "./SubmitButton";

const InputStyles = cva(
  "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 w-full px-4 py-2 border border-gray-500 focus:border-brand-600 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20",
  {
    variants: {
      sharp: {
        false: "rounded-md",
      },
      withButton: {
        true: "flex-grow border-none",
      },
    },
    defaultVariants: {
      sharp: false,
      withButton: false,
    },
  }
);

const containerStyles = cva("", {
  variants: {
    withButton: {
      true: "flex justify-between items-end w-full rounded-md overflow-hidden border border-gray-500 focus-within:border-brand-600 focus-within:ring-1 focus-within:ring-brand-600",
    },
  },
  defaultVariants: {
    withButton: false,
  },
});

interface Props
  extends ComponentProps<"input">,
    VariantProps<typeof InputStyles> {
  label: string;
  withButton?: boolean;
  buttonLoading?: boolean;
  buttonDisabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    label,
    sharp = false,
    type = "text",
    withButton = false,
    buttonLoading,
    buttonDisabled,
    className,
    ...props
  },
  ref
) {
  return (
    <label>
      <Text variant="medium/light">
        <div className="pb-1">{label}</div>
      </Text>
      <div className={containerStyles({ withButton })}>
        <input
          className={InputStyles({ sharp, withButton, className })}
          type={type}
          ref={ref}
          {...props}
        />
        {withButton && (
          <SubmitButton sharp loading={buttonLoading} disabled={buttonDisabled}>
            Search
          </SubmitButton>
        )}
      </div>

      <FieldError name={props.name} />
    </label>
  );
});
