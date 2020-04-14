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
                <img src="/images/afeb2fcd2d9c844b057daf1ff5fcdadeLinkedin.png" alt="image"/>
            </div>
        )
    }
}

export default TestImage
