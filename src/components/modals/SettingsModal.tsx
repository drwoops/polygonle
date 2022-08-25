import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import { ButtonToggle } from './ButtonToggle'
import {
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  EXPERT_MODE_DESCRIPTION,
  GAME_MODES,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isExpertMode: boolean
  handleExpertMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  gameMode: string
  handleGameMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isExpertMode,
  handleExpertMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  gameMode,
  handleGameMode
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
          id="settings-hard-mode"
        />
        <SettingsToggle
          settingName="Expert Mode"
          flag={isExpertMode}
          handleFlag={handleExpertMode}
          description={EXPERT_MODE_DESCRIPTION}
          id="settings-expert-mode"
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
          id="settings-dark-mode"
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
          id="settings-highcontrast-mode"
        />
        <ButtonToggle
          settingName="Game Mode"
          selected={gameMode}
          flagValues={GAME_MODES}
          handleFlag={handleGameMode}
          id="settings-game-mode"
        />

      </div>
      <div className="flex justify-between mt-4 py-2 items-center text-sm">
        <p className="text-gray-500 dark:text-gray-300 text-left">Feedback</p>
        <a href="mailto:grant.warman+polygonle@gmail.com" target="_blank" rel="noreferrer"
           className="text-indigo-700 dark:text-indigo-400 font-bold">Email</a>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-500 dark:text-gray-300 text-left">Report Bugs</p>
        <a href="https://github.com/Grantismo/polygonle/issues" target="_blank" rel="noreferrer"
           className="text-indigo-700 dark:text-indigo-400 font-bold">Github</a>
      </div>
    </BaseModal>
  )
}
