import React, { Component } from 'react'

class ReportImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.id ?
                <div id="image-wrapper">
                    <img id="report-image" src={`/images/${this.props.id}`} onerror="null" alt="image" />
                </div>
                : null
        )
    }
}

export default ReportImage
