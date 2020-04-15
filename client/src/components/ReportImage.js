import React, { Component } from 'react'

class ReportImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.id ?
                <div id="image-wrapper">
                    <img id="report-image" src={`/images/${this.props.id}`} onError={(e) => { e.target.onerror = null; e.target.src = "none" }} alt="image" />
                </div>
                : null
        )
    }
}

export default ReportImage
