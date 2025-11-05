import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { notification, setNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`Anecdote '${newAnecdote.content}' added!`, 5)
    },
    onError: (error) => {
      setNotification(error.message, 5)
    }
  })

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      )
      setNotification(`You voted '${updatedAnecdote.content}'`, 5)
    }
  })

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>anecdote service not available due to server problems</div>

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      {notification && <div style={{ border: '1px solid black', padding: 10 }}>{notification}</div>}

      <h4>create new</h4>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes} <button onClick={() => handleVote(anecdote)}>vote</button></div>
        </div>
      )}
    </div>
  )
}

export default App
