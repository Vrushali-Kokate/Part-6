
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log('Action received:', action)

  switch (action.type) {
    case 'GOOD':
      // return a new state with good incremented by 1
      return {
        ...state,
        good: state.good + 1
      }
    case 'OK':
      // return a new state with ok incremented by 1
      return {
        ...state,
        ok: state.ok + 1
      }
    case 'BAD':
      // return a new state with bad incremented by 1
      return {
        ...state,
        bad: state.bad + 1
      }
    case 'RESET':
      // return initial state (all zero)
      return initialState
    default:
      // if action is unknown, return current state as it is
      return state
  }
}

export default counterReducer
