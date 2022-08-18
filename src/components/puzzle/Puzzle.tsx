import {Shape as ShapeData} from '../../lib/words'
import {Shape} from './Shape'

type Props = {
  puzzle: ShapeData[]
}

export const Puzzle = ({puzzle}: Props) => {
  return (
    <div className="flex justify-center mb-1" role="list" aria-label="puzzle">
      {puzzle.map((s: ShapeData, i: number) => {
        return <Shape key={i} shape={s} useMargin={true} />
      })}
    </div>
  )
}
