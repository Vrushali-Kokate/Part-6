import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      )
    },
  })

  const handleVote = (anecdote) => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(voted)
    dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
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
