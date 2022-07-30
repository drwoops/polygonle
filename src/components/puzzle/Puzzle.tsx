import * as shuffleSeed from 'shuffle-seed';

type Props = {
  solution: string
}

export const Puzzle = ({solution}: Props) => {
  let colors = [
    "#F94144",
    "#F3722C",
    "#F8961E",
    "#F9844A",
    "#F9C74F",
    "#90BE6D",
    "#43AA8B",
    "#4D908E",
    "#577590",
    "#277DA1"]
  colors = shuffleSeed.shuffle(colors, solution); // seed with solution for stability

  let shapes = [
    '■', '▪', '◆', '◢', '◣', '◤', '◥'
  ];
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
