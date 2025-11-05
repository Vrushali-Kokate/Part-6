import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => (
  <div>
    <h1>Anecdotes</h1>
    <Notification />
    <Filter />
    <AnecdoteForm />
    <AnecdoteList />
  </div>
)

export default App
