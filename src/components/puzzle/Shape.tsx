import {Shape as ShapeData} from '../../lib/words'

type Props = {
  shape: ShapeData,
  useMargin: boolean
}
export const Shape = ({shape, useMargin}: Props) => {
  return (
    <div style={{color: shape.color!.hex}}
      aria-label={`${shape.color!.label} ${shape.label}`}
      tabIndex={0}
      role="listitem"
      className={`w-14 h-14 flex items-center justify-center ${useMargin? 'mx-0.5': ''} text-5xl font-bold font-mono rounded dark:brightness-150`}>
      {shape.shape} 
    </div>
  )
}
