import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createSelector } from '@reduxjs/toolkit'

// ✅ Memoized selector defined locally instead of importing
const selectFilteredAnecdotes = createSelector(
  [
    (state) => state.anecdotes,
    (state) => state.filter
  ],
  (anecdotes, filter) => {
    const filtered = !filter
      ? anecdotes
      : anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        )

    // Sort by votes
    return [...filtered].sort((a, b) => b.votes - a.votes)
  }
)

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(selectFilteredAnecdotes)

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: '10px' }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)} style={{ marginLeft: '10px' }}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
