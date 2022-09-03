import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SupportModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Loving it?" isOpen={isOpen} handleClose={handleClose}>

        <ul className="list-none marker:text-blue-500 m-4">
          <li className="m-2 flex items-center justify-center">
            <a href="https://twitter.com/PolygonleGame" target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-400 font-bold mr-2">Follow our twitter</a>
						<svg width="16" height="16" viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg">
  					<path d="M 630, 425
  					  A 195, 195 0 0 1 331, 600
  					  A 142, 142 0 0 0 428, 570
  					  A  70,  70 0 0 1 370, 523
  					  A  70,  70 0 0 0 401, 521
  					  A  70,  70 0 0 1 344, 455
  					  A  70,  70 0 0 0 372, 460
  					  A  70,  70 0 0 1 354, 370
  					  A 195, 195 0 0 0 495, 442
  					  A  67,  67 0 0 1 611, 380
  					  A 117, 117 0 0 0 654, 363
  					  A  65,  65 0 0 1 623, 401
  					  A 117, 117 0 0 0 662, 390
  					  A  65,  65 0 0 1 630, 425
  					  Z"
  					  style={{"fill":"#3BA9EE"}} /></svg>

          </li>
          <li className="m-2 flex items-center justify-center">
          <a href="https://discord.gg/TrVJMwzjKc" target="_blank" rel="noreferrer" className="text-indigo-700 dark:text-indigo-400 font-bold mr-2">Join our community
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="fill-indigo-700 bi bi-discord" viewBox="0 0 16 16"> <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/> </svg>
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
