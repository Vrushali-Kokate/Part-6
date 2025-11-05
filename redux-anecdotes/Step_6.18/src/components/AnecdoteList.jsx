import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  // Select state
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  // ✅ useMemo to avoid creating new arrays each render
  const filteredAnecdotes = useMemo(() => {
    const filtered = anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
    return [...filtered].sort((a, b) => b.votes - a.votes)
  }, [anecdotes, filter])

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const handleVote = (anecdote) => {
  dispatch(voteAnecdote(anecdote))
  dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
}


  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: 10 }}>
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
