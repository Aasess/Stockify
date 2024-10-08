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
  Pagination,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import SaleAction from '../../api/sale/action'
import ItemAction from '../../api/item/action'
import NoRecordFound from '../../components/NoRecordFound'
import displayToast from '../../helpers/displayToast'
import AuthorizeRoleComponent from '../../components/AuthorizeRoleComponent'
import Loader from '../../components/Loader'
import Filter from './filter';

const Sale = () => {
  const [sales, setSales] = useState([])
  const [items, setItems] = useState([])
  const [filteredSales, setFilteredSales] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentSale, setCurrentSale] = useState({
    id: '',
    item: '',
    price: '',
    sold_quantity: '',
  })
  const [isEdit, setIsEdit] = useState(false)
  const [saleToDelete, setSaleToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchSales = async () => {
    try {
      setIsLoading(true)
      const data = await SaleAction.findAllSales()
      setSales(data ?? [])
      setFilteredSales(data ?? [])
      setIsLoading(false)
    } catch (error) {
      console.error('There was an error fetching the sales!', error)
    }
  }

  const handleFilter = (payload) => {
    const filteredStocks = sales.filter((sale) => {
      const itemMatches = payload.item ? sale.item_id === payload.item : true

      const qtyMatches = payload.qty
        ? sale.sold_quantity === Number(payload.qty)
        : true
      return itemMatches && qtyMatches
    })

    setFilteredSales(filteredStocks)
  }

  const fetchItems = async () => {
    try {
      const data = await ItemAction.findAllItem()
      setItems(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the items!', error)
    }
  }

  const generateItemName = (id) => {
    return items.find((item) => item.id === Number(id))?.item_name
  }

  const handleSave = async () => {
    try {
      const formData = {
        item_id: Number(currentSale.item),
        price: Number(currentSale.price),
        sold_quantity: Number(currentSale.sold_quantity),
      }
      let status
      if (isEdit) {
        status = await SaleAction.updateSaleById(currentSale.id, formData)
      } else {
        status = await SaleAction.createNewSale(formData)
      }
      if (status === 'success') {
        fetchSales()
        setShowModal(false)
      }
    } catch (error) {
      displayToast('There was an error saving the sale!', 'error')
      console.error('There was an error saving the sale!', error)
    }
  }

  const handleDelete = async () => {
    try {
      await SaleAction.deleteSaleById(saleToDelete)
      fetchSales()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('There was an error deleting the sale!', error)
    }
  }

  const openEditModal = (sale) => {
    const newState = {
      item: sale.item_id,
      ...sale,
    }
    setCurrentSale(newState)
    setIsEdit(true)
    setShowModal(true)
  }

  const openCreateModal = () => {
    setCurrentSale({ id: '', item: '', price: '', sold_quantity: '' })
    setIsEdit(false)
    setShowModal(true)
  }

  const openDeleteModal = (id) => {
    setSaleToDelete(id)
    setShowDeleteModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentSale({
      ...currentSale,
      [name]: value,
    })
  }

  useEffect(() => {
    Promise.all([fetchItems(), fetchSales()])
  }, [])

  // Pagination logic
  const indexOfLastSale = currentPage * itemsPerPage
  const indexOfFirstSale = indexOfLastSale - itemsPerPage
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(sales.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h2 className="text-center">Sale Management</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Sales</h4>
                  <Button variant="success" onClick={openCreateModal}>
                    Create
                  </Button>
                </Card.Header>
                <Card.Body>
                <Filter {...{ handleFilter }} options={items} />
                  {currentSales?.length > 0 ? (
                    <Table responsive striped bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Sold Quantity</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSales?.map((sale, index) => (
                          <tr key={sale.id}>
                            <td>{index + 1}</td>
                            <td>{generateItemName(sale.item_id)}</td>
                            <td>{sale.price}</td>
                            <td>{sale.sold_quantity}</td>
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
                                    onClick={() => openEditModal(sale)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="me-2"
                                    />
                                    Edit
                                  </Dropdown.Item>
                                  <AuthorizeRoleComponent>
                                    <Dropdown.Item
                                      style={{ color: 'red' }}
                                      onClick={() => openDeleteModal(sale.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="me-2"
                                      />
                                      Delete
                                    </Dropdown.Item>
                                  </AuthorizeRoleComponent>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <NoRecordFound />
                  )}
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
              <Modal.Title>{isEdit ? 'Edit Sale' : 'Create Sale'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formItemId" className="mb-3">
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    as="select"
                    name="item"
                    value={currentSale.item}
                    onChange={handleChange}
                  >
                    <option value="">Select item</option>
                    {items.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.item_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    value={currentSale.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSoldQuantity" className="mb-3">
                  <Form.Label>Sold Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter sold quantity"
                    name="sold_quantity"
                    value={currentSale.sold_quantity}
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

          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this sale?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  )
}

export default Sale;
