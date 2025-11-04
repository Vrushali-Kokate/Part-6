import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [
    { id: 1, content: 'If it hurts, do it more often', votes: 0 },
    { id: 2, content: 'Adding manpower to a late software project makes it later!', votes: 0 }
  ],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(a => a.id === id ? { ...a, votes: a.votes + 1 } : a)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer   // ✅ this must be default export
