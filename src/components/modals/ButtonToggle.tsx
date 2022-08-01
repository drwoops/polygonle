type Props = {
  settingName: string
  selected: string
  flagValues: string[]
  handleFlag: Function
  description?: string
}

export const ButtonToggle = ({
  settingName,
  selected,
  flagValues,
  handleFlag,
  description,
}: Props) => {
  return (
      <div className="flex justify-between gap-4 py-3">
        <div className="text-gray-500 dark:text-gray-300 mt-2 text-left">
          <p className="leading-none">{settingName}</p>
        </div>
        <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
          {flagValues.map((flag: string) => (
            <button type="button" key={flag} aria-current={flag === selected} className={`first:rounded-l last:rounded-r inline-block px-6 py-2.5 ${flag === selected ? 'bg-indigo-800 shadow-inner': 'bg-indigo-500'} text-white font-medium text-xs leading-tight uppercase hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out`}>{flag}</button>
            ))}
        </div>
      </div>
  )
}
