import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

class ModalLogIn extends Component {
  render() {
    return (
      <>
        <span className="link" variant="primary" onClick={this.props.setModalShow}>
          | For Admin
      </span>
        <Modal
          show={this.props.modalShow}
          onHide={this.props.setModalShow}
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
            <LoginModal
              //props
              userEmail={this.props.userEmail}
              password={this.props.password}
              display={this.props.display}
              displayColor={this.props.displayColor}
              logoutDisabled={this.props.logoutDisabled}
              loggedIn={this.props.loggedIn}
              // methods
              emailChange={this.props.emailChange}
              passwordChange={this.props.passwordChange}
              logIn={this.props.logIn}
              logOut={this.props.logOut}
              forgotPasswordAtLogIn={this.props.forgotPasswordAtLogIn}
              changeEmail={this.props.changeEmail}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

export default ModalLogIn

function LoginModal(props) {
  return (
    <Form >
      <Form.Group controlId="formBasicEmail">
        <div style={{ color: props.displayColor }} id="login-status">{props.display}</div>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={props.emailChange} value={props.userEmail} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={props.passwordChange} value={props.password} />
      </Form.Group>
      <Button className="modal-button" variant="primary" disabled={!props.logoutDisabled} type="submit" onClick={props.logIn}>
        Log In
                </Button>
      <Button className="modal-button" variant="secondary" onClick={props.forgotPasswordAtLogIn}>
        Forgot Password
                </Button>

    </Form>
  )
}

