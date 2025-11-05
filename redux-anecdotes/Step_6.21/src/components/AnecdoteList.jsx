const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
