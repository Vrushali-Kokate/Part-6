const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error('Failed to fetch anecdotes')
  return await res.json()
}

export const createNew = async (content) => {
  const object = { content, votes: 0 }
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  })
  if (!res.ok) throw new Error('Failed to create anecdote')
  return await res.json()
}

export const update = async (id, updatedAnecdote) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote),
  })
  if (!res.ok) throw new Error('Failed to update anecdote')
  return await res.json()
}

export default { getAll, createNew, update }
