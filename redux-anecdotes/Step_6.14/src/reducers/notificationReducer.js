import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer

// Thunk for showing notification for 5 seconds
export const setNotification = (message, time = 5) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}
