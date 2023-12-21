export default function Select<T>({
  options,
  onSelect,
  getName,
  placeholder,
}: {
  options: T[]
  onSelect: (target: T) => void
  getName: (target: T) => string
  placeholder: string
}) {
  return (
    <select
      onChange={(e) => onSelect(options[parseInt(e.target.value)])}
      className='select select-bordered w-full max-w-xs'
    >
      <option disabled selected>
        {placeholder}
      </option>
      {options.map((option: T, index: number) => (
        <option key={index} value={index}>
          {getName(option)}
        </option>
      ))}
    </select>
  )
}
