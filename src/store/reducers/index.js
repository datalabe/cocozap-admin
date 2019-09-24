import { combineReducers } from "redux"
import userAuth from "./userAuth"
import notification from "./notification"
import createModal from "./createModal"

export default combineReducers({
  userAuth,
  notification,
  createModal
})
