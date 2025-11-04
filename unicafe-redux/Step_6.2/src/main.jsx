
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'

// Create Redux store
const store = configureStore(counterReducer)

const App = () => {
  const state = store.getState()

  return (
    <div style={{ margin: 20, fontSize: 18 }}>
      <div>
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={() => store.dispatch({ type: 'ZERO' })}>
          reset stats
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <p>good {state.good}</p>
        <p>ok {state.ok}</p>
        <p>bad {state.bad}</p>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
