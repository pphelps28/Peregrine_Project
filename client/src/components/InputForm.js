import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { Form, Col } from 'react-bootstrap';
import Header from '../components/Header';


// Landing page for monitors.  The place to input all information
export default function InputForm(props) {

	return (
		<div className="form">
			<Header />
			<Form className="d-xs-block d-sm-block d-md-block d-lg-block d-xl-block" onSubmit={props.handleSubmit}>
				<h3 className="title">Observation Form</h3>
				{/*------------------------- Insert name ----------------------*/}
				<div className="form-group">
					<span className="required">*</span><label>Name: </label>
					<input
						type="text"
						required
						className="form-control"
						name="name"
						value={props.name}
						onChange={props.formChange}
					/>
				</div>
				{/*------------------------- email  -----------------------*/}
				<div className="form-group">
					<span className="required">*</span><label>Email: </label>
					<input
						type="text"
						required
						className="form-control"
						name="email"
						value={props.email}
						onChange={props.formChange}
					/>
				</div>
				{/* -----------------------Bird Observed Radio -------------------*/}
				<Form.Group as={Col}>

					<Form.Label as="legend" column sm={10}>
						Please select the species you observed.
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Bald Eagle"
							value="Bald Eagle"
							name="birds"
							id="formHorizontalRadios25"
							className='radio'
							onChange={props.birdChange}
						/>
						<Form.Check
							type="radio"
							label="Peregrine Falcon"
							value="Peregrine Falcon"
							name="birds"
							id="formHorizontalRadios26"
							className='radio'
							onChange={props.birdChange}
						/>
					</Col>
				</Form.Group>
				{/*------------------------- Location Site Name ------------------------*/}
				<Form.Group controlId="exampleForm.SelectCustom">
					<span className="required">*</span><label>Select Site: </label>
					<Form.Control as="select" custom value={props.site} onChange={props.siteChange}>
						{props.sitesList.map((site, index) => (
							<option key={index}>{site}</option>
						))}
					</Form.Control>
				</Form.Group>
				{/*-------------------------- Date Observed -------------------------------*/}
				<div className="form-group">
					<span className="required">*</span><label>Date: </label>
					<div>
						<DatePicker maxDate={new Date()} className='input' title='Date Observed' selected={props.date_observed} onSelect={props.dateChange} />
					</div>
				</div>
				{/* ---------------------------- Mileage to and from site -------------------*/}
				<div className="form-group">
					<label>Mileage to and from site: </label>
					<input
						type="text"
						className="form-control"
						name="mileage"
						value={props.mileage}
						onChange={props.formChange}
					/>
				</div>
				{/* ------------------------------------------ Travel Time ------------------------------*/}
				<div className="form-group">
					<label>Travel Time(Including Hike): </label>
					<input
						type="text"
						className="form-control"
						name="travel"
						value={props.travel}
						onChange={props.formChange}
					/>
				</div>
				{/* --------------------------------------- Observation Start Time ------------------------------*/}
				<div className="form-group">
					<label>Start Time of Observation:</label>
					<br></br>
					<TimePicker amPmAriaLabel={"amPmAriaLabel"} disableClock={true} clearIcon={null} selected={props.timeStart} onChange={props.timeStartChange} />
				</div>

				{/* -------------------------------------- Observation End Time -------------------------- */}
				<div className="form-group">
					<label>End Time of Observation:</label>
					<br></br>
					<TimePicker amPmAriaLabel={"amPmAriaLabel"} disableClock={true} clearIcon={null} selected={props.timeEnd} onChange={props.timeEndChange} />
				</div>

				{/* ------------------------ Weather Qualitative Observation ------------------------*/}
				<div className="form-group">
					<span className="required">*</span><label>Weather Observations: </label> <br />
					<small className="help-block"> (Please include cloud cover, wind, temperature and other environmental notes to help researchers get context for observation.):</small>
					<textarea
						type="text"
						required
						className="form-control"
						name="weatherObservation"
						value={props.weatherObservation}
						onChange={props.formChange}
						rows="6"
					/>
				</div>

				{/* ---------------------------------Observation Summary ----------------------- */}
				{/* ---------------------------------Eagle Specific Fields ----------------------- */}
				{(props.bird === 'Bald Eagle') ?
					<Form.Group as={Col}>
						<Form.Label as="legend" column sm={10}>
							Banded:
					</Form.Label>
						<Col sm={10}>
							<Form.Row>
								<Form.Check
									inline
									type="radio"
									label="Yes"
									value="Yes"
									name="eagleBand"
									id="eagleData1"
									onChange={props.formChange}
								/>
								<Form.Check
									inline
									type="radio"
									label="No"
									value="No"
									name="eagleBand"
									id="eagleData2"
									onChange={props.formChange}
								/>
							</Form.Row>
						</Col>
						{/* Age groups based on info from Margaret Fowle head of Audubon Peregrine/Eagle monitoring program */}
						<Form.Label as="legend" column sm={10}>
							Approximate ages (if there is a pair):
						</Form.Label>
						<Col sm={10}>

							<Form.Row>
								<Form.Check
									inline
									type="radio"
									label="Juvenile (brown head feathers)"
									value="Juvenile"
									name="eagleAge"
									id="eagleData5"
									onChange={props.formChange}
								/>
								<Form.Check
									inline
									type="radio"
									label="Sub Adult (dirty white head)"
									value="Sub Adult"
									name="eagleAge"
									id="eagleData4"
									onChange={props.formChange}
								/>
								<Form.Check
									inline
									type="radio"
									label="Adult (full white head)"
									value="Adult"
									name="eagleAge"
									id="eagleData6"
									onChange={props.formChange}
								/>
							</Form.Row>
						</Col>
					</Form.Group> : null}
				{/* ---------------------------------Relationship Status  -----------------------*/}
				<div className="form-group">
					<label>Observation summary (fill in all that apply):</label>
				</div>
				<Form.Group as={Col}>


					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Single Bird</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="singleBird"
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="singleBird"
							id="formHorizontalRadios15a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="singleBird"
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Territorial Pair</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="birdPair"
							id="formHorizontalRadios16"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="birdPair"
							id="formHorizontalRadios16a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="birdPair"
							id="formHorizontalRadios16b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Courtship / Copulation</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="courtship"
							id="formHorizontalRadios17"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="courtship"
							id="formHorizontalRadios17a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="courtship"
							id="formHorizontalRadios17b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Incubating</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="incubating"
							id="formHorizontalRadios18"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="incubating"
							id="formHorizontalRadios18a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="incubating"
							id="formHorizontalRadios18b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Hatched</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="hatched"
							id="formHorizontalRadios19"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="hatched"
							id="formHorizontalRadios19a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="hatched"
							id="formHorizontalRadios19b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Nest Failure </b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="nestFailure"
							id="formHorizontalRadios20"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="nestFailure"
							id="formHorizontalRadios20a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="nestFailure"
							id="formHorizontalRadios20b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Fledged</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="fledged"
							id="formHorizontalRadios21"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="fledged"
							id="formHorizontalRadios21a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="fledged"
							id="formHorizontalRadios21b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={12}><b>Human Disturbance</b></Form.Label>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Confirmed"
							name="disturbance"
							id="formHorizontalRadios22"
							onChange={props.formChange}
							label='Confirmed'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="Suspected"
							name="disturbance"
							id="formHorizontalRadios22a"
							onChange={props.formChange}
							label='Suspected'
							sm={12} md={4} lg={1}
						/>
						<Form.Check
							inline
							type="radio"
							className='button-padding'
							value="None"
							name="disturbance"
							id="formHorizontalRadios22b"
							onChange={props.formChange}
							label='Unselect'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
				</Form.Group>

				{/* -----------------------------Incubation -------------------------- */}
				<div className="form-group">
					<label>If incubation was confirmed, where is the location of the eyrie? </label>
					<input
						type="text"
						className="form-control"
						name="incubation"
						value={props.incubation}
						onChange={props.formChange}
					/>
				</div>
				{/* -------------------------------Young ----------------- */}
				<div className="form-group">
					<label>If young exist, how many were there? </label>
					<input
						type="text"
						className="form-control"
						name="young"
						value={props.young}
						onChange={props.formChange}
					/>
				</div>
				{/* ---------------------------Young ages ---------------------- */}
				<div className="form-group">
					<label>If young exist, what were the approximate ages? </label>
					<input
						type="text"
						className="form-control"
						name="youngAge"
						value={props.youngAge}
						onChange={props.formChange}
					/>
				</div>

				{/* -------------------image upload and caption -------------------- */}
				<div id="image-upload">
					<label htmlFor="img">Upload image</label>
					<input
						style={{ margin: '5px' }}
						onChange={props.imageChange}
						type="file"
						id="img"
						name="img"
						accept="image/*"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="caption">Please write a brief caption to explain why you chose this image:</label>
					<textarea
						type="text"
						className="form-control"
						name="caption"
						value={props.caption}
						onChange={props.formChange}
						rows="1"
					/>
				</div>

				{/* -----------------------------Recorded Observations ------------------- */}
				<div className="form-group">
					<span className="required">*</span><label>Species Specific Observations (please include time of observation):  </label> <br />
					<textarea
						type="text"
						required
						className="form-control"
						name="observation"
						value={props.observation}
						onChange={props.formChange}
						rows="6"
					/>
				</div>
				{/* ---------------------Remarks Comments --------------------------*/}
				<div className="form-group">
					<label>Remarks (context for the observations): </label>
					<textarea
						type="text"
						className="form-control"
						name="comments"
						value={props.comments}
						onChange={props.formChange}
						rows="6"
					/>
				</div>
				{/* --------------------- Species Codes --------------------------*/}
				<div className="form-group">
					<div id='species-codes'>
						<table className='speciesBox'>
							<thead>
								<td></td>
								<td id='mild-bold'>Species Codes</td>


								<th></th>
								<th></th>

							</thead>
							<tbody >
								<tr key='species-codes-row1' className='speciesBox'>

									<td className='pushLeft'>Bald Eagle</td>
									<td className='pushLeft'>BAEA</td>
									<td className='pushLeft'>Red-Tailed Hawk</td>
									<td className='pushLeft pushRight'>RTHA</td>
								</tr>
								<tr key="species-codes-row2" className='speciesBox'>
									<td className='pushLeft'>Golden Eagle</td>
									<td className='pushLeft'>GOEA</td>
									<td className='pushLeft'>Red-shouldered Hawk</td>
									<td className='pushLeft pushRight'>RSHA</td>
								</tr>
								<tr key='species-codes-row3' className='speciesBox'>
									<td className='pushLeft'>Osprey</td>
									<td className='pushLeft'>OSPR</td>
									<td className='pushLeft'>Broad-winged Hawk</td>
									<td className='pushLeft pushRight'>BWHA</td>
								</tr>
								<tr key='species-codes-row4' className='speciesBox'>
									<td className='pushLeft'>Northern Harrier</td>
									<td className='pushLeft'>NOHA</td>
									<td className='pushLeft'>Peregrine Falcon</td>
									<td className='pushLeft pushRight'>PEFA</td>
								</tr>
								<tr key='species-codes-row5' className='speciesBox'>
									<td className='pushLeft'>Northern Goshawk</td>
									<td className='pushLeft'>NOGO</td>
									<td className='pushLeft'>Merlin</td>
									<td className='pushLeft pushRight'>MERL</td>
								</tr>
								<tr key='species-codes-row6' className='speciesBox'>
									<td className='pushLeft'>Cooper's Hawk</td>
									<td className='pushLeft'>COHA</td>
									<td className='pushLeft'>American Kestrel</td>
									<td className='pushLeft pushRight'>AMKE</td>
								</tr>
								<tr key='species-codes-row7' className='speciesBox'>
									<td className='pushLeft'>Sharp-shinned Hawk</td>
									<td className='pushLeft'>SSHA</td>
									<td className='pushLeft'>Common Raven</td>
									<td className='pushLeft pushRight'>CORA</td>
								</tr>

								<tr key='species-codes-row8' className='speciesBox'>
									<td className='pushLeft'>Turkey Vulture</td>
									<td className='pushLeft'>TUVU</td>
									<td className='pushLeft'>American Crow</td>
									<td className='pushLeft pushRight'>AMCR</td>
								</tr>


							</tbody>
						</table>
					</div>

				</div>
				{/* --------------------------Submit-------------------------------- */}
				<button type="submit" value="Submit Form" className="btn btn-primary" >Submit Form</button>
			</Form>
		</div >
	);
}
