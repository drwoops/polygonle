import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { Shape } from '../puzzle/Shape'
import { Shape as ShapeData } from '../../lib/shapes'
import { getPuzzle } from '../../lib/words'
import { CogIcon, PlayIcon } from '@heroicons/react/outline'
import {
  HARD_MODE_DESCRIPTION,
  EXPERT_MODE_DESCRIPTION
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
	const example = 'people'
  const puzzle = getPuzzle(example)
	const animationClasses = new Map([['p', 'flip-1'],
																	 ['e', 'flip-2'],
																	 ['o', 'flip-3'],
																	 ['l', 'flip-4']])

	const flipCard = (l: string, s: ShapeData) => {
    return (<div className="flip-card h-14 w-14">
    	<div className={`flip-card-inner h-14 w-14 ${animationClasses.get(l)}`}>
      	<div className="flip-card-front h-14 w-14">
      	  <Shape shape={s} useMargin={true} />
      	</div>
      	<div className="flip-card-back h-14 w-14 text-5xl 
					font-bold rounded text-gray-700 dark:text-gray-300 uppercase">
      	  <div>{l}</div> 
      	</div>
    	</div>
    </div>)
	}

  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-700 dark:text-gray-300 p-2">
        Guess the word in 6 tries.
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 p-2">
        Each symbol represents a letter in the word.
      </p>
    	<div className="flex justify-center m-4" role="list" aria-label="puzzle">
        {['p', 'e', 'o', 'p', 'l', 'e'].map((l: string, i:number) => flipCard(l, puzzle[i]))}
			</div>
      <a href="https://www.tiktok.com/@blorppppp_/video/7127392446446636331?is_copy_url=1&is_from_webapp=v1" target="_blank" rel="noopener noreferrer" className="block text-left text-sm text-gray-700 dark:text-gray-300 pl-2 hover:text-indigo-700">
        <PlayIcon className="inline-flex h-6 w-6 scale-up cursor-pointer dark:stroke-white m-1" />
 
        Watch a <strong>how to play</strong> video
      </a>
      <a href="https://www.tiktok.com/@wordletips/video/7141108502038105387?is_from_webapp=v1&item_id=7141108502038105387" target="_blank" rel="noopener noreferrer" className="block text-left text-sm text-gray-700 dark:text-gray-300 pl-2 hover:text-indigo-700">
        <PlayIcon className="inline-flex h-6 w-6 scale-up cursor-pointer dark:stroke-white m-1" />
        Watch an example solve
      </a>
      <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 m-4"> Guessing </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 p-2">
        You may guess any word of the correct length. After each guess, the tiles will show whether your letters are in the secret word.
      </p>
      <div className="grid grid-cols-4 gap-4 m-6">
        <div className="col-span-1 flex">
          <Cell
            isRevealing={true}
            isCompleted={true}
            value="P"
            status="correct"
          />
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Letter is in the correct location
          </p>
        </div>
        <div className="col-span-1">
          <Cell value="E"
            isRevealing={true}
            isCompleted={true}
            status="present"
          />
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 col-span-3">
            Letter is in the word but in a different location
          </p>
        </div>
        <div className="col-span-1">
          <Cell isRevealing={true} isCompleted={true} value="I" status="absent" />
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 col-span-3">
            Letter is not in the word
          </p>
        </div>
      </div>
      <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 m-4"> Advanced modes </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        You can enable advanced modes in the settings menu 
        (<CogIcon className="inline-flex h-6 w-6 scale-up cursor-pointer dark:stroke-white" /> icon in the upper right)
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 font-bold mt-3 mb-1">
        Hard Mode
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {HARD_MODE_DESCRIPTION}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 font-bold mt-3 mb-1">
        Expert Mode
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {EXPERT_MODE_DESCRIPTION}
      </p>
      <div className="mt-6 italic text-sm text-gray-700 dark:text-gray-300">
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
