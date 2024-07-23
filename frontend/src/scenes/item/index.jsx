import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Modal,
} from 'react-bootstrap'

import ItemAction from '../../api/item/action'
import VendorAction from '../../api/vendor/action'
import CategoryAction from '../../api/category/action'

import NavbarComponent from '../../components/NavbarComponent'
import ItemForm from './itemForm'

const Item = () => {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [vendors, setVendors] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [showModal, setShowModal] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [editItem, setEditItem] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState(null)

  const fetchItems = async () => {
    try {
      const data = await ItemAction.findAllItem()
      setItems(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the items!', error)
    }
  }

  const findAllCategoryDropDown = async () => {
    try {
      const data = await CategoryAction.findAllCategoryDropDown()
      setCategories(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the categorys!', error)
    }
  }

  const fetchVendorsDropDown = async () => {
    try {
      const data = await VendorAction.findAllVendorsDropDown()
      setVendors(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the vendors!', error)
    }
  }

  const handleCreate = () => {
    setShowModal(true)
    setEditItem(null)
    setNewItemName('')
  }

  const handleClose = () => {
    setShowModal(false)
    setShowDeleteModal(false)
  }

  const handleSave = async (payload) => {
    try {
      const formData = {
        item_name: payload?.itemName,
        sku: payload?.sku,
        category_id: Number(payload?.selectedCategory),
        vendor_id: Number(payload?.selectedVendor),
      }

      if (editItem) {
        await ItemAction.updateItemById(editItem.id, formData)
      } else {
        await ItemAction.createNewItem(formData)
      }
      fetchItems()
      handleClose()
    } catch (error) {
      console.error('There was an error saving the item!', error)
    }
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setNewItemName(item.item_name)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setDeleteItemId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      await ItemAction.deleteItemById(deleteItemId)
      fetchItems()
      handleClose()
    } catch (error) {
      console.error('There was an error deleting the item!', error)
    }
  }

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const nextPage = () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const maxPageNumbersToShow = 5
  const startPageIndex = Math.max(
    currentPage - Math.floor(maxPageNumbersToShow / 2),
    0
  )
  const endPageIndex = Math.min(
    startPageIndex + maxPageNumbersToShow,
    pageNumbers.length
  )

  const generateVendorName = (id) => {
    return vendors.find((vendor) => vendor.id === Number(id))?.name
  }

  const generateCategoryName = (id) => {
    return categories.find((category) => category.id === Number(id))
      ?.category_name
  }

  const generateStatus = (status) => {
    const isStock = Boolean(status)
    const styles = {
      color: isStock ? 'rgb(3 130 38)' : 'rgb(183, 29, 24)',
      backgroundColor: isStock
        ? 'rgb(60 249 34 / 16%)'
        : 'rgba(255, 86, 48, 0.16)',
    }
    return (
      <div className="custom-badge" style={styles}>
        {isStock ? 'In Stock' : 'Sold'}
      </div>
    )
  }
  useEffect(() => {
    Promise.all([
      fetchItems(),
      findAllCategoryDropDown(),
      fetchVendorsDropDown(),
    ])
  }, [])

  return (
    <div>
      <NavbarComponent />
      <Container
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: '#F5EEE6' }}
      >
        <Row className="w-100 justify-content-center">
          <Col md={10} lg={8}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Card.Title>
                    <b>Items</b>
                  </Card.Title>
                  <Button variant="success" onClick={handleCreate}>
                    Create
                  </Button>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Vendor</th>
                      <th>Remaining Qty</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.item_name}</td>
                        <td>{generateCategoryName(item.category_id)}</td>
                        <td>{generateVendorName(item.vendor_id)}</td>
                        <td>{item.remaining_quantity}</td>
                        <td>{generateStatus(item.is_stock)}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleEdit(item)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  />
                  {pageNumbers
                    .slice(startPageIndex, endPageIndex)
                    .map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                  <Pagination.Next
                    onClick={nextPage}
                    disabled={
                      currentPage === Math.ceil(items.length / itemsPerPage)
                    }
                  />
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {showModal && (
          <ItemForm
            {...{
              categories,
              vendors,
              showModal,
              handleClose,
              handleSave,
              editItem,
            }}
          />
        )}

        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default Item
