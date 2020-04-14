import React, { Component } from 'react'

class TestImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            // <div>
            //     {props.loaded ?
            //         <img src={`/images/${uniqueFileName}`} alt="retrieved image" /> : null}
            // </div>
            <div>
                <img src="/images/bbe9a51a4aca1cee4cd05fba69739c81Paul.jpg" alt="image" style={{ width: '100px', borderRadius: '5%' }} />
            </div>
        )
    }
}

export default TestImage
