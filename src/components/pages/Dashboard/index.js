import React from "react"
import { connect } from "react-redux"
import { setAuth } from "../../../store/actions"
import NotificationsTable from "../../templates/NotificationsTable"
import HeaderMenu from "../../templates/HeaderMenu"

const Dashboard = ({ dispatch }) => {
  const handleLogout = () => {
    return dispatch(setAuth(false))
  }

  return (
    <div className="dashboardWrapper">
      <HeaderMenu handleLogout={handleLogout} />
      <NotificationsTable />
    </div>
  )
}

export default connect()(Dashboard)
