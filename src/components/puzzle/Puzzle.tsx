import {Shape} from '../../lib/words'

type Props = {
  puzzle: Shape[]
}

export const Puzzle = ({puzzle}: Props) => {
  return (
    <div className="flex justify-center mb-1">
      {puzzle.map((p: Shape) => {
        return (<div style={{color: p.color}}
                     className="w-14 h-14 flex items-center justify-center mx-0.5 text-5xl font-bold rounded dark:brightness-150">
        {p.shape} 
      </div>)
      })}
    </div>
  )
}
