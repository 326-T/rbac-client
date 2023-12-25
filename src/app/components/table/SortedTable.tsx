'use client'
import SortButton, { SortState } from '@/components/table/SortButton'
import { useListItem } from '@/hooks/useListItem'
import { useMemo } from 'react'

export default function SortedTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  const sortCondition = useListItem<SortState>(headers.map(() => 'NONE'))

  const sorted: string[][] = useMemo(() => {
    const sorted = [...rows]
    sortCondition.state.forEach((sortState: SortState, index: number) => {
      if (sortState === 'NONE') return
      sorted.sort((a: string[], b: string[]) => {
        if (sortState === 'ASC') {
          return a[index].localeCompare(b[index])
        } else {
          return b[index].localeCompare(a[index])
        }
      })
    })
    return sorted
  }, [sortCondition.state, rows])

  return (
    <div className='m-2'>
      <table
        className='
          w-full
          table table-auto
          table-xs md:table-md
        '
      >
        <thead>
          <tr>
            {headers.map((header: string, index: number) => (
              <th key={index}>
                <div className='flex items-center space-x-2'>
                  <h5>{header}</h5>
                  <SortButton
                    onChange={(sortState: SortState) => sortCondition.update(index, sortState)}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row: string[], index: number) => (
            <tr key={index}>
              {row.map((column: string, index: number) => (
                <td key={index}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
