import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
  Modal,
  Pagination,
  Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ItemAction from '../../api/item/action';
import VendorAction from '../../api/vendor/action';
import CategoryAction from '../../api/category/action'
import ItemForm from './itemForm'
import Filter from './filter'
import NoRecordFound from '../../components/NoRecordFound'
import displayToast from '../../helpers/displayToast'
import Loader from '../../components/Loader'

const Item = () => {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [categories, setCategories] = useState([])
  const [vendors, setVendors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchItems()
    findAllCategoryDropDown()
    fetchVendorsDropDown()
  }, [])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const data = await ItemAction.findAllItem()
      setItems(data ?? [])
      setFilteredItems(data ?? [])
      setIsLoading(false)
    } catch (error) {
      console.error('There was an error fetching the items!', error)
    }
  }

  const findAllCategoryDropDown = async () => {
    try {
      const data = await CategoryAction.findAllCategoryDropDown()
      setCategories(data ?? [])
    } catch (error) {
      console.error('There was an error fetching the categories!', error)
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
  }

  const handleClose = () => {
    setShowModal(false)
    setShowDeleteModal(false)
  }

  const handleSave = async (payload) => {
    try {
      const formData = {
        item_name: payload.itemName,
        sku: payload.sku,
        category_id: Number(payload.selectedCategory),
        vendor_id: Number(payload.selectedVendor),
      }

      let status
      if (editItem) {
        status = await ItemAction.updateItemById(editItem.id, formData)
      } else {
        status = await ItemAction.createNewItem(formData)
      }
      if (status === 'success') {
        fetchItems()
        handleClose()
      }
    } catch (error) {
      displayToast('There was an error saving the item!', 'error')
      console.error('There was an error saving the item!', error)
    }
  }

  const handleEdit = (item) => {
    setEditItem(item)
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

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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

  const handleFilter = (payload) => {
    const filteredItems = items.filter((item) => {
      const nameMatches = payload.name
        ? item.item_name.toLowerCase().includes(payload.name.toLowerCase())
        : true
      const statusMatches = payload.status
        ? payload.status === 'inStock'
          ? item.is_stock === 1
          : item.is_stock === 0
        : true
      return nameMatches && statusMatches
    })

    setFilteredItems(filteredItems)
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h2 className="text-center">Item Management</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Items</h4>
                  <Button variant="success" onClick={handleCreate}>
                    Create
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Filter {...{ handleFilter }} />
                  {currentItems?.length > 0 ? (
                    <>
                      <Table responsive striped bordered hover className="mb-0">
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
                                      onClick={() => handleEdit(item)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="me-2"
                                      />
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      style={{ color: 'red' }}
                                      onClick={() => handleDelete(item.id)}
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
                            setCurrentPage(
                              currentPage > 1 ? currentPage - 1 : 1
                            )
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
                    </>
                  ) : (
                    <NoRecordFound />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {showModal && (
            <ItemForm
              categories={categories}
              vendors={vendors}
              showModal={showModal}
              handleClose={handleClose}
              handleSave={handleSave}
              editItem={editItem}
            />
          )}
          <Modal show={showDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Are you sure you want to delete this item?</div>

              <div className="mt-2 text-danger fs-9">
                All the associated stocks and sales record will also be deleted.
              </div>
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
      )}
    </div>
  )
}

export default Item;

