"use client";
import Card from "@/components/Card";
import { Path } from "@/types/Path";
import { useContext, useState } from "react";
import axios from "axios";
import { ModalContext } from "@/contexts/ModalProvider";
import Confirmation from "@/components/modal/Confirmation";
import OperationMenu from "@/components/OperationMenu";
import { TextInput } from "@/components/TextInput";
import DoneButton from "@/components/button/DoneButton";

export default function PathCard({
  path,
  fetchPaths,
}: {
  path: Path;
  fetchPaths: () => void;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(path.regex);
  const modalContext = useContext(ModalContext);

  const updatePath = () => {
    edit &&
      axios
        .put(`/rbac-service/v1/paths/${path.id}`, {
          regex: value,
        })
        .finally(fetchPaths);
    setEdit(false);
  };

  const deletePath = () => {
    axios.delete(`/rbac-service/v1/paths/${path.id}`).finally(fetchPaths);
  };

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deletePath();
          modalContext.turnOff();
        }}
      />
    );
    modalContext.turnOn();
  };

  return (
    <Card>
      <div className="flex w-full items-center justify-between space-x-5">
        <TextInput
          value={value}
          onChange={setValue}
          disabled={!edit}
          onEnter={updatePath}
        />
        {edit ? (
          <DoneButton onClick={updatePath} />
        ) : (
          <OperationMenu
            onEditClick={() => setEdit(true)}
            onDeleteClick={onDeleteClick}
          />
        )}
      </div>
    </Card>
  );
}
