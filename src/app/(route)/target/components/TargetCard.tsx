import Card from "@/app/components/Card";
import { Target } from "@/app/types/Target";
import { useContext, useState } from "react";
import axios from "axios";
import EditMenu from "@/app/components/menu/EditMenu";
import { ModalContext } from "@/app/contexts/ModalProvider";
import Confirmation from "@/app/components/modal/Confirmation";

export default function TargetCard({ target }: { target: Target }) {
  const [value, setValue] = useState<string>(target.objectIdRegex);
  const modalContext = useContext(ModalContext);

  const updateTarget = () => {
    axios.put(`/rbac-service/v1/targets/${target.id}`, {
      objectIdRegex: value,
    });
  };

  const deleteTarget = () => {
    axios.delete(`/rbac-service/v1/targets/${target.id}`);
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
        <h5 className="body-large">{target.objectIdRegex}</h5>
        <EditMenu onEditClick={() => {}} onDeleteClick={onDeleteClick} />
      </div>
    </Card>
  );
}
