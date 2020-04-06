import React, { Component } from 'react'
import {Row, Col, Container, Image} from 'react-bootstrap'

export class Header extends Component {
    render() {
        return (
     
            <Container>
            <div className='Header'>
                <Row className = 'imageContainer'>
                <Col xs={12}  md={6}>
                <Image  className='headerImages' src='../../img/Audubon_H_BLK_VT.png' alt='Audobon Logo' fluid='true'></Image>
                </Col>
                <Col  xs={12}  md={6}>
                <Image className='headerImages' src="../../img/VFWDlogo.jpg" alt='Fish and Wildlife Logo' fluid='true'></Image>
                </Col>
                </Row>
            </div>
            </Container>
         
           
        )
    }
}

export default Header
