import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

class ModalLogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // props
      modalShow: false,
    }
  }
  setModalShow = () => {
    this.state.modalShow ?
      this.setState({
        modalShow: false
      }) : this.setState({
        modalShow: true
      })
  }
  render() {
    return (
      <>
        <div className="link" variant="primary" onClick={this.setModalShow}>
          Log In
      </div>
        <Modal
          show={this.state.modalShow}
          onHide={this.setModalShow}
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
              email={this.props.email}
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
              forgotPassword={this.props.forgotPassword}
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
        <Form.Control type="email" placeholder="Enter email" onChange={props.emailChange} value={props.email} />
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
      <Button className="modal-button" variant="outline-primary" disabled={props.logoutDisabled} style={props.logoutDisabled ? { 'opacity': .3 } : { 'opacity': 1 }} onClick={props.logOut}>
        Log Out
                </Button>
      <Button className="modal-button" variant="secondary" onClick={props.forgotPassword}>
        Reset Password
                </Button>
      <Button className="modal-button" variant="outline-secondary" onClick={props.changeEmail}>
        Change Email
                </Button>
    </Form>
  )
}

