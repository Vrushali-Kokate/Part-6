const baseUrl = 'http://localhost:3001/anecdotes'

// Fetch all anecdotes
const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Failed to fetch anecdotes')
  return await response.json()
}

// Create new anecdote
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object)
  })
  if (!response.ok) throw new Error('Failed to create anecdote')
  return await response.json()
}

// Update votes
const updateVote = async (id, changedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changedAnecdote)
  })
  if (!response.ok) throw new Error('Failed to update vote')
  return await response.json()
}

export default { getAll, createNew, updateVote }
