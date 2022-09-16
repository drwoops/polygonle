import { default as GraphemeSplitter } from 'grapheme-splitter'

type CursorResult = {
  guess: string
  index: number
}

const SPACE = " "


export const cursorDelete = (guess: string, cursorIndex: number): CursorResult => {
  const chars = new GraphemeSplitter().splitGraphemes(guess)
  const isChar = (index: number) => chars[index] && chars[index] !== SPACE
  const trimTrailingSpaces = (index: number) => {
    let trailingIndex = chars.length - 1;
    if(index > trailingIndex) {
      // if index exceeds the guess treat it like there's a trailing space
      chars.push(SPACE)
      trailingIndex += 1
      index = trailingIndex
    }
    if(chars[trailingIndex] !== SPACE) {
      return index
    }
    do {
      chars.pop()
      trailingIndex--
    } while(chars[trailingIndex] === SPACE)
    return Math.min(index, trailingIndex + 1)
  }
  
  let newIndex = cursorIndex
  if(isChar(cursorIndex)){ // cursor on a character
    chars[cursorIndex] = SPACE 
  } else if (isChar(cursorIndex - 1)){ // cursor adjacent to character 
    chars[cursorIndex - 1] = SPACE 
    newIndex--
  } else if (chars[cursorIndex] && chars[cursorIndex] === SPACE) {
    newIndex --
  }
  newIndex = trimTrailingSpaces(newIndex)
  return { guess: chars.join(''), index: newIndex }
}
