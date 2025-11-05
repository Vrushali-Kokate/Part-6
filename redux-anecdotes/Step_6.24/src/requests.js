const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Anecdote service not available')
  return response.json()
}

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    throw new Error('too short anecdote, must have length 5 or more')
  }
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  })
  if (!response.ok) throw new Error('Failed to create anecdote')
  return response.json()
}

export const updateAnecdote = async (updated) => {
  const response = await fetch(`${baseUrl}/${updated.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  })
  if (!response.ok) throw new Error('Failed to update anecdote')
  return response.json()
}
