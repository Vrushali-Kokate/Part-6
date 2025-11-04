// src/reducers/anecdoteReducer.js

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Premature optimization is the root of all evil.'
]

const getId = () => Math.floor(Math.random() * 1000000)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
})

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    }
    default:
      return state
  }
}

// Action creator
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export default anecdoteReducer
