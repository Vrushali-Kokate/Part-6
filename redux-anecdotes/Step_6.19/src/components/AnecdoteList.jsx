import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  // ✅ Memoize filtering & sorting so it doesn’t re-run unnecessarily
  const filteredAnecdotes = useMemo(() => {
    const lower = filter.toLowerCase()
    return [...anecdotes]
      .filter(a => a.content.toLowerCase().includes(lower))
      .sort((a, b) => b.votes - a.votes)
  }, [anecdotes, filter])

  const handleVote = (anecdote) => {
    dispatch(voteAnecdoteAsync(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
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
