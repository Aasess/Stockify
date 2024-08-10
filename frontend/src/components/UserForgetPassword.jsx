import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { Link } from 'react-router-dom'

//HELPERS
import { verifyStatus } from '../helpers'

//COMPONENT
import LogoDisplay from './LogoDisplay'

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
    <div className='unauthorized-container'>
    <Container className="mt-5">
      <LogoDisplay />

      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Form.Label>
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </Form.Label>

          <div>
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
          </div>
          <Form
            onSubmit={handleSubmit}
            className="d-flex align-items-baseline gap-3 mt-3"
          >
            <Form.Group controlId="formBasicEmail" className="mt-1 mb-3 w-100">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>

          <div className="mt-5 text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </div>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-decoration-none">
              Sign up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default UserForgetPassword
