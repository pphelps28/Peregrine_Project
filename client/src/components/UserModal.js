import React, { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

class UserModal extends Component {
    render() {
        return (
            <>
                <span className="link" variant="primary" onClick={this.props.setUserModalShow}>
                    Settings
                </span>
                <Modal
                    show={this.props.userModalShow}
                    onHide={this.props.setUserModalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Settings
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserLoginModal
                            //props
                            display={this.props.display}
                            displayColor={this.props.displayColor}
                            logoutDisabled={this.props.logoutDisabled}
                            loggedIn={this.props.loggedIn}
                            // methods
                            logOut={this.props.logOut}
                            resetPassword={this.props.resetPassword}
                            changeEmail={this.props.changeEmail}
                        />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UserModal

function UserLoginModal(props) {
    return (
        <Form >
            <div style={{ color: props.displayColor }} id="login-status">{props.display}</div>
            <Button className="modal-button" variant="outline-primary" onClick={props.logOut}>
                Log Out
                </Button>
            <Button className="modal-button" variant="secondary" onClick={props.resetPassword}>
                Reset Password
                </Button>
            <Button className="modal-button" variant="outline-secondary" onClick={props.changeEmail}>
                Change Email
                </Button>
        </Form>
    )
}

