import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { Form, Col, Button } from 'react-bootstrap';
import Header from '../components/Header';


// Landing page for monitors.  The place to input all information
export default function InputForm(props) {

	return (
		<div className="form">
			<Header />
			<Form className="d-xs-block d-sm-block d-md-block d-lg-block d-xl-block">
				<h3 className="title">Observation Form</h3>
				{/*------------------------- Insert name ----------------------*/}
				<div className="form-group">
					<label>Name: </label>
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
					<label>Email: </label>
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
					<Form.Label>Select Site:</Form.Label>
					<Form.Control as="select" custom value={props.site} onChange={props.siteChange}>
						{props.sitesList.map(site => (
							<option>{site}</option>
						))}
					</Form.Control>
				</Form.Group>
				{/*-------------------------- Date Observed -------------------------------*/}
				<div className="form-group">
					<label>Date: </label>
					<div>
						<DatePicker maxDate={new Date()} className='input' title='Date Observed' selected={props.date_observed} onSelect={props.dateChange} />
					</div>
				</div>
				{/* ---------------------------- Mileage to and from site -------------------*/}
				<div className="form-group">
					<label>Mileage to and from site: </label>
					<input
						type="text"
						required
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
						required
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
					<TimePicker amPmAriaLabel disableClock={true} clearIcon selected={props.timeStart} onChange={props.timeStartChange} />
				</div>
				{/* <div className="form-group">
					<label>Observation Start Time: </label>
					<div>
						<DatePicker
							selected={props.timeStart}
							onChange={props.timeStartChange}
							showTimeSelect
							dateFormat="Pp"
						/>
					</div>
				</div> */}
				{/* -------------------------------------- Observation End Time -------------------------- */}
				<div className="form-group">
					<label>End Time of Observation:</label>
					<br></br>
					<TimePicker amPmAriaLabel disableClock={true} clearIcon selected={props.timeEnd} onChange={props.timeEndChange} />
				</div>

				{/* <div className="form-group">
					<label>Observation End Time: </label>
					<div>
						<DatePicker
							selected={props.timeEnd}
							onChange={props.timeEndChange}
							showTimeSelect
							dateFormat="Pp"
						/>
					</div>
				</div> */}
				{/* ----------------------------------- Total Observation Time --------------------------- */}
				<div className="form-group">
					<label>Total Observation Time: </label>
					<input
						type="text"
						required
						className="form-control"
						name="totalTime"
						onFocus={props.totalTimeCalculator}
						// onClick={props.totalTimeCalculator}
						value={props.totalTime}
						onChange={props.formChange}
					/>
				</div>
				{/* ------------------------ Weather Qualitative Observation ------------------------*/}
				<div className="form-group">
					<label>Weather Observation </label>
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
				{/* ---------------------------- Temperature --------------------------*/}
				{/* <div className="form-group">
					<label>Temperature (in F, can provide a 5-10 degree range): </label>
					<input
						type="text"
						required
						className="form-control"
						name="temperature"
						value={props.temperature}
						onChange={props.formChange}
					/>
				</div> */}
				{/* ------------------------- Precipitation ---------------------------------*/}
				{/* <Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Precipitation:
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Fog"
							value="Fog"
							name="precipitation"
							id="formHorizontalRadios1"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Drizzle"
							value="Drizzle"
							name="precipitation"
							id="formHorizontalRadios2"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Rain-heavy"
							value="Rain-heavy"
							name="precipitation"
							id="formHorizontalRadios3"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Rain-light"
							value="Rain-light"
							name="precipitation"
							id="formHorizontalRadios4"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="None"
							value="None"
							name="precipitation"
							id="formHorizontalRadios5"
							onChange={props.formChange}
						/>
					</Col>
				</Form.Group> */}
				{/* ------------------------------Cloud Cover---------------- */}
				{/* <Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Cloud Cover:
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Clear =<10% cover"
							value="Clear =<10% cover"
							name="cloud"
							id="formHorizontalRadios6"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Scattered= 10-50% cover"
							value="Scattered= 10-50% cover"
							name="cloud"
							id="formHorizontalRadios7"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Broken = 50-90% cover"
							value="Broken = 50-90% cover"
							name="cloud"
							id="formHorizontalRadios8"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Overcast = >90% cover"
							value="Overcast = >90% cover"
							name="cloud"
							id="formHorizontalRadios9"
							onChange={props.formChange}
						/>
					</Col>
				</Form.Group> */}
				{/* ---------------------------Wind Speed ---------------------- */}
				{/* <Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Wind Speed:
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="0-5 mph = low, calm"
							value="0-5 mph = low, calm"
							name="wind"
							id="formHorizontalRadios10"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="5-10 mph = moderate"
							value="5-10 mph = moderate"
							name="wind"
							id="formHorizontalRadios11"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="10-15 mph = strong"
							value="10-15 mph = strong"
							name="wind"
							id="formHorizontalRadios12"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="15-20 mph = very strong"
							value="15-20 mph = very strong"
							name="wind"
							id="formHorizontalRadios13"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label=">20 mph not recommended"
							value=">20 mph not recommended"
							name="wind"
							id="formHorizontalRadios14"
							onChange={props.formChange}
						/>
					</Col>
				</Form.Group> */}

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
						<Form.Label as="legend" column sm={10}>
							Approximate age(s):
						</Form.Label>
						<Col sm={10}>

							<Form.Row>
								<Form.Check
									inline
									type="radio"
									label="Hatchling (0-2 months)"
									value="Hatchling"
									name="eagleAge"
									id="eagleData3"
									onChange={props.formChange}
								/>
								<Form.Check
									inline
									type="radio"
									label="Fledgling (2-4 months)"
									value="Fledgling"
									name="eagleAge"
									id="eagleData4"
									onChange={props.formChange}
								/>
								<Form.Check
									inline
									type="radio"
									label="Juvenile (1-3 years)"
									value="Juvenile"
									name="eagleAge"
									id="eagleData5"
									onChange={props.formChange}
								/>
								<Form.Check
									inline
									type="radio"
									label="Adult (4+ years)"
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
						<Form.Label as="legend" column md={12} lg={2}>Single Bird</Form.Label>
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
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Territorial Pair</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Courtship / Copulation</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Incubating</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Hatched</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Nest Failure</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Fledged</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
					<Form.Row>
						<Form.Label as="legend" column md={12} lg={2}>Human Disturbance</Form.Label>
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
							id="formHorizontalRadios15"
							onChange={props.formChange}
							label='Unknown'
							sm={12} md={4} lg={1}
						/>
					</Form.Row>
				</Form.Group>
				{/* <Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Relationship Status:
					</Form.Label>
					<Col sm={10}>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Single Bird (Suspected)"
								value="Single Bird (Suspected)"
								name="relationshipStatus"
								id="formHorizontalRadios15"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Single Bird (Confirmed)"
								value="Single Bird (Confirmed)"
								name="relationshipStatus"
								id="formHorizontalRadios15a"
								onChange={props.formChange}
							/>
						</Form.Row>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Territorial Pair (Suspected)"
								value="Territorial Pair (Suspected)"
								name="relationshipStatus"
								id="formHorizontalRadios16"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Territorial Pair (Confirmed)"
								value="Territorial Pair (Confirmed)"
								name="relationshipStatus"
								id="formHorizontalRadios16a"
								onChange={props.formChange}
							/>
						</Form.Row>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Courtship/Copulation (Suspected)"
								value="Courtship/Copulation (Suspected)"
								name="relationshipStatus"
								id="formHorizontalRadios17"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Courtship/Copulation (Confirmed)"
								value="Courtship/Copulation (Confirmed)"
								name="relationshipStatus"
								id="formHorizontalRadios17a"
								onChange={props.formChange}
							/>
						</Form.Row>
					</Col>
				</Form.Group> */}
				{/* ----------------------------Nesting Status  -----------------------*/}
				{/* <Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Nesting Status:
					</Form.Label>
					<Col sm={10}>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Incubating (Suspected)"
								value="Incubating (Suspected)"
								name="youngStatus"
								id="formHorizontalRadios18"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Incubating (Confirmed)"
								value="Incubating (Confirmed)"
								name="youngStatus"
								id="formHorizontalRadios18a"
								onChange={props.formChange}
							/>
						</Form.Row>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Hatched (Suspected)"
								value="Hatched (Suspected)"
								name="youngStatus"
								id="formHorizontalRadios19"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Hatched (Confirmed)"
								value="Hatched (Confirmed)"
								name="youngStatus"
								id="formHorizontalRadios19a"
								onChange={props.formChange}
							/>
						</Form.Row>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Nest Failure (Suspected)"
								value="Nest Failure (Suspected)"
								name="youngStatus"
								id="formHorizontalRadios20"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Nest Failure (Confirmed)"
								value="Nest Failure (Confirmed)"
								name="youngStatus"
								id="formHorizontalRadios20a"
								onChange={props.formChange}
							/>
						</Form.Row>
						<Form.Row>
							<Form.Check
								inline
								type="radio"
								label="Fledged (Suspected)"
								value="Fledged (Suspected)"
								name="youngStatus"
								id="formHorizontalRadios21"
								onChange={props.formChange}
							/>
							<Form.Check
								inline
								type="radio"
								label="Fledged (Confirmed)"
								value="Fledged (Confirmed)"
								name="youngStatus"
								id="formHorizontalRadios21a"
								onChange={props.formChange}
							/>
						</Form.Row>
					</Col>
				</Form.Group>
				<Form.Group as={Col} >
					<Form.Label as="legend" column sm={10}>
						Disturbance:
						</Form.Label>
					<Col sm={10}>
						<Form.Check
							inline
							type="radio"
							label="Human Disturbance (Suspected)"
							value="Human Disturbance (Suspected)"
							name="disturbance"
							id="formHorizontalRadios22"
							onChange={props.formChange}
						/>
						<Form.Check
							inline
							type="radio"
							label="Human Disturbance (Confirmed)"
							value="Human Disturbance (Confirmed)"
							name="disturbance"
							id="formHorizontalRadios22a"
							onChange={props.formChange}
						/>
					</Col>
				</Form.Group> */}
				{/* -----------------------------Incubation -------------------------- */}
				<div className="form-group">
					<label>If incubation was confirmed, where is the location of the eyrie? </label>
					<input
						type="text"
						required
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
						required
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
						required
						className="form-control"
						name="youngAge"
						value={props.youngAge}
						onChange={props.formChange}
					/>
				</div>
				{/* -------------------image upload -------------------- */}
				<div id="image-upload">
					<label for="img">Upload image:</label>
					<input
						style={{ margin: '5px' }}
						onChange={props.imageChange}
						type="file"
						id="img"
						name="img"
						accept="image/*"
					/>
				</div>

				{/* -----------------------------Recorded Observations ------------------- */}
				<div className="form-group">
					<label>Recorded Observations (include time of observation): </label>
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
					<label>Remarks/Comments: </label>
					<textarea
						type="text"
						required
						className="form-control"
						name="comments"
						value={props.comments}
						onChange={props.formChange}
						rows="6"
					/>
				</div>
				{/* --------------------------Submit-------------------------------- */}
				<input type="submit" value="Submit Form" className="btn btn-primary" onClick={props.handleSubmit} />
			</Form>
		</div >
	);
}
