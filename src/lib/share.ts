import { getGuessStatuses } from './statuses'
import { unicodeSplit, Solution } from './words'
import { Shape } from './shapes'
import { GAME_TITLE, GAME_MODE_UNLIMITED } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

// Spaces: https://jkorpela.fi/chars/spaces.html 
const forceUnicode = (c: string) => {
  return c + '\uFE0E' // VARIATION SELECTOR-15
}

const spacedUnicodePuzzle = (puzzle: Shape[]) => {
  return puzzle.map((s: Shape) => {
    let shape = forceUnicode(s.shape)
    if(s.shape === '⬢') {
      return `\u2004${shape}\u2004`
    }
    if(s.shape === '◼') {
      return `\u2006\u2005${shape}\u2005`
    }
    return `\u2005${shape}\u2005` // Pad with Four-per-em space 
  }).join('')
}

export const getShareText = (
  solution: Solution,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isExpertMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  gameMode: string,
  shareUrl: string
): string => {
  let modesSymbol = '';
  if(isHardMode && isExpertMode) {
    modesSymbol = '⬢'; // hexpert mode
  } else if (isHardMode) {
    modesSymbol = '■';
  } else if (isExpertMode) {
    modesSymbol = '◆';
  }
  const problemNumber = gameMode === GAME_MODE_UNLIMITED ? '∞' : solution.index

  return `#${GAME_TITLE} ${problemNumber} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${forceUnicode(modesSymbol)}\n\n` +
    `${shareUrl}\n`
    +
    `${spacedUnicodePuzzle(solution.puzzle)}\n` + 
    generateEmojiGrid(
      solution.word,
      guesses,
      getEmojiTiles(isDarkMode, isExpertMode, isHighContrastMode)
    )
}

export const shareStatus = (
  solution: Solution,
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isExpertMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  gameMode: string,
  handleShareToClipboard: () => void,
  handleShareFailure: () => void,
  shareUrl: string
) => {

  const textToShare = getShareText(solution, guesses, lost, isHardMode, isExpertMode, isDarkMode, isHighContrastMode, gameMode, shareUrl) 
  const shareData = {text: textToShare}

  let shareSuccess = false

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData)
      shareSuccess = true
    }
  } catch (error) {
    shareSuccess = false
  }

  try {
    if (!shareSuccess) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToShare)
          .then(handleShareToClipboard)
          .catch(handleShareFailure)
      } else {
        handleShareFailure()
      }
    }
  } catch (error) {
    handleShareFailure()
  }
}

export const generateEmojiGrid = (
  solution: string,
  guesses: string[],
  tiles: string[]
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess)
      const splitGuess = unicodeSplit(guess)

      return splitGuess
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            default:
              return tiles[2]
          }
        })
        .join('')
    })
    .join('\n')
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
}

const getEmojiTiles = (isDarkMode: boolean, isExpertMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧': (isExpertMode ? '🟪':'🟩'))
  tiles.push(isHighContrastMode ? '🟦': '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
