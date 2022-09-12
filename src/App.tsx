import { useState, useEffect, useMemo, useCallback } from 'react'
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
  GA_CATEGORY_SETTINGS,
  GA_CATEGORY_MODALS,
  GA_CATEGORY_GAME,
  GA_CATEGORY_NAV,
  GA_ACTION_GAMEMODE_TOGGLE,
  GA_ACTION_DARKMODE_TOGGLE,
  GA_ACTION_HARDMODE_TOGGLE,
  GA_ACTION_EXPERTMODE_TOGGLE,
  GA_ACTION_HIGHCONTRASTMODE_TOGGLE,
  GA_ACTION_INFOMODAL_OPEN,
  GA_ACTION_STATSMODAL_OPEN,
  GA_ACTION_SUPPORTMODAL_OPEN,
  GA_ACTION_MIGRATESTATSMODAL_OPEN,
  GA_ACTION_SETTINGMODAL_OPEN,
  GA_ACTION_GUESS,
  GA_ACTION_GAME_FINISH,
  GA_ACTION_REFRESH,
  ALERT_DATA_SETTING,
  ALERT_DATA_GAME_END,
  ALERT_DATA_GUESS,
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
import ReactGA from 'react-ga4'

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

  const modalOpenWrapper = (
    setter: (setting: boolean) => void,
    action: string
  ) => {
    return (setting: boolean) => {
      ReactGA.event({
        category: GA_CATEGORY_MODALS,
        action: action,
        value: +setting,
      })
      setter(setting)
    }
  }

  const setIsInfoModalOpenGA = modalOpenWrapper(
    setIsInfoModalOpen,
    GA_ACTION_INFOMODAL_OPEN
  )
  const setIsSupportModalOpenGA = modalOpenWrapper(
    setIsSupportModalOpen,
    GA_ACTION_SUPPORTMODAL_OPEN
  )
  const setIsMigrateStatsModalOpenGA = modalOpenWrapper(
    setIsMigrateStatsModalOpen,
    GA_ACTION_MIGRATESTATSMODAL_OPEN
  )
  const setIsSettingsModalOpenGA = modalOpenWrapper(
    setIsSettingsModalOpen,
    GA_ACTION_SETTINGMODAL_OPEN
  )

  // inline this so we can wrap in useCallback
  const setIsStatsModalOpenGA = useCallback((isOpen: boolean) => {
    ReactGA.event({
      category: GA_CATEGORY_MODALS,
      action: GA_ACTION_STATSMODAL_OPEN,
      value: +isOpen,
    })
    setIsStatsModalOpen(isOpen)
  }, [])

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
        data: { type: ALERT_DATA_GAME_END },
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
        setIsInfoModalOpenGA(true)
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
    ReactGA.event({
      category: GA_CATEGORY_SETTINGS,
      action: GA_ACTION_DARKMODE_TOGGLE,
    })
    setIsDarkMode(isDark)
    setStoredDarkMode(isDark)
  }

  const clearGameState = () => {
    setIsAlertVisible(false)
    setCurrentGuess('')
    setIsGameWon(false)
    setIsGameLost(false)
  }

  const handleGameMode = (gameMode: string) => {
    ReactGA.event({
      category: GA_CATEGORY_SETTINGS,
      action: GA_ACTION_GAMEMODE_TOGGLE,
    })

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
      showSuccessAlert(HEXPERT_MODE_ALERT_MESSAGE, {
        data: { type: ALERT_DATA_SETTING },
      })
    }
  }

  const handleHardMode = (isHard: boolean) => {
    ReactGA.event({
      category: GA_CATEGORY_SETTINGS,
      action: GA_ACTION_HARDMODE_TOGGLE,
    })
    if (guesses.length === 0 || getStoredHardMode()) {
      setIsHardMode(isHard)
      setStoredHardMode(isHard)
      detectHexpertMode(isHard, isExpertMode)
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE, {
        data: { type: ALERT_DATA_SETTING },
      })
    }
  }

  const handleExpertMode = (isExpert: boolean) => {
    ReactGA.event({
      category: GA_CATEGORY_SETTINGS,
      action: GA_ACTION_EXPERTMODE_TOGGLE,
    })
    if (guesses.length === 0 || getStoredExpertMode()) {
      setIsExpertMode(isExpert)
      setStoredExpertMode(isExpert)
      detectHexpertMode(isHardMode, isExpert)
    } else {
      showErrorAlert(EXPERT_MODE_ALERT_MESSAGE, {
        data: { type: ALERT_DATA_SETTING },
      })
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    ReactGA.event({
      category: GA_CATEGORY_SETTINGS,
      action: GA_ACTION_HIGHCONTRASTMODE_TOGGLE,
    })
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
        data: { type: ALERT_DATA_GAME_END },
        delayMs,
        onClose: () => setIsStatsModalOpenGA(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpenGA(true)
      }, (solution.word.length + 1) * REVEAL_TIME_MS)
    }
  }, [
    isGameWon,
    isGameLost,
    showSuccessAlert,
    solution.word.length,
    setIsStatsModalOpenGA,
  ])

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
    ReactGA.event({
      category: GA_CATEGORY_NAV,
      action: GA_ACTION_REFRESH,
    })
    setIsStatsModalOpenGA(false)
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
    setIsStatsModalOpenGA(false)
    handleGameMode(GAME_MODE_UNLIMITED)
  }

  const guessGA = (accepted: boolean) => {
    ReactGA.event({
      category: GA_CATEGORY_GAME,
      action: GA_ACTION_GUESS,
      value: +accepted,
    })
  }

  const gameFinishGA = (won: boolean) => {
    ReactGA.event({
      category: GA_CATEGORY_GAME,
      action: GA_ACTION_GAME_FINISH,
      value: +won,
    })
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === solution.word.length)) {
      guessGA(false)
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        data: { type: ALERT_DATA_GUESS },
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      guessGA(false)
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        data: { type: ALERT_DATA_GUESS },
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
        guessGA(false)
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          data: { type: ALERT_DATA_GUESS },
          onClose: clearCurrentRowClass,
        })
      }
    }

    // enforce expert mode - all guesses must follow the pattern of the solution
    if (
      isExpertMode &&
      getPattern(
        getPuzzle(
          currentGuess,
          /* seed to compare patterns */ seed ?? solution.word
        )
      ) !== getPattern(solution.puzzle)
    ) {
      guessGA(false)
      return showErrorAlert(PATTERN_MUST_MATCH_MESSAGE, {
        data: { type: ALERT_DATA_GUESS },
        onClose: clearCurrentRowClass,
      })
    }

    guessGA(true)
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
        gameFinishGA(true)
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        gameFinishGA(false)
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution.word), {
          data: { type: ALERT_DATA_GAME_END },
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.word.length + 1,
        })
      }
    }
  }

  return (
    <div id="app" className="flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpenGA}
        setIsStatsModalOpen={setIsStatsModalOpenGA}
        setIsSettingsModalOpen={setIsSettingsModalOpenGA}
        setIsSupportModalOpen={setIsSupportModalOpenGA}
        onRefresh={onRefresh}
        gameMode={gameMode}
        solutionIndex={solution.index}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div id="container" className="pb-6 grow">
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

        {solution.index === 44 && (
          <div
            className="font-medium text-gray-900 dark:text-gray-100 p-2
        flex justify-center pt-4 items-center "
          >
            <p className="text-center">
              Today's puzzle is a crossover with &nbsp;
              <a
                href="https://squaredle.app/?r=polygonle"
                target="_blank"
                className="text-indigo-700 dark:text-indigo-400 font-bold"
              >
                Squaredle
              </a>{' '}
              &nbsp;- A cunning word finding game which puts your vocabulary to
              the test!
            </p>
          </div>
        )}
        <div className="flex justify-center pt-4 items-center">
          <a
            href="https://discord.gg/TrVJMwzjKc"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-700 dark:text-indigo-400 font-bold mr-2"
          >
            Join our community
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="fill-indigo-700 bi bi-discord"
            viewBox="0 0 16 16"
          >
            {' '}
            <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />{' '}
          </svg>
        </div>
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpenGA(false)}
        />
        <SupportModal
          isOpen={isSupportModalOpen}
          handleClose={() => setIsSupportModalOpenGA(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpenGA(false)}
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
            setIsStatsModalOpenGA(false)
            setIsMigrateStatsModalOpenGA(true)
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
          handleClose={() => setIsMigrateStatsModalOpenGA(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpenGA(false)}
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
