import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import {AlertData} from '../../context/AlertContext'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'error'
  topMost?: boolean
  data?: AlertData 
}

export const Alert = ({
  isOpen,
  message,
  variant = 'error',
  topMost = false,
  data={},
}: Props) => {
  const classes = classNames(
    'fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bg-rose-500 text-white': variant === 'error',
      'bg-blue-500 text-white': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-2">
          <p className="text-sm text-center font-medium" role="alert" data-type={data.type || ''} data-status={data.status || ''}>{message}</p>
        </div>
      </div>
    </Transition>
  )
}
