// src/reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [
    {
      content: 'If it hurts, do it more often',
      id: '1',
      votes: 4
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: '2',
      votes: 0
    }
  ],
  reducers: {
    addAnecdote: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(content) {
        return {
          payload: {
            content,
            id: nanoid(),
            votes: 0
          }
        }
      }
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
    }
  }
})

export const { addAnecdote, vote } = anecdoteSlice.actions

// Action creators used by components:
export const createAnecdote = (content) => {
  return dispatch => {
    dispatch(addAnecdote(content))
  }
}

export const voteAnecdote = (id) => {
  return dispatch => {
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer
