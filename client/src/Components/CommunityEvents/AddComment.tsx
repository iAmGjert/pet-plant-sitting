// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useAppDispatch, useAppSelector } from '../../state/hooks';
// import { setView } from '../../state/features/events/eventsSlice';
// import Form from 'react-bootstrap/Form';
// const AddComment = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     handleShow();
//   }, []);
//   return (
//     <>
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//               <Form.Label>Example textarea</Form.Label>
//               <Form.Control as="textarea" rows={3} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" >Submit</Button>
//         </Modal.Footer>
//       </Modal>
   
//   );

// };
// export default AddComment;
