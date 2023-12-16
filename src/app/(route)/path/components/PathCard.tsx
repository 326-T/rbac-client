"use client";
import Card from "@/app/components/card/Card";
import { Path } from "@/types/Path";
import { useContext, useMemo, useRef, useState } from "react";
import axios from "axios";
import { ModalContext } from "@/contexts/ModalProvider";
import Confirmation from "@/components/modal/Confirmation";
import OperationMenu from "@/components/OperationMenu";
import { TextInput } from "@/components/TextInput";
import DoneButton from "@/components/button/DoneButton";
import { useEscapeKey } from "@/app/hooks/useEscapeKey";
import { useClickOutSide } from "@/app/hooks/useClickOutSide";

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
  const modified = useMemo(() => value !== path.regex, [value]);
  const ref = useRef(null);

  const updatePath = () => {
    edit &&
      modified &&
      axios
        .put(`/rbac-service/v1/paths/${path.id}`, {
          regex: value,
        })
        .then(fetchPaths)
        .finally(() => setEdit(false));
  };

  const deletePath = () => {
    axios.delete(`/rbac-service/v1/paths/${path.id}`).then(fetchPaths);
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
  useClickOutSide(ref, () => setEdit(false));
  useEscapeKey(() => setEdit(false));

  return (
    <div ref={ref}>
      <Card>
        <div className="flex w-full items-center justify-between space-x-5">
          <TextInput
            value={value}
            onChange={setValue}
            disabled={!edit}
            onEnter={updatePath}
          />
          {edit ? (
            <DoneButton onClick={updatePath} disabled={modified} />
          ) : (
            <OperationMenu
              onEditClick={() => setEdit(true)}
              onDeleteClick={onDeleteClick}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
