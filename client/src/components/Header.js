import React, { Component } from 'react'
import {Jumbotron, Container} from 'react-bootstrap'

export class Header extends Component {
    render() {
        return (
        <Jumbotron fluid>
            <Container>
            <div className='Header'>
                <img className='headerImages' src='../../img/Audubon_H_BLK_VT.png' alt='Audobon Logo' fluid ></img>
                <img className='headerImages' src="../../img/VFWDlogo.jpg" alt='Fish and Wildlife Logo' fluid></img>
            </div>
            </Container>
          </Jumbotron>
           
        )
    }
}

export default Header
