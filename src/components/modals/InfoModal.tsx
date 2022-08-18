import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { Puzzle } from '../puzzle/Puzzle'
import { Shape } from '../puzzle/Shape'
import { getPuzzle } from '../../lib/words'
import { CogIcon} from '@heroicons/react/outline'
import {
  HARD_MODE_DESCRIPTION,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const puzzle = getPuzzle('people')
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
      Each puzzle includes a series of shapes which correspond to letters in the solution. 
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        For example if today's solution were "people" you'd see the following clue:
      </p>
      

      <Puzzle puzzle={puzzle} />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        By guessing you will discover which letter belongs to each shape.
      </p>

      <div className="flex justify-evenly">
        <div className="flex justify-center items-center">
          <Shape shape={puzzle[0]} useMargin={false} />
          <span className="-ml-2 text-sm text-gray-900 dark:text-gray-100"> = P </span>
        </div>
        <div className="flex justify-center items-center">
          <Shape shape={puzzle[1]} useMargin={false} />
          <span className="-ml-2 text-sm text-gray-900 dark:text-gray-100"> = E </span>
        </div>
        <div className="flex justify-center items-center">
          <Shape shape={puzzle[2]} useMargin={false} />
          <span className="-ml-2 text-sm text-gray-900 dark:text-gray-100"> = O </span>
        </div>
        <div className="flex justify-center items-center">
          <Shape shape={puzzle[4]} useMargin={false} />
          <span className="-ml-2 text-sm text-gray-900 dark:text-gray-100"> = L </span>
        </div>
      </div>

      <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 m-4"> Guessing </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        You're free to guess any word of the correct length.
      </p>

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
      <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 m-4"> Advanced modes </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        You can enabled advanced modes in the settings menu 
        (<CogIcon className="inline-flex h-6 w-6 scale-up cursor-pointer dark:stroke-white" /> icon in the upper right)
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        <strong>Hard Mode: </strong>
        {HARD_MODE_DESCRIPTION}
      </p>
      <div className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
      	Based on the open source {' '} <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >react-wordle
        </a>{' '}
       	project.
      </div>
    </BaseModal>
		)
}
