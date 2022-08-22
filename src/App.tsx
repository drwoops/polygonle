import { useState, useEffect, useMemo } from 'react'
import { Grid } from './components/grid/Grid'
import { Puzzle } from './components/puzzle/Puzzle'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { SupportModal } from './components/modals/SupportModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  PATTERN_MUST_MATCH_MESSAGE,
  CORRECT_WORD_MESSAGE,
  HEXPERT_MODE_ALERT_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
  EXPERT_MODE_ALERT_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
  SHARE_FAILURE_TEXT,
  GAME_MODE_DAILY,
  GAME_MODE_UNLIMITED,
} from './constants/strings'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
  DISCOURAGE_INAPP_BROWSERS,
  LONG_ALERT_TIME_MS,
} from './constants/settings'
import {
  findFirstUnusedReveal,
  getDailySolution,
  getUnlimitedPuzzleId,
  getPattern,
  getPuzzle,
  getSolutionFromPuzzleId,
  getToday,
  isWordInWordList,
  unicodeLength,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  getStoredGameState,
  setStoredGameState,
  getStoredUnlimitedState,
  setStoredUnlimitedState,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  getStoredDarkMode,
  setStoredDarkMode,
  getStoredHardMode,
  setStoredHardMode,
  getStoredExpertMode,
  setStoredExpertMode,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useParams, useNavigate } from 'react-router-dom'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'
import { isInAppBrowser } from './lib/browser'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'

function App() {
  const {
    showError: showErrorAlert,
    showSuccess: showSuccessAlert,
    setIsVisible: setIsAlertVisible,
  } = useAlert()
  let { puzzleId, seed } = useParams<{ puzzleId: string; seed: string }>()
  const navigate = useNavigate()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const getGameModeFromPuzzleId = (puzzleId?: string) =>
    puzzleId ? GAME_MODE_UNLIMITED : GAME_MODE_DAILY
  const [gameMode, setGameMode] = useState(getGameModeFromPuzzleId(puzzleId))
  const [isDarkMode, setIsDarkMode] = useState(getStoredDarkMode())
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [isRevealing, setIsRevealing] = useState(false)

  const randomSeed = () => {
    return [...Array(8)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('')
  }
  const [unlimitedState, setUnlimitedState] = useState(() => {
    let state = getStoredUnlimitedState()
    if (state && state.seed) {
      return state
    }
    return {
      index: state?.index ? state.index : 0,
      seed: randomSeed(),
    }
  })

  const getUnlimitedPuzzleIdWithRetry = (index: number, seed: string) => {
    let pidAndIndex = getUnlimitedPuzzleId(index, seed)
    if (!pidAndIndex) {
      // exhausted entire list so start over with a new seed
      index = 0
      seed = randomSeed()
      pidAndIndex = getUnlimitedPuzzleId(index, seed)
    }
    if (!pidAndIndex) {
      throw new Error('unlimited pid index out of range despite refresh')
    }
    return { ...pidAndIndex!, seed }
  }

  const puzzleSlug = (pid: string, s: string) => `/${pid}${s ? '/' + s : ''}`

  const getShareUrl = (pid?: string, s?: string) => {
    let url = 'www.polygonle.com'
    if (gameMode === GAME_MODE_DAILY || !pid || !s) {
      return url
    }
    return `${url}${puzzleSlug(pid, s)}`
  }

  // get current solution (based on unlimited mode vs. daily
  const fetchedSolution = useMemo(() => {
    // on browser back/forward buttons gameMode is not set appropriately so reset
    let mode = getGameModeFromPuzzleId(puzzleId)
    if (mode !== gameMode) {
      setGameMode(mode)
    }
    switch (mode) {
      case GAME_MODE_UNLIMITED:
        return getSolutionFromPuzzleId(puzzleId!, seed)
      case GAME_MODE_DAILY:
      default:
        return getDailySolution(getToday())
    }
  }, [gameMode, puzzleId, seed])

  if (!fetchedSolution) {
    throw new Error('puzzle not found')
  }

  const solution = fetchedSolution!

  const guessesFromGameState = useMemo(() => {
    const loaded = getStoredGameState(gameMode)
    if (loaded?.solution !== solution.word) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution.word)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE(solution.word), {
        persist: true,
      })
    }
    return loaded.guesses
  }, [gameMode, solution.word, showErrorAlert])

  // get current game
  const [guesses, setGuesses] = useState<string[]>(guessesFromGameState)

  const [stats, setStats] = useState(() => loadStats())

  const [isHardMode, setIsHardMode] = useState(getStoredHardMode())

  const [isExpertMode, setIsExpertMode] = useState(getStoredExpertMode())

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (
      !getStoredGameState(GAME_MODE_DAILY) &&
      !getStoredGameState(GAME_MODE_UNLIMITED)
    ) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  })

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    setStoredDarkMode(isDark)
  }

  const clearGameState = () => {
    setIsAlertVisible(false)
    //setGuesses([])
    setCurrentGuess('')
    setIsGameWon(false)
    setIsGameLost(false)
  }

  const handleGameMode = (gameMode: string) => {
    clearGameState()
    setGameMode(gameMode)
    if (gameMode === GAME_MODE_DAILY) {
      navigate('/')
    } else {
      const { pid, index, seed } = getUnlimitedPuzzleIdWithRetry(
        unlimitedState.index,
        unlimitedState.seed
      )
      unlimitedState.index = index
      navigate(puzzleSlug(pid, seed))
    }
  }

  const detectHexpertMode = (isHard: boolean, isExpert: boolean) => {
    if (isHard && isExpert) {
      showSuccessAlert(HEXPERT_MODE_ALERT_MESSAGE)
    }
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || getStoredHardMode()) {
      setIsHardMode(isHard)
      setStoredHardMode(isHard)
      detectHexpertMode(isHard, isExpertMode)
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleExpertMode = (isExpert: boolean) => {
    if (guesses.length === 0 || getStoredExpertMode()) {
      setIsExpertMode(isExpert)
      setStoredExpertMode(isExpert)
      detectHexpertMode(isHardMode, isExpert)
    } else {
      showErrorAlert(EXPERT_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    setStoredGameState({ gameMode, guesses, solution: solution.word })
  }, [gameMode, guesses, solution.word])

  useEffect(() => {
    setGuesses(guessesFromGameState)
  }, [guessesFromGameState])

  useEffect(() => {
    setStoredUnlimitedState(unlimitedState)
  }, [unlimitedState])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * solution.word.length

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, (solution.word.length + 1) * REVEAL_TIME_MS)
    }
  }, [isGameWon, isGameLost, showSuccessAlert, solution.word.length])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.word.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onRefresh = () => {
    setIsStatsModalOpen(false)
    clearGameState()
    const { pid, index, seed } = getUnlimitedPuzzleIdWithRetry(
      unlimitedState.index + 1,
      unlimitedState.seed
    )
    unlimitedState.index = index
    unlimitedState.seed = seed
    setUnlimitedState(unlimitedState)
    setStoredUnlimitedState(unlimitedState)
    navigate(puzzleSlug(pid, seed))
  }

  const onStartUnlimited = () => {
    setIsStatsModalOpen(false)
    handleGameMode(GAME_MODE_UNLIMITED)
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === solution.word.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(
        solution.word,
        currentGuess,
        guesses
      )
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    // enforce expert mode - all guesses must follow the pattern of the solution
    if (
      isExpertMode &&
      getPattern(
        getPuzzle(currentGuess, /* seed to compare patterns */ solution.word)
      ) !== getPattern(solution.puzzle)
    ) {
      return showErrorAlert(PATTERN_MUST_MATCH_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.word.length)

    const winningWord = currentGuess === solution.word

    if (
      unicodeLength(currentGuess) === solution.word.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution.word), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.word.length + 1,
        })
      }
    }
  }

  return (
    <div className="h-full w-full fixed flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        setIsSupportModalOpen={setIsSupportModalOpen}
        onRefresh={onRefresh}
        gameMode={gameMode}
        solutionIndex={solution.index}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <Puzzle puzzle={solution.puzzle} />
          <Grid
            solution={solution.word}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solution.word}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <SupportModal
          isOpen={isSupportModalOpen}
          handleClose={() => setIsSupportModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          solution={solution}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          shareUrl={getShareUrl(puzzleId, seed)}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          handleShareFailure={() =>
            showErrorAlert(SHARE_FAILURE_TEXT, {
              durationMs: LONG_ALERT_TIME_MS,
            })
          }
          handleMigrateStatsButton={() => {
            setIsStatsModalOpen(false)
            setIsMigrateStatsModalOpen(true)
          }}
          isHardMode={isHardMode}
          isExpertMode={isExpertMode}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
          onNextPuzzle={onRefresh}
          onStartUnlimited={onStartUnlimited}
          gameMode={gameMode}
        />
        <MigrateStatsModal
          isOpen={isMigrateStatsModalOpen}
          handleClose={() => setIsMigrateStatsModalOpen(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isHardMode={isHardMode}
          handleHardMode={handleHardMode}
          isExpertMode={isExpertMode}
          handleExpertMode={handleExpertMode}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
          gameMode={gameMode}
          handleGameMode={handleGameMode}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default App
