import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div className='Header'>
                <img className='headerImages' src='../../img/Audubon_H_BLK_VT.png' alt='Audobon Logo' fluid='true' ></img>
                <img className='headerImages' src="../../img/VFWDlogo.jpg" alt='Fish and Wildlife Logo' fluid='true'></img>
            </div>
        )
    }
}

export default Header
