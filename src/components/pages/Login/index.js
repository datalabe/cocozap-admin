import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { setAuth } from "../../../store/actions"
import { Grid, Header } from "semantic-ui-react"
import FormLogin from "../../templates/FormLogin"

const Login = ({ dispatch, userAuth }) => {

  const setUserAuth = () => {
    dispatch(setAuth(true))
  }

  if (userAuth) {
    return <Redirect to={"/dashboard"} />
  } 

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 420 }}>
        <Header as="h2" color="teal" textAlign="center">
          Cocozap Admin
        </Header>
        <FormLogin setUserAuth={setUserAuth} />
      </Grid.Column>
    </Grid>
  )
}

const mapStateToProps = store => ({
  userAuth: store.userAuth.auth_status,
})

export default connect(mapStateToProps)(Login)
