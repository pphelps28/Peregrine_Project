import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAio6vwdZAJ1GlzX7C0Mg8bR6gLt1EpVBQ",
    authDomain: "fir-practice-87288.firebaseapp.com",
    databaseURL: "https://fir-practice-87288.firebaseio.com",
    projectId: "fir-practice-87288",
    storageBucket: "fir-practice-87288.appspot.com",
    messagingSenderId: "270975170469",
    appId: "1:270975170469:web:cef00b31317d4d81b61a4c",
    measurementId: "G-R28BVC59V8"
};
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

class LoginModal extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            display: '',
            displayColor: 'red',
            logoutDisabled: true
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    display: `logged in as ${user.email}`,
                    displayColor: 'green',
                    logoutDisabled: false
                })
            } else {
                this.setState({
                    logoutDisabled: true
                })
            }
        })
    }
    emailChange = (event) => {
        console.log(event.target.value)
        this.setState({ email: event.target.value })
    }
    passwordChange = (event) => {
        console.log(event.target.value)
        this.setState({ password: event.target.value })
    }
    logIn = (event) => {
        event.preventDefault()
        const email = this.state.email;
        const password = this.state.password
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            console.log(error.message)
            if (!auth.currentUser) {
                this.setState({
                    display: 'Invalid username or password',
                    displayColor: 'red'
                })
            }
        })
        this.setState({
            email: '',
            password: ''
        })
    }
    logOut = (event) => {
        event.preventDefault()
        if (auth.currentUser) {
            auth.signOut()
            this.setState({
                display: 'Thanks for visiting!',
                displayColor: 'green'
            })
        }
    }
    forgotPassword = (event) => {
        if (this.state.email === '') {
            this.setState({
                display: 'Please fill out email field, then select "Forgot Password"',
                displayColor: 'orange'
            })
        } else {
            console.log(this.state.email)
            auth.sendPasswordResetEmail(this.state.email).then(() => {
                this.setState({
                    display: 'Check email to reset password',
                    displayColor: 'green'
                })
            }).catch((error) => {
                console.log(error.message)
            })
        }
    }
    changeEmail = () => {
        if (!auth.currentUser) {
            this.setState({
                display: 'To change email, please sign in first.',
                displayColor: 'orange'
            })
        } else {
            let oldEmail = auth.currentUser.email
            let newEmail = prompt('Please enter new email.')
            auth.currentUser.updateEmail(newEmail).catch(error => {
                if (error) {
                    this.setState({
                        display: error.message,
                        displayColor: 'red'
                    })
                }
            })
            this.setState({
                display: `Email updated!  To undo changes, follow the link sent to ${oldEmail}`,
                displayColor: 'green'
            })

        }
    }
    render() {
        return (
            <Form >
                <Form.Group controlId="formBasicEmail">
                    <div style={{ color: this.state.displayColor }} id="login-status">{this.state.display}</div>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.emailChange} value={this.state.email} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.passwordChange} value={this.state.password} />
                </Form.Group>
                <Button className="modal-button" variant="primary" disabled={!this.state.logoutDisabled} type="submit" onClick={this.logIn}>
                    Log In
                </Button>
                <Button className="modal-button" variant="outline-primary" disabled={this.state.logoutDisabled} style={this.state.logoutDisabled ? { 'opacity': .3 } : { 'opacity': 1 }} onClick={this.logOut}>
                    Log Out
                </Button>
                <Button className="modal-button" variant="secondary" onClick={this.forgotPassword}>
                    Reset Password
                </Button>
                <Button className="modal-button" variant="outline-secondary" onClick={this.changeEmail}>
                    Change Email
                </Button>
            </Form>
        )
    }
}

export default LoginModal

