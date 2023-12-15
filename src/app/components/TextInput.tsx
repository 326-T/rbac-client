import { useEnterKey } from "../hooks/useEnterKey";

export function TextInput({
  value,
  onChange,
  disabled,
  onEnter,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onEnter?: () => void;
}) {
  onEnter && useEnterKey(onEnter);

  return (
    <input
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="Type here"
      className="input input-bordered w-full"
    />
  );
}
