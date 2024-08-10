import React, { useState } from 'react'

import { Button, Row, Col, Form } from 'react-bootstrap'
import { Search } from 'lucide-react'
import Select from 'react-select'

const Filter = ({ handleFilter, options }) => {
  //filterstate
  const [filterState, setFilterState] = useState({
    item: null,
    qty: '',
  })

  const handleFilterChange = (e) => {
    setFilterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleChange = (selectedOption) => {
    handleFilterChange({
      target: { name: 'item', value: selectedOption?.id || null },
    })
  }

  const selectedOption = options.find(
    (option) => option.value === filterState.item
  )

  return (
    <Row className="mb-4 align-items-center">
      <Col md={5}>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          getOptionLabel={(item) => item.item_name}
          getOptionValue={(item) => item.id}
          isClearable
        />
      </Col>

      <Col md={3}>
        <Form.Control
          type="number"
          name="qty"
          placeholder="Enter quantity"
          value={filterState.qty}
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
