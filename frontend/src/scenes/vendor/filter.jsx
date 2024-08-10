import React, { useState } from 'react'

import { Button, Row, Col, Form } from 'react-bootstrap'
import { Search } from 'lucide-react'

const Filter = ({ handleFilter }) => {
  //filterstate
  const [filterState, setFilterState] = useState({
    name: '',
  })

  const handleFilterChange = (e) => {
    setFilterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Row className="mb-4 align-items-center">
      <Col md={4}>
        <Form.Control
          type="text"
          name="name"
          placeholder="Search by Vendor Name"
          value={filterState.name}
          onChange={handleFilterChange}
        />
      </Col>

      <Col md={4}>
        <Button
          variant="secondary"
          onClick={() => handleFilter(filterState)}
          size="md"
          className="d-flex gap-2 align-items-center"
        >
          <Search color="#fff" size={18} />
          <span>Search</span>
        </Button>
      </Col>
    </Row>
  )
}

export default Filter
