import { createSlice } from '@reduxjs/toolkit'

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
      return state.map(a => a.id === updated.id ? updated : a)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// --- Async Actions (using Fetch API) ---

export const initializeAnecdotes = () => {
  return async dispatch => {
    const res = await fetch('http://localhost:3001/anecdotes')
    const data = await res.json()
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = { content, votes: 0 }
    const res = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote)
    })
    const data = await res.json()
    dispatch(appendAnecdote(data))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

    const res = await fetch(`http://localhost:3001/anecdotes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnecdote)
    })
    const data = await res.json()
    dispatch(updateAnecdote(data))
  }
}
