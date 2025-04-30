import { HTMLAttributes } from "react";
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body1"
  | "body2"
  | "small";
type className = HTMLAttributes<HTMLElement>["className"];

export const typography: Record<TypographyVariant, className> = {
  h1: "font-bold text-2xl leading-[120%] tracking-[-0.5px]", // Text Preset 1
  h2: "font-bold text-xl leading-[120%] tracking-[-0.5px]", // Text Preset 2
  h3: "font-semibold text-base leading-[120%] tracking-[-0.3px]", // Text Preset 3
  body1: "font-medium text-sm leading-[120%] tracking-[-0.2px]", // Text Preset 4
  body2: "font-normal text-sm leading-[120%] tracking-[-0.2px]", // Text Preset 5
  small: "font-normal text-xs leading-[120%] tracking-[-0.2px]", // Text Preset 6
} as const;
