import React, { useState } from 'react'

import { Button, Modal, Form } from 'react-bootstrap'
import UserAction from '../../api/user/action'
import displayToast from '../../helpers/displayToast'

const ChangePasswordModal = ({ id, show, handleClose }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmationPassword: '',
  })

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmationPassword) {
      displayToast("Password doesn't match", 'error')
      return
    }
    try {
      const result = await UserAction.userChangePassword(id, formData)
      if (result) {
        handleClose()
      }
    } catch (error) {
      displayToast('There was an error changing the user password!', 'error')
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmationPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmationPassword"
              value={formData.confirmationPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChangePasswordModal
