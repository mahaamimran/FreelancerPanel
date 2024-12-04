export const Textarea = ({ label, placeholder, value, onChange, error, maxLength }) => {
    const isMaxLengthReached = value.length >= maxLength;
  
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full p-3 border rounded-lg focus:outline-primary focus:ring-2 ${
            isMaxLengthReached ? "border-red-500" : "border-gray-300"
          }`}
          rows={5}
          maxLength={maxLength}
        />
        <div
          className={`text-right text-sm ${
            isMaxLengthReached ? "text-red-500" : "text-gray-500"
          }`}
        >
          {value.length}/{maxLength}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  };
  