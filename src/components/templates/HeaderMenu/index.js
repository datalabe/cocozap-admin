import React from "react"
import { connect } from "react-redux"
import { setModalStatus, setNotification } from "../../../store/actions"
import { Menu } from "semantic-ui-react"
import CreateModal from "../CreateModal"

const newEmptyNotification = {
  category: "",
  date: "",
  newImage: "",
  frequency: "",
  address: "",
  location: "",
  lat: "",
  long: "",
  triedToSolve: "",
  externalHelp: ""
}

const HeaderMenu = ({ handleLogout, modal_status, dispatch }) => {

  const onCloseModal = () => {
    dispatch(setModalStatus(false))
    dispatch(setNotification(newEmptyNotification))
  }

  return (
    <Menu pointing secondary color="teal">
      <Menu.Item name="notificações" active />
      <Menu.Item name="nova notificação" onClick={() => dispatch(setModalStatus(true))} />
      <Menu.Menu position="right">
        <Menu.Item name="sair" onClick={handleLogout} />
      </Menu.Menu>
      <CreateModal open={modal_status} onClose={() => onCloseModal()}/>
    </Menu>
  )
}

const mapStateToProps = store => ({ 
  modal_status: store.createModal.modal_status
})

export default connect(mapStateToProps)(HeaderMenu)
