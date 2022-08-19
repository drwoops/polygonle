import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SupportModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Coffee" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        If you'd like to support this game <br />

      <a href="https://www.buymeacoffee.com/blorppppp" target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-400 font-bold">buy me a coffee</a> ☕<br /><br />
      Happy puzzling!<br />
      Grant
      </p>
    </BaseModal>
		)
}
