import React, { Component } from 'react';
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap'
import ModalLogIn from '../components/ModalLogIn'

export class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state= {
            inputVisible: true
        }
    }
	render() {
		return (
			<div>
				<Navbar bg="primary" variant="dark">
					<Navbar.Brand href="#home">Audobon</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="#home">Submit Forms</Nav.Link>
						<Nav.Link onClick={this.props.toggleInput}>Observation Report</Nav.Link>
						<Nav.Link><ModalLogIn></ModalLogIn></Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-light">Search</Button>
					</Form>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
