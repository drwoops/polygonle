import {
  GAME_MODE_DAILY,
  GAME_MODE_UNLIMITED,
} from '../constants/strings'
const GAME_STATE_KEY = 'gameState'
const UNLIMITED_STATE_KEY = 'unlimitedState'
const HIGH_CONTRAST_KEY = 'highContrast'
const GAME_MODE_KEY = 'dailyGameMode'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(GAME_STATE_KEY)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export type UnlimitedState = {
  index: number
  seed: string
}

export const saveUnlimitedStateToLocalStorage = (unlimitedState: UnlimitedState) => {
  localStorage.setItem(UNLIMITED_STATE_KEY, JSON.stringify(unlimitedState))
}

export const loadUnlimitedStateFromLocalStorage = () => {
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

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(GAME_STAT_KEY, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
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
