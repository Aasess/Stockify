import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center fixed-top"
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: 99,
        color: '#fff',
        cursor: 'wait',
      }}
    >
      <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Container>
  )
}

export default Loader
