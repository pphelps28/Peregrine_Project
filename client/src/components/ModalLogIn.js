import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import LoginModal from '../components/LoginModal'


function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Log In 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginModal />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function ModalLogIn() {
    const [modalShow, setModalShow] = React.useState(true);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Log In Modal
        </Button>
      
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  


  export default ModalLogIn