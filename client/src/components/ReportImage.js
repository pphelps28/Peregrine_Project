import React, { Component } from 'react'
import noimage from '../img/noimage.png'

class ReportImage extends Component {
    handleNoImage = (event) => {
        console.log(event.target.src)
        return event.target.src = noimage
    }
    render() {
        return (
            <div id="image-wrapper">
                <img id="report-image" src={`/images/${this.props.id}`} onError={this.handleNoImage} alt="monitor report" />
            </div>
        )
    }
}

export default ReportImage
