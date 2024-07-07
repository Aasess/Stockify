import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { Link } from 'react-router-dom'

//HELPERS
import { verifyStatus } from '../helpers'

const UserForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = {
        email,
      }
      const result = await UserAction.userResetPasswordLink(formData)

      if (verifyStatus(result.status)) {
        setMessage(result.message)
        setError('')
      } else {
        setMessage('')
        setError(result.message)
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
          <h2>Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
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
          <div className="mt-3 text-center">
            <Link to="/login">Already have an account? Login here!</Link>
          </div>
          <div className="mt-3 text-center">
            <Link to="/register">Don't have an account? Register here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default UserForgetPassword
