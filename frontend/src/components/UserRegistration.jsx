import React, { useState } from 'react'
import { Form,Button,Card,Container,Row,Col} from 'react-bootstrap';


//API
import UserAction from '../api/user/action'

//ROUTER-DOM
import { useNavigate, Link } from 'react-router-dom'
import displayToast from '../helpers/displayToast'
import { validateEmail } from '../helpers/validateEmail'
import LogoDisplay from './LogoDisplay'

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

    if (!validateEmail(formData.email)) {
      displayToast('Invalid Email Format', 'error')
    }

    if (formData.password !== formData.confirmPassword) {
      displayToast('Passwords do not match!', 'error')
      return
    }
    try {
      const result = await UserAction.userRegistration(formData)
      if (result.status === 'success') {
        navigate('/login')
      }
    } catch (error) {
      console.error('There was an error registering the user!', error)
    }
  }

  return (
    <div className="unauthorized-container">
      <Container className="mt-5">
        <LogoDisplay />
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={8} sm={12}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-4 text-center">
                  Create a free account now
                </Card.Title>

                <Form onSubmit={handleSubmit} className="p-3">
                  <div className="d-flex justify-content-between w-100 flex-wrap">
                    <Form.Group
                      className="mb-3 col-md-12 col-lg-6"
                      controlId="email"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 col-md-12 col-lg-5"
                      controlId="username"
                    >
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
                  </div>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
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
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      placeholder="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="btn btn-primary w-100">
                    Register
                  </Button>
                </Form>
                <div className="mt-5 text-center">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-decoration-none">
                    Login here
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

export default UserRegistration
