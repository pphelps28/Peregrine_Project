import React from 'react';
import CsvDownload from 'react-json-to-csv'
import { Form, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function Display(props) {
    let bird

    if (props.bird === 'Bald Eagle') {
        bird = 'Bald Eagle'

    } else if (props.bird === "Peregrine Falcon") {
        bird = 'Peregrine Falcon'

    }
    else {
        bird = ''
    }

    return (
        <div className="container report_page" >
            <div>
                <Form>
                <h3 className="title">Here you can add a nesting site or read an observation report</h3>
                    {/* -----------------------Bird Observed Radio -------------------*/}
                    <Form.Group as={Col}>
                        <Form.Label as="legend" column sm={10}>
                            First please select a species:
					</Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Bald Eagle"
                                value="Bald Eagle"
                                name="birds"
                                id="formHorizontalRadios1"
                                className='radioButton'
                                onChange={props.birdChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Peregrine Falcon"
                                value="Peregrine Falcon"
                                name="birds"
                                id="formHorizontalRadios2"
                                className='radioButton'
                                onChange={props.birdChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* ----------------------------------- New Nesting Site Input --------------------------- */}
                    <Form.Group as={Col}>
                        <Form.Label as="legend" column sm={20}><strong>Add a nesting site</strong></Form.Label>
                    </Form.Group>
                    <div className="form-group">
                        <label>Site to add:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={props.nestingSite}
                            onChange={props.nestingSiteChange}
                        />
                    </div>
                    <input type="submit" value="Add" className="btn btn-primary spaced" onClick={props.addNestingSite} />
                    {/* -----------------------Observation Report Search -------------------*/}
                    <Form.Group as={Col}>
                        <Form.Label as="legend" column sm={20}><strong>Read a monitor report</strong></Form.Label>
                    </Form.Group>

                    {/*------------------------- Location Site Name ------------------------*/}
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Please select a nesting site:</Form.Label>
                        <Form.Control as="select" custom value={props.site} onChange={props.siteChange}>
                            {props.sitesList.map(site => (
                                <option >{site}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {/*------------------------- Season Selector ------------------------*/}
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Please select a season(year):</Form.Label>
                        <Form.Control as="select" custom value={props.season} onChange={props.seasonChange}>
                            <option></option>
                            <option>2020</option>
                            <option>2019</option>
                            <option>2018</option>
                            <option>2017</option>
                        </Form.Control>

                    </Form.Group>
                    <input type="submit" value="Search" className="btn btn-primary spaced" onClick={props.searchDataBase} />
                    {/* CSV download react component button */}
                    <CsvDownload data={props.displayContent} filename="birdData.csv" className="btn btn-primary spaced" />
                </Form>


            </div>
            {/* <div>
                {/* CSV download react component button */}
            {/* <CsvDownload data={props.displayContent} filename="birdData.csv" className="btn btn-primary" />
            </div>  */}
            {/* //ternary operator that will iterate through each entry using a key */}
            {props.displayContent ? props.displayContent.map(data => (
                <div>
                    {/* <div><strong>{bird} Monitor Observation report(s)</strong></div> */}
                    <table className="table table-striped">
                        {/* <thead>
                        <tr>
                            <th scope="col">Season</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date Observed</th>
                            <th scope="col">See Full Report</th>
                        </tr>
                    </thead> */}
                        <tbody>

                            <tr key={data._id}>
                                <th scope="column" >{data.season}</th>
                                <td >{data.location}</td>
                                <td >{data.date_visited}</td>
                                <td>
                                    <Link to={`/report_modal/${data.bird}/${data._id}`} className="btn btn-primary" style={{ cursor: 'pointer' }}>click here</Link>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>)) : <em>Loading...</em>}
        </div >
    )
}
