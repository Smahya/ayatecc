import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Refresh from "@/assets/icons/refresh.svg";

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
    "px-4 py-2 rounded-lg text-sm font-inter font-medium transition-all duration-200 flex items-center gap-2 h-max w-max";

  const variants = {
    primary: cn(
      "bg-blue-500 text-white",
      "hover:bg-blue-700 hover:ring-2 hover:ring-blue-200 hover:ring-offset-2",
      "active:bg-blue-800",
      "disabled:opacity-50 disabled:hover:ring-0 disabled:hover:ring-offset-0"
    ),
    secondary: cn(
      "bg-neutral-100 dark:bg-neutral-500 text-neutral-900 dark:text-neutral-200",
      "hover:bg-neutral-200 hover:ring-2 hover:ring-neutral-200 hover:ring-offset-2",
      "active:bg-neutral-300",
      "disabled:opacity-50 disabled:hover:ring-0 disabled:hover:ring-offset-0"
    ),
    border: cn(
      "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-200 dark:border-neutral-800",
      "hover:bg-neutral-50 hover:ring-2 hover:ring-neutral-200 hover:ring-offset-2 dark:hover:bg-neutral-800 dark:hover:ring-neutral-800",
      "active:bg-neutral-100 dark:active:bg-neutral-800",
      "disabled:opacity-50 disabled:border-neutral-100 disabled:hover:ring-0 disabled:hover:ring-offset-0"
    ),
    link: cn(
      "bg-transparent text-blue-500 p-0 text-underline",
      "hover:bg-transparent hover:ring-0 hover:ring-offset-0",
      "active:bg-transparent"
    ),
    destructive: cn(
      "bg-red-500 text-white",
      "hover:bg-red-700 hover:ring-2 hover:ring-red-200 hover:ring-offset-2",
      "active:bg-red-800"
    ),
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className, {
        "w-full flex justify-center items-center": block,
        "disabled:cursor-not-allowed": disabled,
      })}
      disabled={disabled}
      type={type}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {loading && <Refresh className="animate-spin" />}
      {children}
    </button>
  );
};
