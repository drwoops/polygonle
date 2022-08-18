import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import {
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  EXPERT_MODE_DESCRIPTION,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  isExpertMode: boolean
  handleExpertMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isExpertMode,
  handleExpertMode,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col mt-2 divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Expert Mode"
          flag={isExpertMode}
          handleFlag={handleExpertMode}
          description={EXPERT_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
      </div>
      <div className="flex justify-between mt-4 py-2 items-center text-sm">
        <p className="text-gray-500 dark:text-gray-300 text-left">Feedback</p>
        <a href="mailto:grant.warman+polygonle@gmail.com" target="_blank" rel="noreferrer" className="text-indigo-700">Email</a>
      </div>
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-500 dark:text-gray-300 text-left">Report Bugs</p>
        <a href="https://github.com/Grantismo/polygonle/issues" target="_blank" rel="noreferrer" className="text-indigo-700">Github</a>
      </div>
    </BaseModal>
  )
}
