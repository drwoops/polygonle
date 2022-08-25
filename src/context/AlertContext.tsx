import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react'
import { ALERT_TIME_MS } from '../constants/settings'

type AlertStatus = 'success' | 'error' | undefined

export type AlertData = {
  type?: string
  status?: string
}

type ShowOptions = {
  persist?: boolean
  delayMs?: number
  durationMs?: number
  onClose?: () => void
  data?: AlertData
}

type AlertContextValue = {
  status: AlertStatus
  message: string | null
  data: AlertData
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  showSuccess: (message: string, options?: ShowOptions) => void
  showError: (message: string, options?: ShowOptions) => void
}

export const AlertContext = createContext<AlertContextValue | null>({
  status: 'success',
  message: null,
  data: {},
  isVisible: false,
  setIsVisible: (boolean) => null,
  showSuccess: () => null,
  showError: () => null,
})
AlertContext.displayName = 'AlertContext'

export const useAlert = () => useContext(AlertContext) as AlertContextValue

type Props = {
  children?: ReactNode
}

export const AlertProvider = ({ children }: Props) => {
  const [status, setStatus] = useState<AlertStatus>('success')
  const [message, setMessage] = useState<string | null>(null)
  const [data, setData] = useState<AlertData>({})
  const [isVisible, setIsVisible] = useState(false)

  const isVisibleState = useMemo(() => ({
       isVisible, setIsVisible 
    }), [isVisible, setIsVisible]);

  const show = useCallback(
    (showStatus: AlertStatus, newMessage: string, options?: ShowOptions) => {
      const {
        delayMs = 0,
        persist,
        onClose,
        durationMs = ALERT_TIME_MS,
      } = options || {}

      setTimeout(() => {
        setStatus(showStatus)
        setMessage(newMessage)
        setData(options?.data ?? {})
        setIsVisible(true)

        if (!persist) {
          setTimeout(() => {
            setIsVisible(false)
            if (onClose) {
              onClose()
            }
          }, durationMs)
        }
      }, delayMs)
    },
    [setStatus, setMessage, setIsVisible, setData]
  )

  const showError = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      const opts = options ?? {}
      opts.data = {...opts.data, status: 'error'}
      show('error', newMessage, opts)
    },
    [show]
  )

  const showSuccess = useCallback(
    (newMessage: string, options?: ShowOptions) => {
      const opts = options ?? {}
      opts.data = {...opts.data, status: 'success'}
      show('success', newMessage, opts)
    },
    [show]
  )

  return (
    <AlertContext.Provider
      value={{
        status,
        message,
        showError,
        showSuccess,
        data,
        ...isVisibleState,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}
