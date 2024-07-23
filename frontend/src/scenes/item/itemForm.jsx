import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

const ItemForm = ({
  categories,
  vendors,
  showModal,
  handleClose,
  handleSave,
  editItem,
}) => {
  const [state, setState] = useState({
    itemName: '',
    selectedCategory: '',
    selectedVendor: '',
    sku: '',
  })
  const generateSku = (categoryId) => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const categoryPrefix = categories
      .find((category) => category.id === Number(categoryId))
      ?.category_name.substring(0, 5)
      .toUpperCase()
    return `${categoryPrefix}${dateStr}`
  }

  const handleChange = (name, value) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'selectedCategory' && { sku: generateSku(value) }),
    }))
  }

  useEffect(() => {
    if (editItem) {
      const newState = {
        sku: editItem.sku,
        itemName: editItem.item_name,
        selectedCategory: editItem.category_id,
        selectedVendor: editItem.vendor_id,
      }
      setState(newState)
    }
  }, [editItem])

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editItem ? 'Edit Item' : 'Add New Item'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSku" className="mb-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              placeholder="SKU will be auto generated"
              value={state.sku}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formItemName" className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              name="itemName"
              placeholder="Enter item name"
              value={state.itemName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="selectedCategory"
              value={state.selectedCategory}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formVendor" className="mb-3">
            <Form.Label>Vendor</Form.Label>
            <Form.Control
              as="select"
              name="selectedVendor"
              value={state.selectedVendor}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <option value="">Select vendor</option>
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave(state)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ItemForm


