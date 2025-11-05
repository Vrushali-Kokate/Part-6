import { createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const selectFilteredAnecdotes = createSelector(
  [(state) => state.anecdotes, (state) => state.filter],
  (anecdotes, filter) => {
    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
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
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
