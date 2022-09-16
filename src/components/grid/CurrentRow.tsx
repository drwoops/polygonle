import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  className: string
  solution: string
  onSelectCell: (index: number) => void
  cursorIndex: number
}

export const CurrentRow = ({ guess, className, solution, onSelectCell, cursorIndex}: Props) => {
  const splitGuess = unicodeSplit(guess)
  const classes = `flex justify-center mb-1 ${className}`

  const onClick = (event: React.SyntheticEvent<HTMLElement>) => {
    const position = Number(event.currentTarget.dataset.position);
    onSelectCell(position);
  }

  return (
    <div className={classes} role="list" aria-label="current row">
      {[...Array(solution.length)].map((x, i)=>  {
        return <Cell active={cursorIndex === i} onClick={onClick} key={i} value={splitGuess[i]} position={i} focusable={true} />
      })}
    </div>
  )
}
