import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalLogIn from '../components/ModalLogIn';

export class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputVisible: true
		};
	}
	render() {
		return (
			<div>
				<Navbar fixed="top" bg="dark" variant="dark" className="navContainer" expand="lg">
					<Navbar.Brand>
						<Link to="/" className="link">
							<img className="brandImage" src="../../img/Audubon_H_WHT_VT.png" />
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link>
								<Link to="/" className="link">
									Observation Form
								</Link>
							</Nav.Link>
							<Nav.Link onClick={this.props.toggleInput}>
								<Link to="/display" className="link">
									View Reports
								</Link>
							</Nav.Link>
							<Nav.Link>
								<ModalLogIn />
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
