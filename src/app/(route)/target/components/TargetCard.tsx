import Card from "@/app/components/molecules/Card";
import { Target } from "@/app/types/Target";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaRegCheckSquare } from "react-icons/fa";
import { VscDiscard } from "react-icons/vsc";
import { TextField } from "../../../components/atoms/TextField";
import axios from "axios";

export default function TargetCard({ target }: { target: Target }) {
  const [editable, setEditable] = useState<boolean>(false);
  const [value, setValue] = useState<string>(target.objectIdRegex);
  const updateTarget = () => {
    axios.put(`/rbac-service/v1/targets/${target.id}`, {
      objectIdRegex: value,
    });
  };

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/targets/${target.id}`);
  };

  return (
    <Card>
      <div className="flex w-full items-center justify-between space-x-5">
        {!editable ? (
          <h5 className="body-large">{target.objectIdRegex}</h5>
        ) : (
          <TextField value={value} onChange={(value) => setValue(value)} />
        )}
        {!editable ? (
          <div className="flex space-x-2">
            <button onClick={() => setEditable(true)}>
              <FiEdit className="form-icon" />
            </button>
            <button onClick={deleteTarget}>
              <AiOutlineDelete className="form-warning-icon" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                updateTarget();
                setEditable(false);
              }}
            >
              <FaRegCheckSquare className="form-icon" />
            </button>
            <button
              onClick={() => {
                setValue(target.objectIdRegex);
                setEditable(false);
              }}
            >
              <VscDiscard className="form-warning-icon" />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
