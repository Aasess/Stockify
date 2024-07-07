// import React, { useState } from 'react';
// import { Button, Card, Container, Row, Col, Table, Pagination, Modal, Form } from 'react-bootstrap';

// const Vendor = () => {
//   const [vendors, setVendors] = useState([
//     { id: 1, name: 'Vendor 1', address: 'Address 1', phoneNumber: '123-456-7890' },
//     { id: 2, name: 'Vendor 2', address: 'Address 2', phoneNumber: '098-765-4321' },
//     // Add more vendors as needed
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const vendorsPerPage = 10;
//   const [showModal, setShowModal] = useState(false);
//   const [newVendor, setNewVendor] = useState({ name: '', address: '', phoneNumber: '' });
//   const [editVendor, setEditVendor] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteVendorId, setDeleteVendorId] = useState(null);

//   const handleCreate = () => {
//     setShowModal(true);
//     setEditVendor(null);
//     setNewVendor({ name: '', address: '', phoneNumber: '' });
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setShowDeleteModal(false);
//   };

//   const handleSave = () => {
//     if (editVendor) {
//       setVendors(vendors.map(vendor => 
//         vendor.id === editVendor.id ? { ...vendor, ...newVendor } : vendor
//       ));
//     } else {
//       const newVendorData = {
//         id: vendors.length + 1,
//         ...newVendor,
//       };
//       setVendors([...vendors, newVendorData]);
//     }
//     handleClose();
//   };

//   const handleEdit = (vendor) => {
//     setEditVendor(vendor);
//     setNewVendor({ name: vendor.name, address: vendor.address, phoneNumber: vendor.phoneNumber });
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     setDeleteVendorId(id);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     setVendors(vendors.filter(vendor => vendor.id !== deleteVendorId));
//     handleClose();
//   };

//   // Get current vendors
//   const indexOfLastVendor = currentPage * vendorsPerPage;
//   const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
//   const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const nextPage = () => {
//     if (currentPage < Math.ceil(vendors.length / vendorsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(vendors.length / vendorsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const maxPageNumbersToShow = 5;
//   const startPageIndex = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 0);
//   const endPageIndex = Math.min(startPageIndex + maxPageNumbersToShow, pageNumbers.length);

//   return (
//     <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F5EEE6' }}>
//       <Row className="w-100 justify-content-center">
//         <Col md={10} lg={8}>
//           <Card className="p-4 shadow-sm">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <Card.Title><b>Vendors</b></Card.Title>
//                 <Button variant="success" onClick={handleCreate}>Create</Button>
//               </div>
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th>Address</th>
//                     <th>Phone Number</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentVendors.map((vendor) => (
//                     <tr key={vendor.id}>
//                       <td>{vendor.id}</td>
//                       <td>{vendor.name}</td>
//                       <td>{vendor.address}</td>
//                       <td>{vendor.phoneNumber}</td>
//                       <td>
//                         <Button variant="warning" onClick={() => handleEdit(vendor)} className="me-2">Edit</Button>
//                         <Button variant="danger" onClick={() => handleDelete(vendor.id)}>Delete</Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <Pagination className="justify-content-center">
//                 <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
//                 {pageNumbers.slice(startPageIndex, endPageIndex).map((number) => (
//                   <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
//                     {number}
//                   </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={nextPage} disabled={currentPage === Math.ceil(vendors.length / vendorsPerPage)} />
//               </Pagination>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editVendor ? 'Edit Vendor' : 'Add New Vendor'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formVendorName">
//               <Form.Label>Vendor Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter vendor name"
//                 value={newVendor.name}
//                 onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="formVendorAddress" className="mt-3">
//               <Form.Label>Vendor Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter vendor address"
//                 value={newVendor.address}
//                 onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="formVendorPhoneNumber" className="mt-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter phone number"
//                 value={newVendor.phoneNumber}
//                 onChange={(e) => setNewVendor({ ...newVendor, phoneNumber: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showDeleteModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Vendor</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this vendor?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Vendor;

// Vendor.jsx

import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Table, Modal, Form } from 'react-bootstrap';
import VendorAction from '../api/vendor/action';

const Vendor = () => {

    const [vendors, setVendors] = useState([
            { id: 1, name: 'Vendor 1', address: 'Address 1', phoneNumber: '123-456-7890' },
            { id: 2, name: 'Vendor 2', address: 'Address 2', phoneNumber: '098-765-4321' },
            // Add more vendors as needed
          ]);
//   const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentVendor, setCurrentVendor] = useState({ id: '', name: '', address: '', phoneNumber: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await VendorAction.findAllVendor();
      setVendors(data);
    } catch (error) {
      console.error('There was an error fetching the vendors!', error);
    }
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await VendorAction.updateVendorById(currentVendor.id, currentVendor);
      } else {
        await VendorAction.createNewVendor(currentVendor);
      }
      fetchVendors();
      setShowModal(false);
    } catch (error) {
      console.error('There was an error saving the vendor!', error);
    }
  };

  const handleDelete = async () => {
    try {
      await VendorAction.deleteVendorById(vendorToDelete);
      fetchVendors();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('There was an error deleting the vendor!', error);
    }
  };

  const openEditModal = (vendor) => {
    setCurrentVendor(vendor);
    setIsEdit(true);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setCurrentVendor({ id: '', name: '', address: '', phone: '' });
    setIsEdit(false);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setVendorToDelete(id);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentVendor({
      ...currentVendor,
      [name]: value,
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#F5EEE6' }}>
      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title><b>Vendors</b></Card.Title>
                <Button variant="success" onClick={openCreateModal}>Create</Button>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td>{vendor.id}</td>
                      <td>{vendor.name}</td>
                      <td>{vendor.address}</td>
                      <td>{vendor.phone}</td>
                      <td>
                        <Button variant="warning" onClick={() => openEditModal(vendor)} className="me-2">Edit</Button>
                        <Button variant="danger" onClick={() => openDeleteModal(vendor.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</Modal.Title>
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
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={currentVendor.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Vendor;

