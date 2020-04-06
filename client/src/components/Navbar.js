import React, { Component } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import {Link} from 'react-router-dom'
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
			<div className='navbar'>
				<Navbar bg="primary" variant="dark" className='navContainer' fixed='top'>
					<Navbar.Brand><Link to='/' className='link'><img className='brandImage' src='../../img/Audubon_H_BLK_VT.png'></img></Link></Navbar.Brand>
					<Nav className="mr-auto">
                    <Nav.Link ><Link to='/' className='link'>Submit Forms</Link></Nav.Link>
						<Nav.Link  onClick={this.props.toggleInput}><Link to="/display" className='link'>Observation Report</Link></Nav.Link>
						<Nav.Link>
							<ModalLogIn />
						</Nav.Link>
					</Nav>
				</Navbar>
			</div>
		);
	}
}



export default NavBar;
