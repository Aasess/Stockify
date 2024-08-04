import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
  Modal,
  Form,
  Dropdown,
  Pagination
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CategoryAction from '../../api/category/action'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({
    id: '',
    category_name: '',
  })
  const [isEdit, setIsEdit] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await CategoryAction.findAllCategory()
      setCategories(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the categories!', error)
    }
  }

  const handleSave = async () => {
    try {
      if (isEdit) {
        await CategoryAction.updateCategoryById(
          currentCategory.id,
          currentCategory
        )
      } else {
        await CategoryAction.createNewCategory(currentCategory)
      }
      fetchCategories()
      setShowModal(false)
    } catch (error) {
      console.error('There was an error saving the category!', error)
    }
  }

  const handleDelete = async () => {
    try {
      await CategoryAction.deleteCategoryById(categoryToDelete)
      fetchCategories()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('There was an error deleting the category!', error)
    }
  }

  const openEditModal = (category) => {
    setCurrentCategory(category)
    setIsEdit(true)
    setShowModal(true)
  }

  const openCreateModal = () => {
    setCurrentCategory({ id: '', category_name: '' })
    setIsEdit(false)
    setShowModal(true)
  }

  const openDeleteModal = (id) => {
    setCategoryToDelete(id)
    setShowDeleteModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentCategory({
      ...currentCategory,
      [name]: value,
    })
  }

  // Pagination logic
  const indexOfLastCategory = currentPage * itemsPerPage
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Category Management</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Categories</h4>
                <Button variant="success" onClick={openCreateModal}>
                  Create
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive striped bordered hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.category_name}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              as="div"
                              style={{
                                border: 'none',
                                background: 'none',
                                padding: 0,
                                cursor: 'pointer',
                              }}
                            >
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => openEditModal(category)}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="me-2"
                                />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                style={{ color: 'red' }}
                                onClick={() => openDeleteModal(category.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="me-2"
                                />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center mt-4">
                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                  />
                  {pageNumbers.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPage}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage(
                        currentPage < pageNumbers.length
                          ? currentPage + 1
                          : pageNumbers.length
                      )
                    }
                    disabled={currentPage === pageNumbers.length}
                  />
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEdit ? 'Edit Category' : 'Create Category'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formcategory_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  name="category_name"
                  value={currentCategory.category_name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this category?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Category
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default Category;


