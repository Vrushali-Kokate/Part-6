
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer'
import './index.css'

// create Redux store
const store = configureStore(counterReducer)

const App = () => {
  const state = store.getState()

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Unicafe Feedback Counter</h2>

      <p>Good: {state.good}</p>
      <p>Ok: {state.ok}</p>
      <p>Bad: {state.bad}</p>

      <button onClick={() => store.dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>Ok</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={() => store.dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
