import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect, useRef } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { localeAwareUpperCase } from '../../lib/words'

type Props = {
  onChar: (value: string, position?: number) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)
  const keyboardRef = useRef<HTMLDivElement>(null);

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const isEnter = e.code === 'Enter';
      const isBackspace = e.code === 'Backspace';
      const key = localeAwareUpperCase(e.key);
      const isKeypress = key.length === 1 && key >= 'A' && key <= 'Z';
      if (isEnter) {
        onEnter()
      } else if (isBackspace) {
        onDelete()
      } else if (isKeypress){
        // determine which position is focused
        onChar(key)
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div ref={keyboardRef} aria-label="keyboard" role="list" tabIndex={0}>
      <div className="flex justify-center mb-1">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solution={solution}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solution={solution}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick} solution={solution}>
          {ENTER_TEXT}
        </Key>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solution={solution}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick} solution={solution}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}
