import React from 'react'
import { connect } from "react-redux"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { PrivateRoute } from "./helpers/PrivateRoute"
import Login from "./components/pages/Login"
import Dashboard from "./components/pages/Dashboard"

const App = props => {
  const { userAuth } = props
  return (
    <Router>
      <Switch>
      <Route
        path="/"
        exact
        {...props}
        render={props => <Login {...props} />}
      />
      <Route
        path="/login"
        {...props}
        render={props => <Login {...props} />}
      />
      <PrivateRoute
        exact
        path="/dashboard"
        component={Dashboard}
        userAuth={userAuth}
        {...props}
      />
      </Switch>
    </Router>
  )
}

const mapStateToProps = store => ({
  userAuth: store.userAuth.auth_status,
})

export default connect(mapStateToProps)(App)
