import React, { useState } from 'react'

import { Button, Row, Col, Form } from 'react-bootstrap'
import { Search } from 'lucide-react'

import Select from 'react-select'

const Filter = ({ handleFilter }) => {
  //filterstate
  const [filterState, setFilterState] = useState({
    name: '',
    status: null,
  })

  const handleFilterChange = (e) => {
    setFilterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleChange = (selectedOption) => {
    handleFilterChange({
      target: { name: 'status', value: selectedOption?.value || null },
    })
  }

  const options = [
    {
      value: 'inStock',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'green',
              marginRight: '8px',
            }}
          ></div>
          In Stock
        </div>
      ),
    },
    {
      value: 'outOfStock',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'red',
              marginRight: '8px',
            }}
          ></div>
          Out of Stock
        </div>
      ),
    },
  ]

  const selectedOption = options.find(
    (option) => option.value === filterState.status
  )

  return (
    <Row className="mb-4 align-items-center">
      <Col md={4}>
        <Form.Control
          type="text"
          name="name"
          placeholder="Search by Item Name"
          value={filterState.name}
          onChange={handleFilterChange}
        />
      </Col>
      <Col md={3}>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          isClearable
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
