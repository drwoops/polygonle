import { BaseModal } from './BaseModal'
import { Social } from '../social/Social'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SupportModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Loving it?" isOpen={isOpen} handleClose={handleClose}>
      <Social />

      <p className="text-center text-sm text-gray-700 dark:text-gray-300">
      Happy puzzling!<br />
      Grant
      </p>
    </BaseModal>
		)
}
