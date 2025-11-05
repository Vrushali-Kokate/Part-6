import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false, // only one attempt, to easily trigger the error UI
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={data} />
    </div>
  )
}

export default App
