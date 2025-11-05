
import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (!content) return
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added: "${content}"`, 5))
  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
