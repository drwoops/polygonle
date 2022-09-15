import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  solution: string
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
  onSelectCell: (index: number) => void
  selectedCellIndex: number
}

export const Grid = ({
  solution,
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  onSelectCell,
  selectedCellIndex
}: Props) => {
  const solved = guesses[guesses.length - 1] === solution;
  const remainingGuesses = MAX_CHALLENGES - guesses.length;
  const empties = Array.from(Array(remainingGuesses));
  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow
          key={i}
          solution={solution}
          guess={guess}
          isRevealing={isRevealing && guesses.length - 1 === i}
        />
      ))}
      {empties.map((_, i) => { 
        if(i === 0 && !solved) {
          return <CurrentRow key={i} solution={solution} guess={currentGuess} className={currentRowClassName} onSelectCell={onSelectCell} selectedCellIndex={selectedCellIndex} />
        }
        return <EmptyRow key={i} solution={solution} />
      })}
    </>
  )
}
