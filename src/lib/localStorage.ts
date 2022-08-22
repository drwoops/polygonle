import {
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
const HARD_MODE_KEY = 'gameMode' // don't modify even though this is confusing
const EXPERT_MODE_KEY = 'expertMode'
const THEME_KEY = 'theme'

export type StoredGameState = {
  gameMode: string
  guesses: string[]
  solution: string
}

export const setStoredGameStates = (gameState: StoredGameState[]) => {
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
}

export const getStoredGameStates = () => {
  const state = localStorage.getItem(GAME_STATE_KEY)
  if (!state) {
    return []
  }
  const parsedStates = JSON.parse(state) as {};
  return Array.isArray(parsedStates) ? parsedStates as StoredGameState[]: [];
}

export const getStoredGameState = (gameMode: string) => {
  const states = getStoredGameStates()
  return states.find((s: StoredGameState) => s.gameMode === gameMode)
}

export const setStoredGameState = (gs: StoredGameState) => {
  const states = getStoredGameStates()
  const index = states.findIndex((s: StoredGameState) => gs.gameMode === s.gameMode)
  if (index === -1) {
    states.push(gs)
  } else {
    states[index] = gs;
  }
  setStoredGameStates(states)
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

