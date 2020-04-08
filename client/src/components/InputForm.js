import React from 'react';
import DatePicker from 'react-datepicker';
import { Form, Col } from 'react-bootstrap';
import Header from '../components/Header'

export default function InputForm(props) {
	return (
		<div>
			<Header />
			<Form className="d-xs-block d-sm-block d-md-block d-lg-block d-xl-block">
				<h3 className='title'>Observation Form</h3>
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
						Which species did you observe?
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Bald Eagle"
							value="Bald Eagle"
							name="birds"
							id="formHorizontalRadios25"
							onChange={props.birdChange}
						/>
						<Form.Check
							type="radio"
							label="Peregrine Falcon"
							value="Peregrine Falcon"
							name="birds"
							id="formHorizontalRadios26"
							onChange={props.birdChange}
						/>
					</Col>
				</Form.Group>
				{/*------------------------- Location Site Name ------------------------*/}
				<Form.Group controlId="exampleForm.SelectCustom">
					<Form.Label>Select Site:</Form.Label>
					<Form.Control as="select" custom value={props.site} onChange={props.siteChange}>
						<option></option>
						<option>Arrowhead Mountain (Milton)</option>
						<option>Bald Mountain (West Haven)</option>
						<option>Ball Mountain (Jamaica)</option>
						<option>Barnet Roadcut (Barnet)</option>
						<option>Bethel Quarry (Bethel)</option>
						<option>Bolton Notch - Upper Upper West (Bolton)</option>
						<option>Bone Mt (Bolton)</option>
						<option>Bradford Cliff (Bradford)</option>
						<option>Bristol Cliff (Bristol)</option>
						<option>Brousseau Mountain (Averill)</option>
						<option>Camels Hump (Duxbury)</option>
						<option>Checkerberry Ledge (Bakersfield)</option>
						<option>Crystal Lake (Barton)</option>
						<option>Deer Leap (Bristol)</option>
						<option>Eagle Ledge (Vershire)</option>
						<option>Eagle Mountain (Milton)</option>
						<option>Elephant Mountain (Bristol)</option>
						<option>Fairlee Palisades (Fairlee)</option>
						<option>Hawk Rock (Newark)</option>
						<option>Hawks Mountain (Weathersfield)</option>
						<option>Hawkins Pond (Calais)</option>
						<option>Haystack Mountain (Pawlet)</option>
						<option>Hazen's Notch (Lowell)</option>
						<option>Highgate Cliffs (Highgate Springs)</option>
						<option>Jobs Mountain(Westmore)</option>
						<option>Lamoille River (Milton)</option>
						<option>Lone Rock Point (Burlingotn)</option>
						<option>Mallet's Bay (Colchester)</option>
						<option>Marshfield Mountain (Marshfield)</option>
						<option>Mount Equinox (Manchester)</option>
						<option>Mount Horrid (Brandon)</option>
						<option>Mount Pisgah (Westmore)</option>
						<option>Mount Norris (Lowell)</option>
						<option>Nebraska Notch (Underhill)</option>
						<option>Nichols Ledge (Woodbury)</option>
						<option>Pond MOuntain (Wells)</option>
						<option>Prospect Rock (Johnson)</option>
						<option>Quarry Hill (Pownal)</option>
						<option>Rattlesnake Point (Salisbury)</option>
						<option>Rattlesnake Ridge (Benson)</option>
						<option>Red Rock (Hinesburg)</option>
						<option>Red Rocks Park (South Burlington)</option>
						<option>Rock of Ages QUarry (Barre)</option>
						<option>Ryegate Quarry (Ryegate)</option>
						<option>Sawyer Mountain (Fairlee)</option>
						<option>Skitchewaug Mountain (Springfield)</option>
						<option>Smuggler's Notch (Cambridge)</option>
						<option>Snake Mountain (Addison)</option>
						<option>Sutherland Quarry/Proctor (Proctor)</option>
						<option>Swanton Quarry (Swanton)</option>
						<option>Vermont Yankee (Vernon)</option>
						<option>Vulture Mountain (Springfield)</option>
						<option>Wallace Ledge (Castleton)</option>
						<option>Whitcomb Quarry (Colchester)</option>
						<option>White Rocks (Wallingford)</option>
					</Form.Control>
				</Form.Group>
				{/*-------------------------- Date Observed -------------------------------*/}
				<div className="form-group">
					<label>Date: </label>
					<div>
						<DatePicker selected={props.date_observed} onChange={props.dateChange} />
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
					<label>Observation Start Time: </label>
					<div>
						<DatePicker
							selected={props.timeStart}
							onChange={props.timeStartChange}
							showTimeSelect
							dateFormat="Pp"
						/>
					</div>
				</div>
				{/* -------------------------------------- Observation End Time -------------------------- */}
				<div className="form-group">
					<label>Observation End Time: </label>
					<div>
						<DatePicker
							selected={props.timeEnd}
							onChange={props.timeEndChange}
							showTimeSelect
							dateFormat="Pp"
						/>
					</div>
				</div>
				{/* ----------------------------------- Total Observation Time --------------------------- */}
				<div className="form-group">
					<label>Total Observation Time: </label>
					<input
						type="text"
						required
						className="form-control"
						name="totalTime"
						value={props.totalTime}
						onChange={props.formChange}
					/>
				</div>
				{/* ---------------------------- Temperature --------------------------*/}
				<div className="form-group">
					<label>Temperature (in F, can provide a 5-10 degree range): </label>
					<input
						type="text"
						required
						className="form-control"
						name="temperature"
						value={props.temperature}
						onChange={props.formChange}
					/>
				</div>
				{/* ------------------------- Precipitation ---------------------------------*/}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>

						Precipitation:

					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Fog"
							value="Fog"
							name="precipitation"
							checked={props.precipitation === "Fog"}
							id="formHorizontalRadios1"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Drizzle"
							value="Drizzle"
							name="precipitation"
							checked={props.precipitation === "Drizzle"}
							id="formHorizontalRadios2"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Rain-heavy"
							value="Rain-heavy"
							name="precipitation"
							checked={props.precipitation === "Rain-heavy"}
							id="formHorizontalRadios3"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Rain-light"
							value="Rain-light"
							name="precipitation"
							checked={props.precipitation === "Rain-light"}
							id="formHorizontalRadios4"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="None"
							value="None"
							name="precipitation"
							checked={props.precipitation === "None"}
							id="formHorizontalRadios5"
							onChange={props.formChange}
						/>
					</Col>
				</Form.Group>
				{/* ------------------------------Cloud Cover---------------- */}
				<Form.Group as={Col}>
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
							onChange={props.cloudCoverChange}
						/>
						<Form.Check
							type="radio"
							label="Scattered= 10-50% cover"
							value="Scattered= 10-50% cover"
							name="cloud"
							id="formHorizontalRadios7"
							onChange={props.cloudCoverChange}
						/>
						<Form.Check
							type="radio"
							label="Broken = 50-90% cover"
							value="Broken = 50-90% cover"
							name="cloud"
							id="formHorizontalRadios8"
							onChange={props.cloudCoverChange}
						/>
						<Form.Check
							type="radio"
							label="Overcast = >90% cover"
							value="Overcast = >90% cover"
							name="cloud"
							id="formHorizontalRadios9"
							onChange={props.cloudCoverChange}
						/>
					</Col>
				</Form.Group>
				{/* ---------------------------Wind Speed ---------------------- */}
				<Form.Group as={Col}>
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
							onChange={props.windSpeedChange}
						/>
						<Form.Check
							type="radio"
							label="5-10 mph = moderate"
							value="5-10 mph = moderate"
							name="wind"
							id="formHorizontalRadios11"
							onChange={props.windSpeedChange}
						/>
						<Form.Check
							type="radio"
							label="10-15 mph = strong"
							value="10-15 mph = strong"
							name="wind"
							id="formHorizontalRadios12"
							onChange={props.windSpeedChange}
						/>
						<Form.Check
							type="radio"
							label="15-20 mph = very strong"
							value="15-20 mph = very strong"
							name="wind"
							id="formHorizontalRadios13"
							onChange={props.windSpeedChange}
						/>
						<Form.Check
							type="radio"
							label=">20 mph not recommended"
							value=">20 mph not recommended"
							name="wind"
							id="formHorizontalRadios14"
							onChange={props.windSpeedChange}
						/>
					</Col>
				</Form.Group>
				{/* ---------------------------------Observation Summary ----------------------- */}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Observation Summary (all that apply):
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Single Bird"
							value="Single Bird"
							name="relationshipStatus"
							id="formHorizontalRadios15"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Territorial Pair"
							value="Territorial Pair"
							name="relationshipStatus"
							id="formHorizontalRadios16"
							onChange={props.formChange}

						/>
						<Form.Check
							type="radio"
							label="Courtship/Copulation"
							value="Courtship/Copulation"
							name="relationshipStatus"
							id="formHorizontalRadios17"
							onChange={props.formChange}
						/>
						<hr />
						<Form.Check
							type="radio"
							label="Incubating"
							value="Incubating"
							name="youngStatus"
							id="formHorizontalRadios18"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Hatched"
							value="Hatched"
							name="youngStatus"
							id="formHorizontalRadios19"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Nest Failure"
							value="Nest Failure"
							name="youngStatus"
							id="formHorizontalRadios20"
							onChange={props.formChange}
						/>
						<Form.Check
							type="radio"
							label="Fledged"
							value="Fledged"
							name="youngStatus"
							id="formHorizontalRadios21"
							onChange={props.formChange}
						/>
						<hr />
						<Form.Check
							type="radio"
							label="Human Disturbance"
							value="Human Disturbance"
							name="disturbance"
							id="formHorizontalRadios22"
							onChange={props.formChange}
						/>
					</Col>
				</Form.Group>
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
					<label>If young exist, what were the aproximate ages? </label>
					<input
						type="text"
						required
						className="form-control"
						name="youngAge"
						value={props.youngAge}
						onChange={props.formChange}
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
		</div>
	);
}
