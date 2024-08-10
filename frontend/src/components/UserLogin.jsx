import React, { useState } from 'react'
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap'

//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { Link, useNavigate } from 'react-router-dom'

//HELPERS
import { verifyStatus } from '../helpers'
import displayToast from '../helpers/displayToast'
import LogoDisplay from './LogoDisplay'

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const result = await UserAction.userLogin(formData)
      if (verifyStatus(result.status)) {
        navigate('/dashboard') // Redirect to a dashboard after successful login
      }
      setIsLoading(false)
    } catch (error) {
      displayToast('Failed to login user', 'error')
    }
  }

  return (
    <div className="unauthorized-container">
      <Container className="mt-5 ">
        <LogoDisplay />
        <Row className="w-100 justify-content-center mt-5">
          <Col md={7} lg={5}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-4 text-center">
                  Log in to your account
                </Card.Title>
                <Form onSubmit={handleSubmit} className="p-3">
                  <Form.Group className="mb-4" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Button type="submit" className="btn btn-primary w-100">
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                      </>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Form>

                <div className="mt-4 text-center">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="text-decoration-none">
                    Sign up
                  </Link>
                </div>

                <div className="mt-3 text-center">
                  <Link to="/forget-password" className="text-decoration-none">
                    Forget Password?
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default UserLogin
