import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import * as shuffleSeed from 'shuffle-seed';

export class Color {
  constructor(readonly hex: string, readonly label: string){}
}

export class Shape {
  color?: Color;

  constructor(readonly shape: string, readonly label: string){}
}

// 1 January 2022 Game Epoch
export const firstGameDate = new Date(2022, 6, 31)
export const periodInDays = 1

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export const getLastGameDate = (today: Date) => {
  const t = new Date(today)
  t.setHours(0, 0, 0)
  let daysSinceLastGame =
    (t.getDay() - firstGameDate.getDay() + 7) % periodInDays
  const lastDate = new Date(t)
  lastDate.setDate(t.getDate() - daysSinceLastGame)
  return lastDate
}

export const getNextGameDate = (today: Date) => {
  const t = new Date(today)
  t.setHours(0, 0, 0)
  t.setDate(getLastGameDate(today).getDate() + periodInDays)
  return t
}

export const getIndex = (today: Date) => {
  const start = new Date(firstGameDate)
  let index = -1
  do {
    index++
    start.setDate(start.getDate() + periodInDays)
  } while (start <= today)

  return index
}

export const getWordOfDay = (index: number) => {
  if (index < 0) {
    throw new Error('Invalid index')
  }

  return localeAwareUpperCase(WORDS[index % WORDS.length])
}

export const getPuzzle = (solution: string, seed=solution) => {
  let colors = [
    new Color("#CF2B52", "red"),
    new Color("#FD8C44", "orange"),
    new Color("#FEC04F", "yellow"),
    new Color("#2DA4A8", "cyan"),
    new Color("#296094", "blue"), 
    new Color("#3F1F56", "magenta")
  ]
  colors = shuffleSeed.shuffle(colors, seed); // seed with solution for stability

  let shapes = [
    new Shape('⬢', 'octagon'),
    new Shape('◼', 'square'),
    new Shape('◆', 'diamond'),
    new Shape('◢', 'bottom-right triangle'),
    new Shape('◣', 'bottom-left triangle'),
    new Shape('◤', 'upper-left triangle'),
    new Shape('◥', 'upper-right triangle')
  ]
  shapes = shuffleSeed.shuffle(shapes, seed); // seed with solution for stability
  const chars = Array.from(new Set(solution))
  const char2Shape = new Map()
  for(let i = 0; i < chars.length; i++) {
    const shape = shapes[i];
    shape.color = colors[i];
    char2Shape.set(chars[i], shape)
  }

  return Array.from(solution).map((c: String) => char2Shape.get(c))
}

export const getPattern = (puzzle: Shape[]) => {
  return puzzle.map((p) => p.shape).join('')
}

export const getPuzzleOfDay = (index: number) => {
  return getPuzzle(getWordOfDay(index))
}

export const getSolution = (today: Date) => {
  const nextGameDate = getNextGameDate(today)
  const index = getIndex(today)
  const wordOfTheDay = getWordOfDay(index)
  const puzzleOfTheDay = getPuzzleOfDay(index)
  return {
    solution: wordOfTheDay,
    puzzle: puzzleOfTheDay,
    solutionIndex: index,
    tomorrow: nextGameDate.valueOf(),
  }
}

export const { solution, puzzle, solutionIndex, tomorrow} = getSolution(getToday())
