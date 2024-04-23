function CustomTextArea({
  value,
  onChange,
  rows,
  placeholder,
}: {
  value: string | number;
  onChange: (value: string) => void;
  rows: number;
  placeholder: string;
}) {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => handleChange(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
    ></textarea>
  );
}

export default CustomTextArea;
