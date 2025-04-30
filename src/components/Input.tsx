"use client";

import React, { InputHTMLAttributes, useState } from "react";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeSlashIcon from "@/assets/icons/eye-slash.svg";
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
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {prefixElement && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {prefixElement}
          </div>
        )}

        <input
          {...props}
          type={isPassword && showPassword ? "text" : type}
          className={`
            w-full rounded-lg border
            bg-white dark:bg-neutral-950
            ${
              error
                ? "border-red-500"
                : "border-gray-300 dark:border-neutral-600"
            }
            ${prefixElement ? "pl-10" : "pl-3"}
            ${suffixElement || isPassword ? "pr-12" : "pr-3"}
            py-2
            focus:ring-2
            ${
              error
                ? "focus:ring-red-200 focus:border-red-500"
                : "focus:ring-neutral-500 focus:border-neutral-950 focus:ring-offset-2"
            }
            focus:outline-none
            transition-colors
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="text-neutral-500" />
            ) : (
              <EyeIcon className="text-neutral-500" />
            )}
          </button>
        )}

        {suffixElement && !isPassword && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {suffixElement}
          </div>
        )}
      </div>

      {(hint || error) && (
        <p
          className={`mt-1 text-sm ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
};
