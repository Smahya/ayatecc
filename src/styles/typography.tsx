import { HTMLAttributes } from "react";
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body1"
  | "body2"
  | "small"
  | "eyebrow";
type className = HTMLAttributes<HTMLElement>["className"];

export const typography: Record<TypographyVariant, className> = {
  h1: "font-sans font-semibold text-2xl sm:text-3xl tracking-tight text-ink",
  h2: "font-sans font-semibold text-xl tracking-tight text-ink",
  h3: "font-sans font-medium text-lg tracking-tight text-ink",
  body1: "font-sans text-base text-ink",
  body2: "font-sans text-sm text-ink-60",
  small: "font-sans text-xs text-mute",
  eyebrow: "font-sans text-xs font-medium text-mute uppercase tracking-wide",
} as const;
