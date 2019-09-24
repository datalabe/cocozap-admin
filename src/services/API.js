import { API_URL } from "../utils/constants"

export const API = {
  userLogin: body => {
    return post(`/auth`, body, "json")
  },
  getNotifications: body => {
    return post(`/notifications/pagination`, body, "json")
  },
  createNotification: body => {
    return post(`/notifications`, body)
  },
  editNotificationWithImage: (body, id) => {
    return put(`/notifications/${id}`, body)
  },
  editNotification: (body, id) => {
    return patch(`/notifications/${id}`, body)
  },
  deleteNotification: (id) => {
    return deleteMethod(`/notifications/${id}`)
  },
}

const post = (url, body, type) => {
  let headers

  if (type === "json") {
    headers = {
      "Content-Type": "application/json"
    }
  }

  return fetch(`${API_URL}${url}`, {
    method: "POST",
    headers,
    body: type === "json" ? JSON.stringify(body) : body
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return error
    })
}

const patch = (url, body) => {
  return fetch(`${API_URL}${url}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return error
    })
}

const put = (url, body) => {
  return fetch(`${API_URL}${url}`, {
    method: "PUT",
    body
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return error
    })
}

const deleteMethod = (url) => {
  return fetch(`${API_URL}${url}`, {
    method: "DELETE",
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return error
    })
}
