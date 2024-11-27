export const Textarea = ({ label, placeholder, value, onChange, error, maxLength }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg focus:outline-primary focus:ring-2"
        rows={5}
        maxLength={maxLength}
      />
      <div className="text-right text-gray-500 text-sm">{value.length}/{maxLength}</div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
  