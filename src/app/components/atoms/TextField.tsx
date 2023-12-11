export function TextField({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-control w-full">
      {label && <h6 className="label label-small">{label}</h6>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input p-1 w-full body-large border border-primary-400 rounded-md"
      />
    </label>
  );
}
