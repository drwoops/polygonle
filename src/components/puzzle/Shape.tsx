import {Shape as ShapeData} from '../../lib/shapes'

export class Color {
  constructor(readonly hex: string, readonly label: string){}
}

type Props = {
  shape: ShapeData,
  useMargin: boolean
}
export const Shape = ({shape, useMargin}: Props) => {
  return (
    <div 
      aria-label={`${shape.color!.label} ${shape.label}`}
      tabIndex={0}
      role="listitem"
      className={`w-14 h-14 flex items-center justify-center ${useMargin? 'mx-0.5': ''} text-5xl text-center font-bold font-mono rounded ${shape.color!.hex === '#3F1F56'  ? 'dark:brightness-200':'dark:brightness-150'}`}>
      {shape.render({height: '2.25rem', width: '2.25rem', fill: shape.color!.hex})}
    </div>
  )
}
