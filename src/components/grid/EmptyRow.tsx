import { Cell } from './Cell'

export const EmptyRow = ({solution}: {solution: string}) => {
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="flex justify-center mb-1" role="list" aria-label="empty row">
      {emptyCells.map((_, i) => (
        <Cell key={i} focusable={false} />
      ))}
    </div>
  )
}
