"use client";
import Card from "@/components/Card";
import { Target } from "@/types/Target";
import { useContext, useState } from "react";
import axios from "axios";
import { ModalContext } from "@/contexts/ModalProvider";
import Confirmation from "@/components/modal/Confirmation";
import OperationMenu from "@/components/OperationMenu";
import { TextInput } from "@/components/TextInput";
import DoneButton from "@/components/button/DoneButton";

export default function TargetCard({
  target,
  fetchTargets,
}: {
  target: Target;
  fetchTargets: () => void;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(target.objectIdRegex);
  const modalContext = useContext(ModalContext);

  const updateTarget = () => {
    edit &&
      axios
        .put(`/rbac-service/v1/targets/${target.id}`, {
          objectIdRegex: value,
        })
        .finally(fetchTargets);
    setEdit(false);
  };

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/targets/${target.id}`).finally(fetchTargets);
  };

  const onDeleteClick = () => {
    modalContext.set(
      <Confirmation
        onClick={() => {
          deleteTarget();
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
          onEnter={updateTarget}
        />
        {edit ? (
          <DoneButton onClick={updateTarget} />
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
