"use client";

import React, { InputHTMLAttributes, useState } from "react";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeSlashIcon from "@/assets/icons/eye-slash.svg";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  hint,
  error,
  prefixElement,
  suffixElement,
  type = "text",
  className = "",
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center justify-between mb-1.5 text-sm font-medium text-ink"
        >
          <span>{label}</span>
          {error && (
            <span className="text-xs font-normal text-danger">{error}</span>
          )}
        </label>
      )}

      <div
        className={cn(
          "relative flex items-center bg-paper rounded-lg border transition-colors",
          error
            ? "border-danger"
            : "border-mute-line focus-within:border-ink focus-within:ring-2 focus-within:ring-accent/15"
        )}
      >
        {prefixElement && (
          <span className="pl-3 text-mute flex items-center">
            {prefixElement}
          </span>
        )}

        <input
          id={inputId}
          {...props}
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "w-full bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-mute/70",
            "focus:outline-none",
            isPassword || suffixElement ? "pr-10" : "",
            className
          )}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 inset-y-0 px-3 flex items-center text-mute hover:text-ink transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon width={18} height={18} />
            ) : (
              <EyeIcon width={18} height={18} />
            )}
          </button>
        )}

        {suffixElement && !isPassword && (
          <span className="absolute right-0 inset-y-0 px-3 flex items-center text-mute">
            {suffixElement}
          </span>
        )}
      </div>

      {hint && !error && <p className="mt-1.5 text-xs text-mute">{hint}</p>}
    </div>
  );
};
