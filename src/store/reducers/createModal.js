import { createModalStatus } from "../actions"

const _currentModalStatus = (state = createModalStatus, action) => {
  switch (action.type) {
    case "SET_MODAL_STATUS":
      return {
        modal_status: action.status,
      }
    default:
      return state
  }
}

export default _currentModalStatus
