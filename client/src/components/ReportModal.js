import React, { Component } from 'react'
import axios from 'axios'
import CsvDownload from 'react-json-to-csv'

class ReportModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            researcherComments: ''
        }
    }

    componentDidMount = () => {
        let bird = this.props.match.params.bird
        let _id = this.props.match.params._id

        console.log(bird)

        // gets report info from database using id

        axios.get('/reportModal/' + bird + '/' + _id)
            .then(response => {
                console.log('retrieved report request')
                console.log(response.data)

                this.setState({
                    data: response.data
                })
            })
    }

    // saves newly inputted comments to state for data update request

    researcherCommentsChange = (event) => {
        this.setState({ researcherComments: event.target.value })
    }

    // ----------------updates researcher comments ---------- //

    addComments = () => {
        console.log('sending comments')

        let query = {
            bird: this.state.data.bird,
            id: this.state.data._id,
            comments: this.state.researcherComments
        }

        console.log(this.state.researcherComments)

        fetch(('/update'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }).then(res => {
            console.log('getting back document')
            return res.json()
        }).then(jsonObj => {
            this.setState({
                data: jsonObj
            })
        })
    }
    render() {

        // variable for easier handling of data in state
        let data = this.state.data
        // variable to allow data to be read correctly by Csv downloader
        let dataSet = [data]

        return (
            <div className='report_page' >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{data.bird} Observation Report</th>
                            <CsvDownload data={dataSet} filename="Observation_Report.csv" className="btn btn-primary spaced" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="column">Season</th>
                            <td>{data.season}</td>
                        </tr>
                        <tr>
                            <th scope="column">Location</th>
                            <td> {data.location}</td>
                        </tr>
                        <tr>
                            <th scope="column">Date</th>
                            <td>{data.date_visited}</td>
                        </tr>
                        <tr>
                            <th scope="column">Monitor</th>
                            <td>{data.monitor_name}</td>
                        </tr>
                        <tr>
                            <th scope="column">Monitor email</th>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <th scope="column">Mileage</th>
                            <td>{data.mileage}</td>
                        </tr>
                        <tr>
                            <th scope="column">Travel time</th>
                            <td>{data.travel_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">Start time</th>
                            <td>{data.start_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">End time</th>
                            <td>{data.end_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">Total time</th>
                            <td>{data.total_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">Weather observations</th>
                            <td>{data.weather_observation}</td>
                        </tr>
                        <tr>
                            <th scope="column">Relationship Status</th>
                            <td>{data.relationship_status}</td>
                        </tr>
                        <tr>
                            <th scope="column">Nesting Status</th>
                            <td>{data.young_status}</td>
                        </tr>
                        <tr>
                            <th scope="column">Human Disturbance</th>
                            <td>{data.disturbance}</td>
                        </tr>
                        <tr>
                            <th scope="column">Eyrie Location</th>
                            <td>{data.eyrie_location}</td>
                        </tr>
                        <tr>
                            <th scope="column">Number of Young</th>
                            <td>{data.number_young}</td>
                        </tr>
                        <tr>
                            <th scope="column">Age of Young</th>
                            <td>{data.young_age}</td>
                        </tr>
                        <tr>
                            <th scope="column">Observations</th>
                            <td>{data.observations}</td>
                        </tr>
                        <tr>
                            <th scope="column">Remarks</th>
                            <td>{data.remarks}</td>
                        </tr>
                        <tr>
                            <th scope="column">Researcher Comments</th>
                            <td>{data.researcher_comments_1}</td>
                        </tr>
                    </tbody >
                </table >

                {/* Text area for admin to add or edit comments to the report */}

                < div id='researcher_comment_container' className="form-group" >
                    <label><strong>Add / edit comments:</strong></label>
                    <textarea
                        type="text"
                        required
                        className="form-control"
                        defaultValue={data.researcher_comments_1}
                        onChange={this.researcherCommentsChange}
                        rows="10"
                        cols='100' />
                    <input type='submit' value='Submit' className="btn btn-primary top-spaced" onClick={this.addComments} />
                </div >

            </div>
        )
    }
}

export default ReportModal
