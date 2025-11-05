import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [
    { id: 1, content: 'If it hurts, do it more often', votes: 0 },
    { id: 2, content: 'Adding manpower to a late project makes it later!', votes: 0 }
  ],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    addAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: Math.floor(Math.random() * 10000),
        votes: 0
      })
    }
  }
})

export const { voteFor, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
