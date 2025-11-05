import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h3>Add new</h3>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
