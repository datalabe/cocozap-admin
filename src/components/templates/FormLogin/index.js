import React, { useState } from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { API } from "../../../services/API"

const FormLogin = ({ setUserAuth }) => {

  const [inputValues, changeInput] = useState({
    password: "",
    username: ""
  })

  const { password, username } = inputValues

  const onFormSubmit = () => {
    const body = {
      password,
      username
    }

    API.userLogin(body)
    .then(res => {
      if (res && res.auth) {
        setUserAuth()
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <Form size="large">
      <Segment>
        <Form.Input
          fluid
          icon="user"
          value={username}
          name="username"
          iconPosition="left"
          placeholder="Usuário"
          onChange={e =>
            changeInput({ ...inputValues, [e.target.name]: e.target.value })
          }
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          name="password"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e =>
            changeInput({ ...inputValues, [e.target.name]: e.target.value })
          }
        />
        <Button color="teal" fluid size="large" onClick={onFormSubmit}>
          Entrar
        </Button>
      </Segment>
    </Form>
  )
}

export default FormLogin
