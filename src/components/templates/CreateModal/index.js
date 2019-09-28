import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { Form, Modal, Button, Select } from "semantic-ui-react"
import { API } from "../../../services/API"
import options from "./optionsCategory"
import "./styles.scss"

const CreateModal = ({ open, onClose, current_notification }) => {
  const [form, onChangeForm] = useState(current_notification)
  const [newImage, setNewImage] = useState()
  const [displayImage, setDisplayImage] = useState()
  const existentNotification = form._id ? true : false

  useEffect(() => {
    onChangeForm(current_notification)
  }, [current_notification])

  const createNewNotification = () => {
    const newNotification = {
      ...form,
      picture: newImage
    }

    const body = new FormData()

    for (let key in newNotification) {
      body.append(key, newNotification[key])
    }

    API.createNotification(body).then(res => {
      onClose()
    })
  }

  const handleInputImageChange = e => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0])
      const newDisplayImage = window.URL.createObjectURL(e.target.files[0])
      setDisplayImage(newDisplayImage)
      onChangeForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const editNotification = () => {
    if (newImage) {
      const newNotification = {
        ...form,
        picture: newImage
      }

      const body = new FormData()

      for (let key in newNotification) {
        body.append(key, newNotification[key])
      }

      API.editNotificationWithImage(body, form._id).then(res => {
        onClose()
      })
    } else {
      API.editNotification(form, form._id).then(res => {
        onClose()
      })
    }
  }

  const onSubmit = () => {
    if (existentNotification) {
      editNotification()
    } else {
      createNewNotification()
    }
    onClose()
  }

  const deleteNotification = () => {
    API.deleteNotification(form._id).then(res => {
      onClose()
    })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>{`${
        existentNotification ? "Editar" : "Criar"
      } Notificação`}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field
              control={Select}
              label="Categoria"
              options={options}
              name="category"
              placeholder="Categoria"
              value={form.category}
              onChange={(e, { name, value }) =>
                onChangeForm({ ...form, [name]: value })
              }
            />
            <Form.Field>
              <label>Data</label>
              <div className="instruction">
                (formato invertido sem separações, exemplo: 20191231)
              </div>
              <input
                placeholder="Data"
                name="date"
                value={form.date}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Descrição</label>
              <textarea
                name="description"
                value={form.description || ""}
                placeholder="Descrição"
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              {existentNotification ? (
                <>
                  <label>Imagem atual</label>
                  <a
                    href={form.picture}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="existingImage"
                      src={displayImage ? displayImage : form.picture}
                      alt="imagem do caso"
                    />
                  </a>
                </>
              ) : null}

              <label>
                {existentNotification ? `Escolher nova imagem` : `Imagem`}
              </label>
              <input
                placeholder="Imagem"
                type="file"
                accept="image/png, image/jpeg"
                name="picture"
                onChange={e => handleInputImageChange(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Frequência</label>
              <input
                placeholder="Frequência"
                name="frequency"
                value={form.frequency}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Endereço</label>
              <input
                placeholder="Endereço"
                name="address"
                value={form.address}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Localização</label>
              <input
                placeholder="Localização"
                name="location"
                value={form.location}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Latitude</label>
              <input
                placeholder="Latitude"
                name="lat"
                value={form.lat}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Longitude</label>
              <input
                placeholder="Longitude"
                name="long"
                value={form.long}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Tentou Resolver</label>
              <input
                placeholder="Tentou Resolver"
                name="triedToSolve"
                value={form.triedToSolve}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Ajuda externa</label>
              <input
                placeholder="Ajuda externa"
                name="externalHelp"
                value={form.externalHelp}
                onChange={e =>
                  onChangeForm({ ...form, [e.target.name]: e.target.value })
                }
              />
            </Form.Field>
            <div className="bottomButtons">
              <Button type="submit" onClick={() => onSubmit()}>
                {existentNotification ? `Editar` : `Criar`}
              </Button>
              {existentNotification ? (
                <Button
                  className="deleteItem"
                  color="red"
                  onClick={() => deleteNotification()}
                >
                  Deletar
                </Button>
              ) : null}
            </div>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = store => ({
  current_notification: store.notification.current_notification
})

export default connect(mapStateToProps)(CreateModal)
