import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  className: string
  solution: string
  onSelectCell: (index: number) => void
  selectedCellIndex: number
}

export const CurrentRow = ({ guess, className, solution, onSelectCell, selectedCellIndex}: Props) => {
  const splitGuess = unicodeSplit(guess)
  const classes = `flex justify-center mb-1 ${className}`

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const position = Number(event.currentTarget.dataset.position);
    onSelectCell(position);
  }
  //TODO on keyboard

  return (
    <div className={classes} role="list" aria-label="current row">
      {[...Array(solution.length)].map((x, i)=>  {
        return <Cell autofocus={selectedCellIndex === i} onClick={onClick} key={i} value={splitGuess[i]} position={i} />
      })}
    </div>
  )
}
