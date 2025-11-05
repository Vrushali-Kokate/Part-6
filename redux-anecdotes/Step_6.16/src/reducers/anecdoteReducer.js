import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// Redux slice
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
      return state.map((a) => (a.id === updated.id ? updated : a))
    },
  },
})

// ✅ Export slice actions
export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

// ✅ Async action to initialize anecdotes
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// ✅ Async action to create new anecdote
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// ✅ Async action to vote anecdote
export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find((a) => a.id === id)
    const updatedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }
    const response = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote(response))
  }
}

// ✅ Export reducer as default
export default anecdoteSlice.reducer
