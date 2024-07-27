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
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import StockAction from '../../api/stock/action';
import ItemAction from '../../api/item/action';
import NavbarComponent from '../../components/NavbarComponent';
import NoRecordFound from '../../components/NoRecordFound';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStock, setCurrentStock] = useState({
    id: '',
    item: '',
    price: '',
    received_quantity: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10

  const fetchStocks = async () => {
    try {
      const data = await StockAction.findAllStocks();
      setStocks(data ?? []);
    } catch (error) {
      console.error('There was an error fetching the stocks!', error);
    }
  };

  const fetchItems = async () => {
    try {
      const data = await ItemAction.findAllItem();
      setItems(data ?? []);
    } catch (error) {
      console.error('There was an error fetching the items!', error);
    }
  };

  const generateItemName = (id) => {
    return items.find((item) => item.id === Number(id))?.item_name;
  };

  const handleSave = async () => {
    try {
      const formData = {
        item_id: Number(currentStock.item),
        price: Number(currentStock.price),
        received_quantity: Number(currentStock.received_quantity),
      };
      if (isEdit) {
        await StockAction.updateStockById(currentStock.id, formData);
      } else {
        await StockAction.createNewStock(formData);
      }
      fetchStocks();
      setShowModal(false);
    } catch (error) {
      console.error('There was an error saving the stock!', error);
    }
  };

  const handleDelete = async () => {
    try {
      await StockAction.deleteStockById(stockToDelete);
      fetchStocks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('There was an error deleting the stock!', error);
    }
  };

  const openEditModal = (stock) => {
    const newState = {
      item: stock.item_id,
      ...stock,
    };
    setCurrentStock(newState);
    setIsEdit(true);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setCurrentStock({ id: '', item: '', price: '', received_quantity: '' });
    setIsEdit(false);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setStockToDelete(id);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentStock({
      ...currentStock,
      [name]: value,
    });
  };

  useEffect(() => {
    Promise.all([fetchItems(), fetchStocks()]);
  }, []);

  // Pagination logic
  const indexOfLastStock = currentPage * itemsPerPage;
  const indexOfFirstStock = indexOfLastStock - itemsPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(stocks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <NavbarComponent />
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Stock Management</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Stocks</h4>
                <Button variant="success" onClick={openCreateModal}>
                  Create
                </Button>
              </Card.Header>
              <Card.Body>
                {currentStocks?.length > 0 ? (
                  <Table responsive striped bordered hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Received Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStocks?.map((stock) => (
                        <tr key={stock.id}>
                          <td>{generateItemName(stock.item_id)}</td>
                          <td>{stock.price}</td>
                          <td>{stock.received_quantity}</td>
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
                                  onClick={() => openEditModal(stock)}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="me-2"
                                  />
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  style={{ color: 'red' }}
                                  onClick={() => openDeleteModal(stock.id)}
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
                ) : (
                  <NoRecordFound />
                )}
                <Pagination className="justify-content-center mt-4">
                  <Pagination.Prev
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
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
                    onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
                    disabled={currentPage === pageNumbers.length}
                  />
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? 'Edit Stock' : 'Create Stock'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formItemId" className="mb-3">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  as="select"
                  name="item"
                  value={currentStock.item}
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
                  value={currentStock.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formReceivedQuantity" className="mb-3">
                <Form.Label>Received Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter received quantity"
                  name="received_quantity"
                  value={currentStock.received_quantity}
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
          <Modal.Body>Are you sure you want to delete this stock?</Modal.Body>
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
    </div>
  );
};

export default Stock;

