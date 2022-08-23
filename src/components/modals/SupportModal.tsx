import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SupportModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Loving it?" isOpen={isOpen} handleClose={handleClose}>

        <ul className="list-none marker:text-blue-500 m-4">
          <li className="m-2">
            <a href="https://twitter.com/PolygonleGame" target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-400 font-bold">Follow our twitter</a>
          </li>
          <li className="m-2">
            <a href="https://discord.gg/TrVJMwzjKc" target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-400 font-bold">Join our discord community</a>
          </li>
          <li className="m-2">
            <a href="https://www.buymeacoffee.com/blorppppp" target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-400 font-bold">Buy me a coffee</a> ☕
          </li>
        </ul>
      <p className="text-center text-sm text-gray-700 dark:text-gray-300">
      Happy puzzling!<br />
      Grant
      </p>
    </BaseModal>
		)
}
