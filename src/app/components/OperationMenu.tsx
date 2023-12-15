import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";

export default function OperationMenu({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: () => void;
  onDeleteClick: () => void;
}) {
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <IoIosMenu className="icon-medium" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
      >
        <li onClick={onEditClick}>
          <div
            className="
              flex items-center
              space-x-2
            "
          >
            <FiEdit3 className="icon-small" />
            <h6 className="body-large">Edit</h6>
          </div>
        </li>
        <li onClick={onDeleteClick}>
          <div
            className="
              flex items-center
              space-x-2
              clickable-warning
            "
          >
            <AiOutlineDelete className="icon-small" />
            <h6 className="body-large">Delete</h6>
          </div>
        </li>
      </ul>
    </div>
  );
}
