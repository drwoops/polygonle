import React, { Component, ErrorInfo, ReactNode } from 'react'
import { getPuzzle } from './lib/words'
import { Puzzle } from './components/puzzle/Puzzle'
import { Grid } from './components/grid/Grid'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      const puzzle = getPuzzle('error')
      return (
        <>
          <div className="pt-2 px-1 pb-8 md:max-w-2xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Uh oh
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>Looks like something broke :(</p>
              </div>
            </div>
          </div>
          <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
            <div className="pb-6 grow">
              <Puzzle puzzle={puzzle} />
              <Grid
                solution={'error'}
                guesses={['added', 'geese', 'error']}
                currentGuess={''}
                isRevealing={false}
                currentRowClassName={''}
              />
            </div>

            <div className="flex space-x-2 justify-center">
              <a
                href="/"
                type="button"
                className="rounded inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out"
              >
                Go home
              </a>
            </div>
          </div>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
