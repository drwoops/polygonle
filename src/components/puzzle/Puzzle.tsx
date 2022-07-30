import * as shuffleSeed from 'shuffle-seed';

type Props = {
  solution: string
}

export const Puzzle = ({solution}: Props) => {
  let colors = ["#CF2B52", "#FD8C44", "#FEC04F", "#2DA4A8", "#296094", "#3F1F56"]
  colors = shuffleSeed.shuffle(colors, solution); // seed with solution for stability

  let shapes = ['■', '▪', '◆', '◢', '◣', '◤', '◥'];
  shapes = shuffleSeed.shuffle(shapes, solution); // seed with solution for stability


  const chars = Array.from(new Set(solution))
  const char2index = new Map()
  for(let i = 0; i < chars.length; i++) {
    char2index.set(chars[i], i)
  }

  return (
    <div className="flex justify-center mb-1">
      {Array.from(solution).map((p: String) => {
        return (<div style={{color: colors[char2index.get(p)]}}
                     className="w-14 h-14 flex items-center justify-center mx-0.5 text-5xl font-bold rounded dark:text-white">
        {shapes[char2index.get(p)]} 
      </div>)
      })}
    </div>
  )
}
