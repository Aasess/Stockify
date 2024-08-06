import React, { useState, useEffect } from 'react';
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
import VendorAction from '../../api/vendor/action'
import displayToast from '../../helpers/displayToast'
import AuthorizeRoleComponent from '../../components/AuthorizeRoleComponent'

const Vendor = () => {
  const [vendors, setVendors] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentVendor, setCurrentVendor] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
  })
  const [isEdit, setIsEdit] = useState(false)
  const [vendorToDelete, setVendorToDelete] = useState(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    try {
      const data = await VendorAction.findAllVendor()
      setVendors(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the vendors!', error)
    }
  }

  const handleSave = async () => {
    try {
      let status
      if (isEdit) {
        status = await VendorAction.updateVendorById(
          currentVendor.id,
          currentVendor
        )
      } else {
        status = await VendorAction.createNewVendor(currentVendor)
      }

      if (status === 'success') {
        fetchVendors()
        setShowModal(false)
      }
    } catch (error) {
      displayToast('There was an error saving the vendor!', 'error')
      console.error('There was an error saving the vendor!', error)
    }
  }

  const handleDelete = async () => {
    try {
      await VendorAction.deleteVendorById(vendorToDelete)
      fetchVendors()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('There was an error deleting the vendor!', error)
    }
  }

  const openEditModal = (vendor) => {
    setCurrentVendor(vendor)
    setIsEdit(true)
    setShowModal(true)
  }

  const openCreateModal = () => {
    setCurrentVendor({ id: '', name: '', address: '', phone: '' })
    setIsEdit(false)
    setShowModal(true)
  }

  const openDeleteModal = (id) => {
    setVendorToDelete(id)
    setShowDeleteModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentVendor({
      ...currentVendor,
      [name]: value,
    })
  }

  // Pagination logic
  const indexOfLastVendor = currentPage * itemsPerPage
  const indexOfFirstVendor = indexOfLastVendor - itemsPerPage
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(vendors.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Vendor Management</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Vendors</h4>
                <AuthorizeRoleComponent>
                  <Button variant="success" onClick={openCreateModal}>
                    Create
                  </Button>
                </AuthorizeRoleComponent>
              </Card.Header>
              <Card.Body>
                <Table responsive striped bordered hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVendors.map((vendor, index) => (
                      <tr key={vendor.id}>
                        <td>{index + 1}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.address}</td>
                        <td>{vendor.phone}</td>
                        <td>
                          <AuthorizeRoleComponent>
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
                                  onClick={() => openEditModal(vendor)}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="me-2"
                                  />
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  style={{ color: 'red' }}
                                  onClick={() => openDeleteModal(vendor.id)}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="me-2"
                                  />
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </AuthorizeRoleComponent>
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
              {isEdit ? 'Edit Vendor' : 'Create Vendor'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={currentVendor.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAddress" className="mt-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={currentVendor.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={currentVendor.phone}
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
          <Modal.Body>Are you sure you want to delete this vendor?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Vendor
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default Vendor;


