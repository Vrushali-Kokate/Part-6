import { createSlice } from '@reduxjs/toolkit'

// URL of your backend (from json-server)
const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id !== updated.id ? a : updated)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

// ✅ Asynchronous actions (Redux Thunks)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await fetch(baseUrl)
    const data = await response.json()
    dispatch(setAnecdotes(data))
  }
}

export const appendAnecdoteAsync = (content) => {
  return async dispatch => {
    const newAnecdote = { content, votes: 0 }
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote)
    })
    const data = await response.json()
    dispatch(appendAnecdote(data))
  }
}

export const voteAnecdoteAsync = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnecdote)
    })
    const data = await response.json()
    dispatch(updateAnecdote(data))
  }
}

export default anecdoteSlice.reducer
