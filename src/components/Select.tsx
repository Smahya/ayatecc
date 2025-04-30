export const SelectComponent = ({
  options,
  label,
  value,
  onChange,
}: {
  options: string[];
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="w-full py-[9.3px] px-2 border-gray-300 rounded-lg border bg-white focus:ring-2 focus:ring-neutral-500 focus:border-neutral-950 focus:ring-offset-2 transition-colors"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
