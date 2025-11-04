
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial' }}>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: '10px' }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)} style={{ marginLeft: '10px' }}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
