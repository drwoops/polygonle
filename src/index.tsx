import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ReactGA from 'react-ga4'
import ErrorBoundary from './ErrorBoundary'
import reportWebVitals from './reportWebVitals'
import { AlertProvider } from './context/AlertContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GA_MEASUREMENT_ID } from './constants/settings'
ReactGA.initialize(GA_MEASUREMENT_ID)

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/:puzzleId/:seed" element={<App />} />
            <Route path="/:puzzleId" element={<App />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
