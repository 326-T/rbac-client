import { FaCheck } from "react-icons/fa6";

export default function DoneButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn clickable-primary">
      <FaCheck />
    </button>
  );
}
