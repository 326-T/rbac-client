"use client";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import MenuField from "./MenuField";
import MenuButton from "./MenuButton";

export default function EditMenu({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: () => void;
  onDeleteClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        relative
      "
    >
      <MenuButton onClick={() => setOpen(!open)} clicked={open} />
      {open && (
        <MenuField close={() => setOpen(false)}>
          <ul
            className="
              rounded-lg
              bg-white shadow-lg
            "
          >
            <li
              onClick={() => {
                onEditClick();
                setOpen(false);
              }}
              className="
                flex items-center
                space-x-2 p-3 rounded-t-lg
                clickable
              "
            >
              <FiEdit3 className="icon-small" />
              <h6 className="body-large">Edit</h6>
            </li>
            <li
              onClick={() => {
                onDeleteClick();
                setOpen(false);
              }}
              className="
                flex items-center
                space-x-2 p-3 rounded-b-lg
                clickable-warning
              "
            >
              <AiOutlineDelete className="icon-small" />
              <h6 className="body-large">Delete</h6>
            </li>
          </ul>
        </MenuField>
      )}
    </div>
  );
}
