import { currentNotification } from "../actions"

const _currentNotification = (state = currentNotification, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        current_notification: action.notification,
      }
    default:
      return state
  }
}

export default _currentNotification
