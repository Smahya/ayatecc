import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "border" | "link" | "destructive";
  children: ReactNode;
  icon?: ReactNode;
  block?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  variant = "primary",
  children,
  className,
  icon,
  disabled,
  block,
  loading,
  type = "button",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-5 h-11 rounded-lg font-sans text-sm font-medium transition-all duration-150 select-none";

  const variants = {
    primary: cn(
      "bg-ink text-paper",
      "hover:bg-ink-80",
      "active:translate-y-px",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
    secondary: cn(
      "bg-paper text-ink border border-mute-line",
      "hover:border-ink/30 hover:bg-canvas",
      "active:translate-y-px",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
    border: cn(
      "bg-paper text-ink border border-mute-line",
      "hover:border-ink/30",
      "active:translate-y-px",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
    link: cn(
      "bg-transparent text-accent underline-offset-4 hover:underline h-auto px-0",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ),
    destructive: cn(
      "bg-danger text-paper",
      "hover:bg-danger/90",
      "active:translate-y-px"
    ),
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className, {
        "w-full": block,
      })}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <span
          className="inline-block w-3.5 h-3.5 rounded-full border-2 border-current border-r-transparent animate-spin"
          aria-hidden
        />
      )}
      {icon && !loading && (
        <span className="inline-flex w-4 h-4 items-center justify-center">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
