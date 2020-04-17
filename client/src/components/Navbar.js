import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import ModalLogIn from './ModalLogIn.js';
import UserModal from './UserModal.js'

class NavBar extends Component {
	render() {
		return (
			<div>
				<Navbar fixed="top" bg="dark" variant="dark" className='navContainer' expand='md' collapseOnSelect="true">
					<Navbar.Brand><Link to='/' className='link'><img className='brandImage' src='../../img/Audubon_H_WHT_VT.png' alt="logo with and egret and the word Audubon rendered in white"></img></Link></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto" >
							<LinkContainer to='/' className='link' ><Nav.Link>Observation Form</Nav.Link></LinkContainer>

							{!this.props.loggedIn ?
								<Nav.Link>
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
									/> </Nav.Link>
								: <div>

									<LinkContainer to="/display" className="link"><Nav.Link>View Reports</Nav.Link></LinkContainer>
									<Nav.Link>
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
									</Nav.Link>
								</div>}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
