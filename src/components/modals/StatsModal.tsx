import Countdown from 'react-countdown'
import { ShareIcon, RefreshIcon } from '@heroicons/react/outline'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { getTomorrow, Solution } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
  GAME_MODE_UNLIMITED,
} from '../../constants/strings'
import { MigrationIntro } from '../stats/MigrationIntro'
import { ENABLE_MIGRATE_STATS } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: Solution
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  shareUrl: string
  handleShareToClipboard: () => void
  handleShareFailure: () => void
  handleMigrateStatsButton: () => void
  isHardMode: boolean
  isExpertMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
  onNextPuzzle: () => void
  onStartUnlimited: () => void
  gameMode: string
}

export const StatsModal = ({
  isOpen,
  handleClose,
  solution,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  shareUrl,
  handleShareToClipboard,
  handleShareFailure,
  handleMigrateStatsButton,
  isHardMode,
  isExpertMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
  onNextPuzzle,
  onStartUnlimited,
  gameMode,
}: Props) => {
  const tomorrow = getTomorrow() 
  const share = () => {
                shareStatus(
                  solution,
                  guesses,
                  isGameLost,
                  isHardMode,
                  isExpertMode,
                  isDarkMode,
                  isHighContrastMode,
                  gameMode,
                  handleShareToClipboard,
                  handleShareFailure,
                  shareUrl
                )}
  const unlimitedButton = () => {
    const classNames = "inline-flex justify-center items-center text-center w-full rounded-md border border-transparent shadow-sm px-4 py-4 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm row-span-1"
    if (gameMode === GAME_MODE_UNLIMITED) {
      return (<button
        type="button"
        className={classNames}
        onClick={onNextPuzzle}>
        <RefreshIcon className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white scale-up" />
        Next puzzle
      </button>)
    }
    return (<button
      type="button"
      className={classNames}
      onClick={onStartUnlimited}>
      <span className="h-3 w-3 leading-1 mr-6 text-3xl text-white-500 cursor-pointer scale-up inf">∞</span>
      Play unlimited
    </button>)
  }

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="grid grid-rows-2 grid-flow-col gap-2 dark:text-white">
          <div className="row-span-2 flex justify-center">
            <div className="self-center">
              <h5>{NEW_WORD_TEXT}</h5>
              <Countdown
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
                date={tomorrow}
                daysInHours={true}
              />
            </div>
          </div>
            <button
              type="button"
              className="inline-flex justify-center items-center text-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm row-span-1"
              onClick={share}>
              <ShareIcon className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white scale-up" />
              {SHARE_TEXT}
            </button>
            {unlimitedButton()}
        </div>
      )}
      {ENABLE_MIGRATE_STATS && (
        <div>
          <hr className="mt-4 -mb-4 border-gray-500" />
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        </div>
      )}
    </BaseModal>
  )
}
