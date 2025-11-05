import { createSlice } from '@reduxjs/toolkit'

// Base URL of your backend (for example, json-server)
const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map((a) => (a.id !== updated.id ? a : updated))
    },
  },
})

export const { setAnecdotes, addAnecdote, updateAnecdote } = anecdoteSlice.actions

// ✅ Async thunk to load anecdotes
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const res = await fetch(baseUrl)
    const anecdotes = await res.json()
    dispatch(setAnecdotes(anecdotes))
  }
}

// ✅ Async thunk to create a new anecdote
export const appendAnecdoteAsync = (content) => {
  return async (dispatch) => {
    const newAnecdote = { content, votes: 0 }
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote),
    })
    const data = await res.json()
    dispatch(addAnecdote(data))
  }
}

// ✅ Async thunk to vote and update backend
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    // Update the backend
    const res = await fetch(`${baseUrl}/${anecdote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnecdote),
    })

    const data = await res.json()
    dispatch(updateAnecdote(data))
  }
}

export default anecdoteSlice.reducer
