import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE, GAME_MODE_DAILY } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  setIsSupportModalOpen: (value: boolean) => void
  gameMode: string
  solutionIndex: number
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  setIsSupportModalOpen,
  gameMode,
  solutionIndex,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <div className="icon-group">
          <InformationCircleIcon
            className="h-6 w-6 mr-2 scale-up cursor-pointer dark:stroke-white"
            aria-label="info"
            role="button"
            tabIndex={0}
            onClick={() => setIsInfoModalOpen(true)}
          />
          <button className="h-6 w-6 scale-up cursor-pointer dark:stroke-white"
            aria-label="support me"
            onClick={() => setIsSupportModalOpen(true)}>
            ☕
          </button>
        </div>
        <p className="text-xl font-bold title dark:text-white relative mt-1">{GAME_TITLE}
  {gameMode === GAME_MODE_DAILY ? (<span className="text-sm text-gray-500 dark:text-gray-300 title absolute leading-7 left-24">#{solutionIndex}</span>): (<span className="text-xl text-gray-500 dark:text-gray-300 absolute leading-7 left-24">∞</span>)}
          
      </p>
        <div className="icon-group">
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
