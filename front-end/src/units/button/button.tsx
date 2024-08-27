import React from "react";
import { StyleProps } from "../../constant";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    StyleProps {
  children: React.ReactNode;
  variant?: "default" | "warning";
  size?: "small" | "medium" | "big";
  outline?: boolean;
}

export const Button = React.memo(
  ({
    children,
    type = "submit",
    textColor = "#fff",
    className,
    animationProps = "hover:animate-jiggle",
    ...other
  }: ButtonProps): JSX.Element => {
    return (
      <button
        className={`${className}  text-${textColor} bg-brand  p-3 text-bg-brand text-lg ${animationProps} w-40`}
        type={type}
        {...other}
      >
        {children}
      </button>
    );
  }
);
