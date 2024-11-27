export const FileInput = ({ label, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type="file"
        multiple
        onChange={onChange}
        className="w-full border p-2 rounded-lg focus:outline-primary focus:ring-2"
      />
    </div>
  );
  