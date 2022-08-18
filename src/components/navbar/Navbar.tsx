import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
  setIsSupportModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
  setIsSupportModalOpen,
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
        <p className="text-xl ml-2.5 font-bold title dark:text-white">{GAME_TITLE}</p>
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
