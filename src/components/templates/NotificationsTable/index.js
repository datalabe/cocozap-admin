import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Menu, Segment, Table, Icon, Loader } from "semantic-ui-react"

import { setModalStatus, setNotification } from "../../../store/actions"
import { API } from "../../../services/API"
import "./styles.scss"


const NotificationsTable = ({ dispatch, modal_status }) => {
  const [currentPage, changePage] = useState(1)
  const [notifications, _setNotifications] = useState([])
  const [numberOfPages, setNumberOfPages] = useState([])
  const [totalNumber, setTotalNumber] = useState(0)

  useEffect(() => {
    const body = {
      pageNumber: currentPage,
      size: 10
    }
    getNotifications(body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, modal_status])

  const getNotifications = body => {
    API.getNotifications(body)
      .then(res => {
        if (Array.isArray(res.message)) {
          _setNotifications(res.message)
          setTotalNumber(res.totalItems)
          setNumberOfPages(populateNumberPages(res.pages))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const changePageByButton = (direction) => {
    if (direction === 'left') {
      if (currentPage > 1) {
        changePage(currentPage-1)
      }
    }
    if (direction === 'right') {
      if (currentPage < numberOfPages.length) {
        changePage(currentPage+1)
      }
    }
  }

  const populateNumberPages = number => {
    const arrayOfNumbers = []
    for (let i = 1; i <= number; i++) {
      arrayOfNumbers.push(i)
    }
    return arrayOfNumbers
  }

  const onClickRow = (notification) => {
    dispatch(setModalStatus(true))
    dispatch(setNotification(notification))
  }

  if (notifications.length === 0) {
    return (
      <div className="loader">
        <Loader active inline='centered' />
      </div>
    )
  }

  return (
    <Segment className="tableWrapper">
      <Table color="yellow" padded fixed singleLine sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Categoria</Table.HeaderCell>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.HeaderCell>Imagem</Table.HeaderCell>
            <Table.HeaderCell>Frequência</Table.HeaderCell>
            <Table.HeaderCell>Endereço</Table.HeaderCell>
            <Table.HeaderCell>Localização</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Longitude</Table.HeaderCell>
            <Table.HeaderCell>Tentou Resolver</Table.HeaderCell>
            <Table.HeaderCell>Ajuda Externa</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {notifications.map(notification => {
            return (
              <Table.Row key={notification._id} className="tableRow" onClick={()=> onClickRow(notification)}>
                <Table.Cell>{notification.category}</Table.Cell>
                <Table.Cell>{notification.date}</Table.Cell>
                <Table.Cell>{notification.picture}</Table.Cell>
                <Table.Cell>{notification.frequency}</Table.Cell>
                <Table.Cell>{notification.address}</Table.Cell>
                <Table.Cell>{notification.location}</Table.Cell>
                <Table.Cell>{notification.lat}</Table.Cell>
                <Table.Cell>{notification.long}</Table.Cell>
                <Table.Cell>{notification.triedToSolve}</Table.Cell>
                <Table.Cell>{notification.externalHelp}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="10">
              <div className="amount">
                {`Total: ${totalNumber} notificações`}
              </div>
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon onClick={() => changePageByButton('left')}>
                  <Icon name="chevron left"/>
                </Menu.Item>
                {numberOfPages.map((page, index) => {
                  return (
                    <Menu.Item
                      active={page === currentPage}
                      key={Math.random()}
                      onClick={() => changePage(page)}
                      as="a"
                    >
                      {page}
                    </Menu.Item>
                  )
                })}
                <Menu.Item as="a" icon onClick={() => changePageByButton('right')}>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  )
}

const mapStateToProps = store => ({ 
  modal_status: store.createModal.modal_status
})

export default connect(mapStateToProps)(NotificationsTable)
