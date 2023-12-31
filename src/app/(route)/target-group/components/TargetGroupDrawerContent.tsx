'use client'
import { useContext, useEffect, useState } from 'react'
import { TextInput } from '@/components/TextInput'
import CustomButton from '@/components/button/CustomButton'
import ProductionInfo from '@/components/modal/edit-modal-content/ProductionInfo'
import RelationField from '@/components/modal/edit-modal-content/RelationField'
import TitleContent from '@/components/modal/edit-modal-content/TitleContent'
import { DrawerContext } from '@/contexts/DrawerProvider'
import { useRelationReducer } from '@/hooks/useRelationReducer'
import { Target } from '@/types/Target'
import { TargetGroup } from '@/types/TargetGroup'
import { findTargetsByTargetGroupId, indexTargets } from '@/services/target'
import { updateTargetGroup } from '@/services/targetGroup'
import {
  deleteTargetGroupBelonging,
  insertTargetGroupBelonging,
} from '@/services/targetGroupBelonging'

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
    findTargetsByTargetGroupId(targetGroup.namespaceId, targetGroup.id).then((res) => {
      relationReducer.setRelated(res.data)
    })
    indexTargets(targetGroup.namespaceId).then((res) => {
      relationReducer.setAll(res.data)
    })
  }

  const onSaveClick = async () => {
    setEdit(false)
    Promise.all([
      targetGroupName !== targetGroup.name &&
        updateTargetGroup(targetGroup.namespaceId, targetGroup.id, targetGroupName),
      ...relationReducer.state.pending.map((target: Target) =>
        insertTargetGroupBelonging(targetGroup.namespaceId, target.id, targetGroup.id),
      ),
      ...relationReducer.state.removing.map((target: Target) =>
        deleteTargetGroupBelonging(targetGroup.namespaceId, target.id, targetGroup.id),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetGroup])

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
      <div className='divider' />
      <div
        className='
          flex flex-col flex-grow
          space-y-5
          overflow-y-scroll
        '
      >
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
        <div className='flex-grow' />
        <ProductionInfo
          createdAt={targetGroup.createdAt}
          updatedAt={targetGroup.updatedAt}
          createdBy={targetGroup.createdBy}
        />
      </div>
    </div>
  )
}
