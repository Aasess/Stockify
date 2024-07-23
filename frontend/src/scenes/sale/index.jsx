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
import SaleAction from '../../api/sale/action';
import ItemAction from '../../api/item/action';
import StockAction from '../../api/stock/action';
import NavbarComponent from '../../components/NavbarComponent';
import NoRecordFound from '../../components/NoRecordFound';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSale, setCurrentSale] = useState({
    id: '',
    item: '',
    price: '',
    sold_quantity: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchSales = async () => {
    try {
      const data = await SaleAction.findAllSales();
      setSales(data ?? []);
    } catch (error) {
      console.error('There was an error fetching the sales!', error);
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
        item_id: Number(currentSale.item),
        price: Number(currentSale.price),
        sold_quantity: Number(currentSale.sold_quantity),
      };
      if (isEdit) {
        await SaleAction.updateSaleById(currentSale.id, formData);
      } else {
        await SaleAction.createNewSale(formData);
        await updateStockAndItem(formData.item_id, formData.sold_quantity);
      }
      fetchSales();
      setShowModal(false);
    } catch (error) {
      console.error('There was an error saving the sale!', error);
    }
  };

  const updateStockAndItem = async (itemId, soldQuantity) => {
    try {
      const item = items.find((item) => item.id === itemId);
      if (item) {
        const newQuantity = item.received_quantity - soldQuantity;
        await ItemAction.updateItemById(itemId, { ...item, received_quantity: newQuantity });

        const stocks = await StockAction.findAllStocks();
        const stock = stocks.find((stock) => stock.item_id === itemId);
        if (stock) {
          await StockAction.updateStockById(stock.id, { ...stock, received_quantity: newQuantity });
        }
        fetchItems();
      }
    } catch (error) {
      console.error('There was an error updating the stock and item!', error);
    }
  };

  const handleDelete = async () => {
    try {
      await SaleAction.deleteSaleById(saleToDelete);
      fetchSales();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('There was an error deleting the sale!', error);
    }
  };

  const openEditModal = (sale) => {
    const newState = {
      item: sale.item_id,
      ...sale,
    };
    setCurrentSale(newState);
    setIsEdit(true);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setCurrentSale({ id: '', item: '', price: '', sold_quantity: '' });
    setIsEdit(false);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setSaleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSale({
      ...currentSale,
      [name]: value,
    });
  };

  useEffect(() => {
    Promise.all([fetchItems(), fetchSales()]);
  }, []);

  // Pagination logic
  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sales.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <NavbarComponent />
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
                      {currentSales?.map((sale) => (
                        <tr key={sale.id}>
                          <td>{sale.id}</td>
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

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
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
    </div>
  );
};

export default Sale;
