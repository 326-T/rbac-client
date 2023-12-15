import { IoIosMenu } from "react-icons/io";

export default function MenuButton({
  onClick,
  clicked,
}: {
  onClick: () => void;
  clicked: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-2
        rounded-lg
        ${clicked ? "bg-primary-400 text-white" : "clickable"}
      `}
    >
      <IoIosMenu className="icon-medium" />
    </button>
  );
}
