import React from "react";
import { typography, TypographyVariant } from "../styles/typography";

import { cn } from "@/lib/utils";

type AllowedElements = Extract<
  keyof React.JSX.IntrinsicElements,
  "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
>;

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: AllowedElements;
  className?: string;
  variant?: TypographyVariant;
}

export const Text: React.FC<TextProps> = ({
  children,
  as: Component = "p",
  className,
  variant = "body1",
  ...props
}) => {
  const typographyClasses = typography[variant];

  return (
    <Component className={cn(typographyClasses, className)} {...props}>
      {children}
    </Component>
  );
};
