export const Input = ({ type, placeholder, value, onChange, error }) => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
  