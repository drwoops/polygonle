import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { Puzzle } from '../puzzle/Puzzle'
import { getPuzzle } from '../../lib/words'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const puzzle = getPuzzle('people')
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries. Each puzzle includes a unique shape for each character.
        The correct solution will follow the same pattern as the shapes.
      </p>
      <Puzzle puzzle={puzzle} />

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="P"
          status="correct"
        />
        <Cell value="O" />
        <Cell value="N" />
        <Cell value="C" />
        <Cell value="H" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter P is in the word and in the correct spot.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        From its shape we also know the 4th character is a P.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="Y" />
        <Cell value="A" />
        <Cell value="W" />
        <Cell value="N" />
        <Cell value="E"
          isRevealing={true}
          isCompleted={true}
          status="present"
        />
        <Cell value="D" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter E is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="T" />
        <Cell value="R" />
        <Cell value="A" />
        <Cell isRevealing={true} isCompleted={true} value="I" status="absent" />
        <Cell value="T" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter I is not in the word in any spot.
      </p>
    </BaseModal>
  )
}
