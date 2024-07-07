import React, { useState } from 'react'
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Modal,
  Form,
} from 'react-bootstrap'
import NavbarComponent from '../../components/NavbarComponent'

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
    { id: 6, name: 'Category 6' },
    { id: 7, name: 'Category 7' },
    { id: 8, name: 'Category 8' },
    { id: 9, name: 'Category 9' },
    { id: 10, name: 'Category 10' },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const categoriesPerPage = 5
  const [showModal, setShowModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editCategory, setEditCategory] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState(null)

  const handleCreate = () => {
    setShowModal(true)
    setEditCategory(null)
    setNewCategoryName('')
  }

  const handleClose = () => {
    setShowModal(false)
    setShowDeleteModal(false)
  }

  const handleSave = () => {
    if (editCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editCategory.id ? { ...cat, name: newCategoryName } : cat
        )
      )
    } else {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
      }
      setCategories([...categories, newCategory])
    }
    handleClose()
  }

  const handleEdit = (category) => {
    setEditCategory(category)
    setNewCategoryName(category.name)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setDeleteCategoryId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== deleteCategoryId))
    handleClose()
  }

  // Get current categories
  const indexOfLastCategory = currentPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const nextPage = () => {
    if (currentPage < Math.ceil(categories.length / categoriesPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
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
                    <b>Categories</b>
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleEdit(category)}
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(category.id)}
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
                      currentPage ===
                      Math.ceil(categories.length / categoriesPerPage)
                    }
                  />
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editCategory ? 'Edit Category' : 'Add New Category'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCategoryName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this category?
          </Modal.Body>
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

export default Category
