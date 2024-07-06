// src/components/UserResetPassword.js

import React, { useState } from 'react'

import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { useParams, Link, useNavigate } from 'react-router-dom'

//HELPERS
import { verifyStatus } from '../helpers'

const UserResetPassword = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
        const formData = {
            password,
            confirmationPassword: confirmPassword
          }
          const result = await UserAction.userResetPassword(id, formData)

      if (verifyStatus(result.status)) {
        setMessage('Password reset successful. You can now log in.')
        setError('')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setMessage('')
        setError(result.message || 'Failed to reset password')
      }
    } catch (err) {
      setMessage('')
      setError('Something went wrong. Please try again later.')
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Reset Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Reset Password
            </Button>
          </Form>
          {message && (
            <Alert variant="success" className="mt-3">
              {message}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          <p className="mt-3">
            <Link to="/login">Back to Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default UserResetPassword
