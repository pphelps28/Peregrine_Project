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
            password: ''
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in! user: ')
                console.log(user)

            } else {
                console.log('logged out')
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
        })
    }
    logOut = (event) => {
        event.preventDefault()
        auth.signOut()
    }

    render() {
        return (
            <Form onSubmit={this.logIn}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.emailChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.passwordChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
  </Button>
                <Button variant="secondary" onClick={this.logOut}>
                    Log Out
                </Button>

            </Form>
            // <form id="modal-wrapper" onSubmit={this.logIn}>
            //     <input className="login-modal" onChange={this.emailChange} placeholder="email" type="email"></input>
            //     <input className="login-modal" onChange={this.passwordChange} placeholder="password" type="password"></input>
            //     <input className="login-modal" placeholder="submit" type="submit"></input>
            //     <button onClick={this.logOut}>Log Out</button>
            // </form>
        )
    }
}

export default LoginModal

