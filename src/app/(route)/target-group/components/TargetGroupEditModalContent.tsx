'use client'
import { Target } from '@/types/Target'
import { TargetGroup } from '@/types/TargetGroup'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import CustomButton from '@/components/button/CustomButton'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { DrawerContext } from '@/contexts/DrawerProvider'

export default function TargetGroupEditModalContent({
  targetGroup,
  onClose,
}: {
  targetGroup: TargetGroup
  onClose?: () => void
}) {
  const [edit, setEdit] = useState<boolean>(false)
  const [targetGroupName, setTargetGroupName] = useState<string>(targetGroup.name)
  const relationReducer = useRelationReducer<Target>(
    (one: Target, another: Target) => one.id === another.id,
  )
  const drawerContext = useContext(DrawerContext)

  const fetchDetail = async (targetGroup: TargetGroup) => {
    axios
      .get(
        `/rbac-service/v1/targets?namespace-id=${targetGroup.namespaceId}&target-group-id=${targetGroup.id}`,
      )
      .then((res) => {
        relationReducer.setRelated(res.data)
      })
    axios.get(`/rbac-service/v1/targets?namespace-id=${targetGroup.namespaceId}`).then((res) => {
      relationReducer.setAll(res.data)
    })
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      targetGroupName !== targetGroup.name &&
        axios.put(`/rbac-service/v1/target-groups/${targetGroup.id}`, {
          name: targetGroupName,
        }),
      ...relationReducer.state.pending.map((target: Target) =>
        axios.post('/rbac-service/v1/target-group-belongings', {
          namespaceId: targetGroup.namespaceId,
          targetId: target.id,
          targetGroupId: targetGroup.id,
        }),
      ),
      ...relationReducer.state.removing.map((target: Target) =>
        axios.delete(
          `/rbac-service/v1/target-group-belongings?namespace-id=${targetGroup.namespaceId}&target-group-id=${targetGroup.id}&target-id=${target.id}`,
        ),
      ),
    ]).finally(() => {
      relationReducer.clear()
      drawerContext.turnOff()
    })
  }

  const onDiscardClick = () => {
    setEdit(false)
    relationReducer.clear()
    fetchDetail(targetGroup)
    setTargetGroupName(targetGroup.name)
  }

  useEffect(() => {
    fetchDetail(targetGroup)
    return () => {
      onClose && onClose()
      relationReducer.clear()
    }
  }, [])

  return (
    <div className='flex flex-col h-full md:p-5'>
      <TitleContent name={targetGroup.name} onBackClick={() => {}} onForwardClick={() => {}} />
      <div className='flex w-full justify-end mt-10 space-x-4'>
        {!edit ? (
          <CustomButton theme='EDIT' onClick={() => setEdit(true)} />
        ) : (
          <>
            <CustomButton theme='DISCARD' onClick={onDiscardClick} />
            <CustomButton theme='SAVE' onClick={onSaveClick} />
          </>
        )}
      </div>
      <div className='divider'></div>
      <TextInput
        value={targetGroupName}
        onChange={setTargetGroupName}
        disabled={!edit}
        onEnter={() => {}}
      />
      <RelationField
        remainingRelations={relationReducer.remaining}
        candidates={relationReducer.candidates}
        pendingRelations={relationReducer.state.pending}
        getName={(target: Target) => target.objectIdRegex}
        onAddRelation={relationReducer.add}
        onDeleteRelation={relationReducer.remove}
        disabled={!edit}
      />
      <ProductionInfo
        createdAt={targetGroup.createdAt}
        updatedAt={targetGroup.updatedAt}
        createdBy={targetGroup.createdBy}
      />
    </div>
  )
}