// src/main.jsx
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import App from './App'
import './index.css'

const store = configureStore(anecdoteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
