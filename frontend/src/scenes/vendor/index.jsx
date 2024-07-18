// import React, { useState, useEffect } from 'react'
// import {
//   Button,
//   Card,
//   Container,
//   Row,
//   Col,
//   Table,
//   Modal,
//   Form,
// } from 'react-bootstrap'
// import VendorAction from '../../api/vendor/action'
// import NavbarComponent from '../../components/NavbarComponent'

// const Vendor = () => {
//   const [vendors, setVendors] = useState([])

//   const [showModal, setShowModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [currentVendor, setCurrentVendor] = useState({
//     id: '',
//     name: '',
//     address: '',
//     phoneNumber: '',
//   })
//   const [isEdit, setIsEdit] = useState(false)
//   const [vendorToDelete, setVendorToDelete] = useState(null)

//   useEffect(() => {
//     fetchVendors()
//   }, [])

//   const fetchVendors = async () => {
//     try {
//       const data = await VendorAction.findAllVendor()
//       setVendors(data ?? [])
//     } catch (error) {
//       console.error('There was an error fetching the vendors!', error)
//     }
//   }

//   const handleSave = async () => {
//     try {
//       if (isEdit) {
//         await VendorAction.updateVendorById(currentVendor.id, currentVendor)
//       } else {
//         await VendorAction.createNewVendor(currentVendor)
//       }
//       fetchVendors()
//       setShowModal(false)
//     } catch (error) {
//       console.error('There was an error saving the vendor!', error)
//     }
//   }

//   const handleDelete = async () => {
//     try {
//       await VendorAction.deleteVendorById(vendorToDelete)
//       fetchVendors()
//       setShowDeleteModal(false)
//     } catch (error) {
//       console.error('There was an error deleting the vendor!', error)
//     }
//   }

//   const openEditModal = (vendor) => {
//     setCurrentVendor(vendor)
//     setIsEdit(true)
//     setShowModal(true)
//   }

//   const openCreateModal = () => {
//     setCurrentVendor({ id: '', name: '', address: '', phone: '' })
//     setIsEdit(false)
//     setShowModal(true)
//   }

//   const openDeleteModal = (id) => {
//     setVendorToDelete(id)
//     setShowDeleteModal(true)
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setCurrentVendor({
//       ...currentVendor,
//       [name]: value,
//     })
//   }

//   return (
//     <div>
//       <NavbarComponent />
//       <Container
//         className="d-flex justify-content-center align-items-center min-vh-100"
//         style={{ backgroundColor: '#F5EEE6' }}
//       >
//         <Row className="w-100 justify-content-center">
//           <Col md={10} lg={8}>
//             <Card className="p-4 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <Card.Title>
//                     <b>Vendors</b>
//                   </Card.Title>
//                   <Button variant="success" onClick={openCreateModal}>
//                     Create
//                   </Button>
//                 </div>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Id</th>
//                       <th>Name</th>
//                       <th>Address</th>
//                       <th>Phone</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {vendors?.map((vendor) => (
//                       <tr key={vendor.id}>
//                         <td>{vendor.id}</td>
//                         <td>{vendor.name}</td>
//                         <td>{vendor.address}</td>
//                         <td>{vendor.phone}</td>
//                         <td>
//                           <Button
//                             variant="warning"
//                             onClick={() => openEditModal(vendor)}
//                             className="me-2"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="danger"
//                             onClick={() => openDeleteModal(vendor.id)}
//                           >
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               {isEdit ? 'Edit Vendor' : 'Create Vendor'}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   name="name"
//                   value={currentVendor.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formAddress">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address"
//                   name="address"
//                   value={currentVendor.address}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formPhone">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter phone number"
//                   name="phone"
//                   value={currentVendor.phone}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure you want to delete this vendor?</Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="secondary"
//               onClick={() => setShowDeleteModal(false)}
//             >
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </div>
//   )
// }

// export default Vendor


// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   Container,
//   Row,
//   Col,
//   Table,
//   Modal,
//   Form,
// } from 'react-bootstrap';
// import VendorAction from '../../api/vendor/action';
// import NavbarComponent from '../../components/NavbarComponent';

// const Vendor = () => {
//   const [vendors, setVendors] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentVendor, setCurrentVendor] = useState({
//     id: '',
//     name: '',
//     address: '',
//     phone: '',
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [vendorToDelete, setVendorToDelete] = useState(null);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const data = await VendorAction.findAllVendor();
//       setVendors(data ?? []);
//     } catch (error) {
//       console.error('There was an error fetching the vendors!', error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (isEdit) {
//         await VendorAction.updateVendorById(currentVendor.id, currentVendor);
//       } else {
//         await VendorAction.createNewVendor(currentVendor);
//       }
//       fetchVendors();
//       setShowModal(false);
//     } catch (error) {
//       console.error('There was an error saving the vendor!', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await VendorAction.deleteVendorById(vendorToDelete);
//       fetchVendors();
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error('There was an error deleting the vendor!', error);
//     }
//   };

//   const openEditModal = (vendor) => {
//     setCurrentVendor(vendor);
//     setIsEdit(true);
//     setShowModal(true);
//   };

//   const openCreateModal = () => {
//     setCurrentVendor({ id: '', name: '', address: '', phone: '' });
//     setIsEdit(false);
//     setShowModal(true);
//   };

//   const openDeleteModal = (id) => {
//     setVendorToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentVendor({
//       ...currentVendor,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <NavbarComponent />
//       <Container className="py-5">
//         <Row className="mb-4">
//           <Col>
//             <h2 className="text-center">Vendor Management</h2>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Card className="shadow-sm">
//               <Card.Header className="d-flex justify-content-between align-items-center">
//                 <h4 className="mb-0">Vendors</h4>
//                 <Button variant="success" onClick={openCreateModal}>
//                   Create
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 <Table responsive striped bordered hover className="mb-0">
//                   <thead>
//                     <tr>
//                       <th>Id</th>
//                       <th>Name</th>
//                       <th>Address</th>
//                       <th>Phone</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {vendors?.map((vendor) => (
//                       <tr key={vendor.id}>
//                         <td>{vendor.id}</td>
//                         <td>{vendor.name}</td>
//                         <td>{vendor.address}</td>
//                         <td>{vendor.phone}</td>
//                         <td>
//                           <Button
//                             variant="outline-warning"
//                             onClick={() => openEditModal(vendor)}
//                             className="me-2"
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="outline-danger"
//                             onClick={() => openDeleteModal(vendor.id)}
//                           >
//                             Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   name="name"
//                   value={currentVendor.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formAddress" className="mt-3">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address"
//                   name="address"
//                   value={currentVendor.address}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formPhone" className="mt-3">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter phone number"
//                   name="phone"
//                   value={currentVendor.phone}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure you want to delete this vendor?</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default Vendor;


// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   Container,
//   Row,
//   Col,
//   Table,
//   Modal,
//   Form,
//   Dropdown,
//   DropdownButton,
// } from 'react-bootstrap';
// import VendorAction from '../../api/vendor/action';
// import NavbarComponent from '../../components/NavbarComponent';
// const Vendor = () => {
//   const [vendors, setVendors] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentVendor, setCurrentVendor] = useState({
//     id: '',
//     name: '',
//     address: '',
//     phone: '',
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [vendorToDelete, setVendorToDelete] = useState(null);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const data = await VendorAction.findAllVendor();
//       setVendors(data ?? []);
//     } catch (error) {
//       console.error('There was an error fetching the vendors!', error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (isEdit) {
//         await VendorAction.updateVendorById(currentVendor.id, currentVendor);
//       } else {
//         await VendorAction.createNewVendor(currentVendor);
//       }
//       fetchVendors();
//       setShowModal(false);
//     } catch (error) {
//       console.error('There was an error saving the vendor!', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await VendorAction.deleteVendorById(vendorToDelete);
//       fetchVendors();
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error('There was an error deleting the vendor!', error);
//     }
//   };

//   const openEditModal = (vendor) => {
//     setCurrentVendor(vendor);
//     setIsEdit(true);
//     setShowModal(true);
//   };

//   const openCreateModal = () => {
//     setCurrentVendor({ id: '', name: '', address: '', phone: '' });
//     setIsEdit(false);
//     setShowModal(true);
//   };

//   const openDeleteModal = (id) => {
//     setVendorToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentVendor({
//       ...currentVendor,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <NavbarComponent />
//       <Container className="py-5">
//         <Row className="mb-4">
//           <Col>
//             <h2 className="text-center">Vendor Management</h2>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Card className="shadow-sm">
//               <Card.Header className="d-flex justify-content-between align-items-center">
//                 <h4 className="mb-0">Vendors</h4>
//                 <Button variant="success" onClick={openCreateModal}>
//                   Create
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 <Table responsive striped bordered hover className="mb-0">
//                   <thead>
//                     <tr>
//                       <th>Id</th>
//                       <th>Name</th>
//                       <th>Address</th>
//                       <th>Phone</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {vendors?.map((vendor) => (
//                       <tr key={vendor.id}>
//                         <td>{vendor.id}</td>
//                         <td>{vendor.name}</td>
//                         <td>{vendor.address}</td>
//                         <td>{vendor.phone}</td>
//                         <td>
//                           <Dropdown>
//                             <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
//                               <i className="fas fa-ellipsis-v"></i>
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                               <Dropdown.Item onClick={() => openEditModal(vendor)}>
//                                 Edit
//                               </Dropdown.Item>
//                               <Dropdown.Item onClick={() => openDeleteModal(vendor.id)}>
//                                 Delete
//                               </Dropdown.Item>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   name="name"
//                   value={currentVendor.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formAddress" className="mt-3">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address"
//                   name="address"
//                   value={currentVendor.address}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formPhone" className="mt-3">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter phone number"
//                   name="phone"
//                   value={currentVendor.phone}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure you want to delete this vendor?</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default Vendor;


// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   Container,
//   Row,
//   Col,
//   Table,
//   Modal,
//   Form,
//   Dropdown,
// } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import VendorAction from '../../api/vendor/action';
// import NavbarComponent from '../../components/NavbarComponent';

// const Vendor = () => {
//   const [vendors, setVendors] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [currentVendor, setCurrentVendor] = useState({
//     id: '',
//     name: '',
//     address: '',
//     phone: '',
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [vendorToDelete, setVendorToDelete] = useState(null);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const data = await VendorAction.findAllVendor();
//       setVendors(data ?? []);
//     } catch (error) {
//       console.error('There was an error fetching the vendors!', error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       if (isEdit) {
//         await VendorAction.updateVendorById(currentVendor.id, currentVendor);
//       } else {
//         await VendorAction.createNewVendor(currentVendor);
//       }
//       fetchVendors();
//       setShowModal(false);
//     } catch (error) {
//       console.error('There was an error saving the vendor!', error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await VendorAction.deleteVendorById(vendorToDelete);
//       fetchVendors();
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error('There was an error deleting the vendor!', error);
//     }
//   };

//   const openEditModal = (vendor) => {
//     setCurrentVendor(vendor);
//     setIsEdit(true);
//     setShowModal(true);
//   };

//   const openCreateModal = () => {
//     setCurrentVendor({ id: '', name: '', address: '', phone: '' });
//     setIsEdit(false);
//     setShowModal(true);
//   };

//   const openDeleteModal = (id) => {
//     setVendorToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentVendor({
//       ...currentVendor,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <NavbarComponent />
//       <Container className="py-5">
//         <Row className="mb-4">
//           <Col>
//             <h2 className="text-center">Vendor Management</h2>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Card className="shadow-sm">
//               <Card.Header className="d-flex justify-content-between align-items-center">
//                 <h4 className="mb-0">Vendors</h4>
//                 <Button variant="success" onClick={openCreateModal}>
//                   Create
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 <Table responsive striped bordered hover className="mb-0">
//                   <thead>
//                     <tr>
//                       <th>Id</th>
//                       <th>Name</th>
//                       <th>Address</th>
//                       <th>Phone</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {vendors?.map((vendor) => (
//                       <tr key={vendor.id}>
//                         <td>{vendor.id}</td>
//                         <td>{vendor.name}</td>
//                         <td>{vendor.address}</td>
//                         <td>{vendor.phone}</td>
//                         <td>
//                           <Dropdown>
//                             <Dropdown.Toggle as="div" className="btn p-0 border-0">
//                               <FontAwesomeIcon icon={faEllipsisV} />
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                               <Dropdown.Item onClick={() => openEditModal(vendor)}>
//                                 <FontAwesomeIcon icon={faEdit} className="me-2" />
//                                 Edit
//                               </Dropdown.Item>
//                               <Dropdown.Item onClick={() => openDeleteModal(vendor.id)}>
//                                 <FontAwesomeIcon icon={faTrash} className="me-2" />
//                                 Delete
//                               </Dropdown.Item>
//                             </Dropdown.Menu>
//                           </Dropdown>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   name="name"
//                   value={currentVendor.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formAddress" className="mt-3">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address"
//                   name="address"
//                   value={currentVendor.address}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formPhone" className="mt-3">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter phone number"
//                   name="phone"
//                   value={currentVendor.phone}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSave}>
//               Save
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Confirm Delete</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Are you sure you want to delete this vendor?</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </div>
//   );
// };

// export default Vendor;



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
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import VendorAction from '../../api/vendor/action';
import NavbarComponent from '../../components/NavbarComponent';

const Vendor = () => {
  const [vendors, setVendors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentVendor, setCurrentVendor] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await VendorAction.findAllVendor();
      setVendors(data ?? []);
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
    <div>
      <NavbarComponent />
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
                      <th>Address</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors?.map((vendor) => (
                      <tr key={vendor.id}>
                        <td>{vendor.id}</td>
                        <td>{vendor.name}</td>
                        <td>{vendor.address}</td>
                        <td>{vendor.phone}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              as="div"
                              style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                            >
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => openEditModal(vendor)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item style={{ color: 'red' }} onClick={() => openDeleteModal(vendor.id)}>
                                <FontAwesomeIcon icon={faTrash} className="me-2" />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
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
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Vendor
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Vendor;


