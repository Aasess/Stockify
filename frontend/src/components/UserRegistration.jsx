import React, { useState } from 'react'
import { Form,Button,Card,Container,Row,Col} from 'react-bootstrap';


//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { useNavigate, Link } from 'react-router-dom'

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    try {
      const result = await UserAction.userRegistration(formData)
      if (result) {
        navigate('/login')
      }
    } catch (error) {
      console.error('There was an error registering the user!', error)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F5EEE6' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={5}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4 text-center"><b>USER REGISTRATION</b></Card.Title>
        <Form onSubmit={handleSubmit} className="border p-3" >
        <Form.Group className="mb-3" controlId="email"  >
                  <Form.Label ><b>Email:</b></Form.Label>
                  <Form.Control
              placeholder="name@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="username">
                  <Form.Label><b>Username:</b></Form.Label>
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
                  <Form.Label><b>Password:</b></Form.Label>
                  <Form.Control
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label><b>Confirm Password:</b></Form.Label>
                  <Form.Control
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            </Form.Group>
          <Button type="submit" variant="success" className="btn btn-primary w-100">
            Register
          </Button>
        </Form>
        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login here!</Link>
        </div>
    </Card.Body>
    </Card>
    </Col>
    </Row>
    </Container>
  );
};

export default UserRegistration
