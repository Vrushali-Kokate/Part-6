import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (!state.filter) return state.anecdotes
    return state.anecdotes.filter(a =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: 10 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
