import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  // Select both anecdotes and filter from the store
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes
    return anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteFor(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
