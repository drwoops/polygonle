import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  className: string
  solution: string
  onSelectCell: (index: number) => void
}

export const CurrentRow = ({ guess, className, solution, onSelectCell}: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const position = Number(event.currentTarget.dataset.position);
    event.currentTarget.focus();
    onSelectCell(position);
  }
  //TODO on keyboard

  return (
    <div className={classes} role="list" aria-label="current row">
      {splitGuess.map((letter, i) => (
        <Cell onClick={onClick} key={i} value={letter} position={i} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell onClick={onClick} key={i} />
      ))}
    </div>
  )
}
