import { CharStatus } from '../../lib/statuses'
import { useEffect, useRef } from 'react'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  active?: boolean
  focusable?: boolean
  onClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  onClick,
  active,
  focusable = false,
}: Props) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = isCompleted ? `${position * REVEAL_TIME_MS}ms`: ''
  const isHighContrast = getStoredIsHighContrastMode()
  const ariaLabel = !status ? 'empty cell' : `letter "${value}" is ${status}`;

  const classes = classnames(
    'cell w-14 h-14 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white focus:outline-none',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && value !== ' ' && !status,
      'absent bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent' && !isHighContrast,
      'absent bg-slate-200 dark:bg-slate-700 text-slate-700 border-slate-200 dark:border-slate-700':
        status === 'absent' && isHighContrast,
      'correct bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'border-solid border-2': !active,
      'border-4 border-indigo-700 dark:border-indigo-300': active,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  //useEffect(() => {
  //  if(!focusable) {
  //    return
  //  }
  //  if(active) {
  //    const x = window.scrollX;
  //    const y = window.scrollY;
  //    cellRef.current?.focus()
  //    window.scrollTo(x, y); // focus without scrolling
  //  } else {
  //    cellRef.current?.blur()
  //  }
  //}, [active, focusable])

  const focusableProp = focusable ? {tabIndex: 0}: {}

  return (
    <div ref={cellRef} 
      onClick={onClick} onFocus={onClick} className={classes} {...focusableProp} style={{ animationDelay }} role="listitem" aria-label={ariaLabel} data-position={position}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
