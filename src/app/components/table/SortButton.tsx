'use client'
import { useEffect, useMemo, useState } from 'react'
import { BiSort } from 'react-icons/bi'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { FaSortAlphaDown } from 'react-icons/fa'
import { FaSortAlphaDownAlt } from 'react-icons/fa'

export type SortState = 'NONE' | 'ASC' | 'DSC'

export default function SortButton({ onChange }: { onChange?: (sortState: SortState) => void }) {
  const [sortState, setSortState] = useState<SortState>('NONE')
  const onClick = () => {
    switch (sortState) {
      case 'NONE':
        setSortState('ASC')
        break
      case 'ASC':
        setSortState('DSC')
        break
      case 'DSC':
        setSortState('NONE')
        break
    }
  }

  const getIcon = useMemo(() => {
    switch (sortState) {
      case 'NONE':
        return <BiSort />
      case 'ASC':
        return <FaSortAlphaDown />
      case 'DSC':
        return <FaSortAlphaDownAlt />
    }
  }, [sortState])

  useEffect(() => onChange && onChange(sortState), [sortState])

  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-md
        ${sortState !== 'NONE' ? 'hover:bg-primary-400' : 'hover:bg-base-300'}
        ${sortState !== 'NONE' && 'bg-primary-300'}
        ${sortState !== 'NONE' && 'text-white'}
      `}
    >
      {getIcon}
    </button>
  )
}
