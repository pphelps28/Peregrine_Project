import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import CsvDownload from 'react-json-to-csv'

export default function ReportModal(props) {
    console.log(props.observationReport)
    
    // variables to streamline return
    
    let data = props.observationReport    

    // For some reason, the observation report object has to appear as an array in order to be correctly read by CsvDownload

    let dataReport = [props.observationReport] 
    console.log(typeof (data))
    console.log(props.reportVisible)
    return (

        <div className='report_page'>
            {props.reportVisible ?

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{data.bird} Observation Report</th>
                            {/* CSV download react component button */}
                            <CsvDownload data={dataReport} filename="observationData.csv" className="btn btn-primary spaced" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="column">Season</th>
                            <td>{data.season}</td>
                        </tr>
                        <tr>
                            <th scope="column">Site</th>
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
                            <th scope="column">Travel Time</th>
                            <td>{data.travel_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">Observation Start Time</th>
                            <td>{data.start_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">Observation End Time</th>
                            <td>{data.end_time}</td>
                        </tr>
                        <tr>
                            <th scope="column">Total Time</th>
                            <td>{data.total_time}</td>
                        </tr>

                        <tr>
                            <th scope="column">Temperature</th>
                            <td>{data.temperature}</td>
                        </tr>
                        <tr>
                            <th scope="column">Precipitation</th>
                            <td>{data.precipitation}</td>
                        </tr>
                        <tr>
                            <th scope="column">Cloud Cover</th>
                            <td>{data.cloud_coverage}</td>
                        </tr>
                        <tr>
                            <th scope="column">Wind Speed</th>
                            <td>{data.wind_speed}</td>
                        </tr>
                        <tr>
                            <th scope="column">Summary</th>
                            <td>{data.summary}</td>
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
                    </tbody>

                    {/* Text area for admin to add or edit comments to the report */}

                    <div id='researcher_comment_container' className="form-group">
                        <label><strong>Add / edit comments:</strong></label>
                        <textarea
                            type="text"
                            required
                            className="form-control"
                            // value={props.researcherComments}
                            onChange={props.researcherCommentsChange}
                            rows="10"
                            cols='100'>{data.researcher_comments_1}</textarea>
                        <input type='submit' value='Submit' className="btn btn-primary top-spaced" onClick={props.addComments} />
                    </div>

                </table>


                : null}
        </div>
    )
}

