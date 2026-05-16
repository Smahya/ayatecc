import { cn } from "@/lib/utils";

export const SelectComponent = ({
  options,
  label,
  value,
  onChange,
  className,
}: {
  options: string[];
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1.5 text-sm font-medium text-ink">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={cn(
            "w-full bg-paper border border-mute-line rounded-lg py-2.5 px-3.5 pr-9 text-sm text-ink",
            "focus:outline-none focus:border-ink focus:ring-2 focus:ring-accent/15 transition-colors",
            className
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mute text-xs">
          ▾
        </span>
      </div>
    </div>
  );
};
