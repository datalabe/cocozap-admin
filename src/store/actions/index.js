export const userAuthStatus = {
  auth_status: false,
}

export const currentNotification = {
  current_notification: {}
}

export const createModalStatus = {
  modal_status: false,
}

export const setAuth = (status) => ({
  type: "SET_AUTH",
  status,
})

export const setNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  notification,
})

export const setModalStatus = (status) => ({
  type: "SET_MODAL_STATUS",
  status,
})