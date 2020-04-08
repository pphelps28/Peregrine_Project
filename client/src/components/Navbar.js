import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ModalLogIn from './ModalLogIn.js';

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Navbar fixed="top" bg="primary" variant="dark" className='navContainer'>
					<Navbar.Brand><Link to='/' className='link'><img className='brandImage' src='../../img/Audubon_H_BLK_VT.png'></img></Link></Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link ><Link to='/' className='link'>Observation Form</Link></Nav.Link>
						{/* <Nav.Link onClick={this.props.toggleInput}><Link to="/display" className='link'>View Reports</Link></Nav.Link> */}
						<Nav.Link>
							{!this.props.loggedIn ? <ModalLogIn
								// props
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
							/> : <><Link to="/display" className='link'>View Reports</Link> <Button style={{ color: 'white', backgroundColor: 'orange' }} className="link" onClick={this.props.logOut}>Log Out</Button></>}
						</Nav.Link>
					</Nav>
				</Navbar>
			</div>
		);
	}
}



export default NavBar;
