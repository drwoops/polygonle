import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  RefreshIcon,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { GAME_TITLE, GAME_MODE_DAILY, GAME_MODE_UNLIMITED} from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  setIsSupportModalOpen: (value: boolean) => void
  onRefresh: () => void
  gameMode: string
  solutionIndex: number
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  setIsSupportModalOpen,
  onRefresh,
  gameMode,
  solutionIndex,
}: Props) => {
  const gameModeIndicator = () => {
    if(gameMode === GAME_MODE_DAILY) {
      return <span className="text-sm text-gray-500 dark:text-gray-300 title absolute leading-7 left-24">#{solutionIndex}</span>
    }
    return <span className="text-xl text-gray-500 dark:text-gray-300 absolute leading-7 left-24">∞</span>
  } 
  return (
    <div className="navbar">
      <div className="navbar-content px-3">
        <div className="icon-group flex-1 justify-start">
          <InformationCircleIcon
            className="h-6 w-6 mr-2 scale-up cursor-pointer dark:stroke-white"
            aria-label="info"
            role="button"
            tabIndex={0}
            onClick={() => setIsInfoModalOpen(true)}
          />
          <HeartIcon
            className="h-6 w-6 mr-2 scale-up cursor-pointer text-red-500"
            aria-label="community"
            role="button"
            tabIndex={0}
            onClick={() => setIsSupportModalOpen(true)}
          />
          {gameMode === GAME_MODE_UNLIMITED && (
            <RefreshIcon
              className="h-6 w-6 mr-2 scale-up cursor-pointer dark:stroke-white"
              aria-label="info"
              role="button"
              tabIndex={0}
              onClick={onRefresh}
            />
          )}
        </div>
        <div className="flex flex-1 justify-center items-center">
          <p className="text-xl font-bold title dark:text-white relative mt-1">
            {GAME_TITLE}
            {gameModeIndicator()}
          </p>
        </div>
        <div className="icon-group flex-1 justify-end">
          <ChartBarIcon
            className="h-6 w-6 mr-3 scale-up cursor-pointer dark:stroke-white"
            aria-label="stats"
            role="button"
            tabIndex={0}
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 scale-up cursor-pointer dark:stroke-white"
            aria-label="settings"
            role="button"
            tabIndex={0}
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
