import React, { useRef, useEffect } from 'react'

type Props = {
  solution: string
}

type Point = [number, number]

class Shape {
    constructor(readonly coords: Point[], readonly width: number) {}
}

export const Puzzle = ({solution}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if(!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if(!context) {
      return
    }

    const drawSquare = (context: CanvasRenderingContext2D, pos: Point, size: number, color: string) => {
      context.fillStyle = color
      const [x, y] = pos
      context.fillRect(x, y, size, size)
      context.stroke()
    }

    const drawShape = (context: CanvasRenderingContext2D, pos: Point, coords: Point[], size: number, color: string) => {
      for(var i = 0; i < coords.length; i++) {
        const cord = coords[i];
        drawSquare(context, [pos[0] + cord[0], pos[1] + cord[1]], size, color)
      }
    }

    const drawWord = (context: CanvasRenderingContext2D, word: string) => {
      const colors = [
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
      colors.sort(() => Math.random() * 2 - 1) // pesudorandomize


      const size = 20;
      const padding = 10;

      const shapes = [
                new Shape([[0, 0], [0, size], [size, size], [size, 0]], 2*size),
                new Shape([[0, size/2]], size),
                new Shape([[0, 0], [0, size]], size),
                new Shape([[0, size/2], [size, size/2]], 2*size),
                new Shape([[0, 0], [0, size], [size, size]], 2*size),
                new Shape([[0, 0], [0, size], [size, 0]], 2*size) ,
                new Shape([[0, 0], [size, size], [size, 0]], 2*size),
                new Shape([[0, size], [size, size], [size, 0]], 2*size)
      ]
      shapes.sort(() => Math.random() * 2 - 1) // pesudorandomize

      const chars = Array.from(new Set(word))
      const char2shape = new Map()
      for(let i = 0; i < chars.length; i++) {
        char2shape.set(chars[i], shapes[i])
      }

      canvas.width = Array.from(word).reduce((sum: number, c: string) => sum + char2shape.get(c).width + padding, padding)
      canvas.height = 2*size + 2*padding

      let pos = [padding, padding]
      //// random.shuffle(colors)
      for(let i = 0; i < word.length; i++){
        const shape = char2shape.get(word[i])
        drawShape(context, [pos[0], pos[1]], shape.coords, size, colors[i])
        pos = [padding + pos[0] + shape.width, pos[1]]
      }
    }

    drawWord(context, solution)
  }, [])

  return (
    <div className="flex justify-center mb-1">
      <canvas ref={canvasRef} />
    </div>
  )
}
