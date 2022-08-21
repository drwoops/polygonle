import {
  GAME_MODE_DAILY,
  GAME_MODE_UNLIMITED,
  THEME_DARK,
  THEME_LIGHT,
  HARD_MODE_HARD,
  HARD_MODE_NORMAL,
  EXPERT_MODE_EXPERT,
  EXPERT_MODE_NORMAL,
} from '../constants/strings'
const GAME_STATE_KEY = 'gameState'
const UNLIMITED_STATE_KEY = 'unlimitedState'
const HIGH_CONTRAST_KEY = 'highContrast'
const GAME_MODE_KEY = 'dailyGameMode'
const HARD_MODE_KEY = 'gameMode' // don't modify even though this is confusing
const EXPERT_MODE_KEY = 'expertMode'
const THEME_KEY = 'theme'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const setStoredGameState = (gameState: StoredGameState) => {
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
}

export const getStoredGameState = () => {
  const state = localStorage.getItem(GAME_STATE_KEY)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export type UnlimitedState = {
  index: number
  seed: string
}

export const setStoredUnlimitedState = (unlimitedState: UnlimitedState) => {
  localStorage.setItem(UNLIMITED_STATE_KEY, JSON.stringify(unlimitedState))
}

export const getStoredUnlimitedState = () => {
  const state = localStorage.getItem(UNLIMITED_STATE_KEY)
  return state ? (JSON.parse(state) as UnlimitedState) : null
}

const GAME_STAT_KEY = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const setStoredStats = (gameStats: GameStats) => {
  localStorage.setItem(GAME_STAT_KEY, JSON.stringify(gameStats))
}

export const getStoredStats = () => {
  const stats = localStorage.getItem(GAME_STAT_KEY)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(HIGH_CONTRAST_KEY, '1')
  } else {
    localStorage.removeItem(HIGH_CONTRAST_KEY)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(HIGH_CONTRAST_KEY)
  return highContrast === '1'
}

export const getStoredGameMode = (puzzleId?: string) => {
  const storedGameMode = localStorage.getItem(GAME_MODE_KEY)
  const gameMode = puzzleId ? GAME_MODE_UNLIMITED : (storedGameMode || GAME_MODE_DAILY)
  if (gameMode !== storedGameMode) {
    setStoredGameMode(gameMode)
  }
  return gameMode
}

export const setStoredGameMode = (gameMode: string) => {
  localStorage.setItem(GAME_MODE_KEY, gameMode)
}

export const getStoredDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  return localStorage.getItem(THEME_KEY)
    ? localStorage.getItem(THEME_KEY) === THEME_DARK
    : prefersDarkMode
    ? true
    : false
}

export const setStoredDarkMode = (isDark: boolean) => {
  localStorage.setItem(THEME_KEY, isDark ? THEME_DARK : THEME_LIGHT)
}

export const getStoredHardMode = () => {
  return localStorage.getItem(HARD_MODE_KEY)
    ? localStorage.getItem(HARD_MODE_KEY) === HARD_MODE_HARD
    : false
}

export const setStoredHardMode = (isHard: boolean) => {
  localStorage.setItem(
    HARD_MODE_KEY,
    isHard ? HARD_MODE_HARD : HARD_MODE_NORMAL
  )
}

export const getStoredExpertMode = () => {
  return localStorage.getItem(EXPERT_MODE_KEY)
      ? localStorage.getItem(EXPERT_MODE_KEY) === EXPERT_MODE_EXPERT
      : false
}

export const setStoredExpertMode = (isExpert: boolean) => {
  localStorage.setItem(
        EXPERT_MODE_KEY,
        isExpert ? EXPERT_MODE_EXPERT : EXPERT_MODE_NORMAL
      )
}

