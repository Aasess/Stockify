import React, { useState } from 'react'
import { Form,Button,Card,Container,Row,Col} from 'react-bootstrap';

//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { Link, useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
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
      const result = await UserAction.userLogin(formData)
      if (result) {
        navigate('/dashboard') // Redirect to a dashboard after successful login
      }
    } catch (error) {
      console.error('There was an error logging in the user!', error)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: '#F5EEE6' }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={7} lg={5}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center">
                <b>LOGIN HERE!</b>
              </Card.Title>
              <Form onSubmit={handleSubmit} className="border p-3">
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>
                    <b>Username:</b>
                  </Form.Label>
                  <Form.Control
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>
                    <b>Password:</b>
                  </Form.Label>
                  <Form.Control
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="btn btn-primary w-100">
                  Login
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <Link to="/register">Don't have an account? Register here</Link>
              </div>

              <div className="mt-3 text-center">
                <Link to="/forget-password">Forget Password?</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default UserLogin
