
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial', margin: '20px' }}>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
