import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ModalLogIn from './ModalLogIn.js';
import UserModal from './UserModal.js'

class NavBar extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Navbar fixed="top" bg="dark" variant="dark" className='navContainer'>
					<Navbar.Brand><Link to='/' className='link'><img className='brandImage' src='../../img/Audubon_H_WHT_VT.png'></img></Link></Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link ><Link to='/' className='link' onClick={this.props.toggleInput}>Observation Form</Link></Nav.Link>
						<Nav.Link>
							{!this.props.loggedIn ?
								<ModalLogIn
									// props
									email={this.props.email}
									password={this.props.password}
									display={this.props.display}
									displayColor={this.props.displayColor}
									logoutDisabled={this.props.logoutDisabled}
									loggedIn={this.props.loggedIn}
									modalShow={this.props.modalShow}
									// methods
									setModalShow={this.props.setModalShow}
									emailChange={this.props.emailChange}
									passwordChange={this.props.passwordChange}
									logIn={this.props.logIn}
									logOut={this.props.logOut}
									forgotPasswordAtLogIn={this.props.forgotPasswordAtLogIn}
									changeEmail={this.props.changeEmail}
								/> : <div id="navbar-display-and-user">

									<Link to="/display" className='link' >View Reports</Link>
									<UserModal
										//props
										display={this.props.display}
										displayColor={this.props.displayColor}
										loggedIn={this.props.loggedIn}
										logoutDisabled={this.props.logoutDisabled}
										userModalShow={this.props.userModalShow}
										//methods
										setUserModalShow={this.props.setUserModalShow}
										logOut={this.props.logOut}
										resetPassword={this.props.resetPassword}
										changeEmail={this.props.changeEmail} />
								</div>}
						</Nav.Link>
					</Nav>
				</Navbar>
			</div>
		);
	}
}



export default NavBar;
