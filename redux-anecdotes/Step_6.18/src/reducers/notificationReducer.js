import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) { return action.payload },
    clearNotification() { return null }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

// thunk: show message for `time` seconds
export const setNotification = (message, time = 5) => {
  return dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
}

export default notificationSlice.reducer
