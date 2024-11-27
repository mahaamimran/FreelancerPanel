export const Select = ({ label, options, value, onChange }) => (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
  