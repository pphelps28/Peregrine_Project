import React from 'react';
import CsvDownload from 'react-json-to-csv'
import { Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'


//shows the administrative side of the site. Otherwise a please log in message displays

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
        props.loggedIn ?
            <div >

                <div className="container report_page" >

                    <Form>
                        {/* -----------------------Bird Observed Radio -------------------*/}
                        <Form.Group as={Col}>
                            <Form.Label as="legend" column sm={10}>
                                <strong>Please Select a Species:</strong>
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Bald Eagle"
                                    value="Bald Eagle"
                                    name="bird"
                                    id="formHorizontalRadios1"
                                    className='radioButton'
                                    onChange={props.birdChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Peregrine Falcon"
                                    value="Peregrine Falcon"
                                    name="bird"
                                    id="formHorizontalRadios2"
                                    className='radioButton'
                                    onChange={props.birdChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* ----------------------------------- New Nesting Site Input --------------------------- */}
                        <div className='border-top border-dark border-double padding-top'>
                            <Form.Group as={Col}>
                                <Form.Label as="legend" className='padding-top' column sm={20}><strong>Add a nesting site</strong></Form.Label>

                            </Form.Group>
                        </div>
                        <div className="form-group">
                            <div className='label-button-container'>
                                <label>Site to add:</label>
                                <input type="submit" value="Add" className="btn btn-primary spaced" onClick={props.addNestingSite} />
                            </div>
                            <input
                                type="text"
                                id='site-add'
                                required
                                className="form-control"
                                value={props.nestingSite}
                                onChange={props.nestingSiteChange}
                            />
                        </div>

                        {/* -----------------------Observation Report Search -------------------*/}
                        <div className='border-top border-dark border-double padding-top'>
                            <Form.Group as={Col} >
                                <Form.Label as="legend" className='padding-top' column sm={20}><strong>Search and Read Monitor Reports</strong></Form.Label>
                            </Form.Group>
                        </div>

                        {/*------------------------- Location Site Name ------------------------*/}
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Please select a nesting site (leave blank to retrieve all reports):</Form.Label>
                            <Form.Control as="select" custom value={props.site} onChange={props.siteChange}>
                                {props.sitesList.map((site, index) => (
                                    <option key={index} >{site}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {/*------------------------- Season Selector ------------------------*/}
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Please select a season (leave blank to retrieve multiple years):</Form.Label>
                            <Form.Control as="select" custom value={props.season} onChange={props.seasonChange}>
                                <option></option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                            </Form.Control>

                        </Form.Group>
                        <input type="submit" value="Search" className="btn btn-primary spaced" onClick={props.searchDataBase} />

                        {/* --------------------CSV download react component button, enables report to be downloaded as CSV--------------- */}
                        <CsvDownload data={props.displayContent} filename="birdData.csv" className="btn btn-primary spaced" />

                    </Form>

                    <div className='dataContainer'>
                        {/* //ternary operator that will iterate through each entry using a key */}
                        {props.displayContent ? props.displayContent.map(data => (

                            <div className='data'>

                                <table className="table table-striped">

                                    <tbody>

                                        <tr key={data._id}>
                                            <th scope="column" >{data.season}</th>
                                            <td >{data.location}</td>
                                            <td >{data.date_visited}</td>
                                            <td >
                                                <Link to={`/report_modal/${data.bird}/${data._id}`} className="btn btn-primary" style={{ cursor: 'pointer' }}>click here</Link>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        )) : <em>Loading...</em>}

                    </div>

                </div>
            </div>

            : <div id="login-message">Log in to see this page</div>
    )
}
