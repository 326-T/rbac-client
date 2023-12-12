import { MessageContent } from "@/app/types/MessageContent";
import { FaCheckCircle } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

export default function MessageCard({ content }: { content: MessageContent }) {
  const renderIcon = (content: MessageContent) => {
    switch (content.theme) {
      case "ERROR":
        return <MdOutlineError className="w-8 h-8 text-red-500" />;
      case "WARNING":
        return <IoIosWarning className="w-8 h-8 text-secondary-700" />;
      case "INFO":
        return <BsInfoCircleFill className="w-8 h-8 text-tertiary-500" />;
      case "SUCCESS":
        return <FaCheckCircle className="w-8 h-8 text-primary-600" />;
      default:
        return <></>;
    }
  };

  const renderColor = (content: MessageContent) => {
    switch (content.theme) {
      case "ERROR":
        return "border-red-500";
      case "WARNING":
        return "border-secondary-700";
      case "INFO":
        return "border-tertiary-500";
      case "SUCCESS":
        return "border-primary-600";
    }
  };

  return (
    <div
      className={`
        flex items-center
        p-3 space-x-3
        rounded-lg border-2
        ${renderColor(content)}
        bg-white
        animate-slide-in
      `}
    >
      {renderIcon(content)}
      <h5 className="body-large text-gray-700 max-w-md">{content.message}</h5>
    </div>
  );
}
