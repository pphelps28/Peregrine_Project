import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ReportModal(props) {
    console.log(props.observationReport)
    let data = props.observationReport
    console.log(props.reportVisible)
    return (
       
        <>
        {props.reportVisible ?
            
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{data.bird} Observation Report</th>
                            <td><button className="btn btn-primary" onClick={props.printReport}>Print Report</button></td>
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
                            <th scope="column">Observations</th>
                            <td>{data.observations}</td>
                        </tr>
                        <tr>
                            <th scope="column">Remarks</th>
                            <td>{data.remarks}</td>
                        </tr>
                    </tbody>
                </table> 
             : null}
        </>
    )
}
