import React from 'react';
import DatePicker from 'react-datepicker';
import { Form, Row, Col } from 'react-bootstrap';

export default function InputForm(props) {
	return (
		<div>
			<Form>
				{/*------------------------- Insert name ----------------------*/}
				<div className="form-group">
					<label>Name </label>
					<input
						type="text"
						required
						className="form-control"
						value={props.name}
						onChange={props.nameChange}
					/>
				</div>
				{/*------------------------- email  -----------------------*/}
				<div className="form-group">
					<label>Email </label>
					<input
						type="text"
						required
						className="form-control"
						value={props.email}
						onChange={props.emailChange}
					/>
				</div>
				{/* -----------------------Bird Observed Radio -------------------*/}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Which Bird did you Observe
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Bald Eagle"
							value="Bald Eagle"
							name="formHorizontalRadios"
							id="formHorizontalRadios1"
						/>
						<Form.Check
							type="radio"
							label="Peregrine Falcon"
							value="Peregrine Falcon"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
					</Col>
				</Form.Group>
				{/*------------------------- Location Site Name ------------------------*/}
				<div className="form-group">
					<label>Select Site </label>
					<select
						
						required
						className="form-control"
						value={props.site}
						onChange={props.siteChange}
					>
						{props.site.map((site) => {
							return (
								<option key={site} value={site}>
									{site}
								</option>
							);
						})}
					</select>
				</div>
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
						value={props.mileage}
						onChange={props.mileageChange}
					/>
				</div>
				{/* ------------------------------------------ Travel Time ------------------------------*/}
				<div className="form-group">
					<label>Travel Time(Including Hike): </label>
					<input
						type="text"
						required
						className="form-control"
						value={props.travel}
						onChange={props.travelChange}
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
						value={props.totalTime}
						onChange={props.totalTimeChange}
					/>
				</div>
				{/* ---------------------------- Temperature --------------------------*/}
				<div className="form-group">
					<label>Temperature (in F, can provide a 5-10 degree range): </label>
					<input
						type="text"
						required
						className="form-control"
						value={props.temperature}
						onChange={props.temperatureChange}
					/>
				</div>
				{/* ------------------------- Percipitation ---------------------------------*/}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Percipitation
					</Form.Label>
					<Col sm={10}>
						<Form.Check type="radio" label="Fog" name="formHorizontalRadios" id="formHorizontalRadios1" />
						<Form.Check
							type="radio"
							label="Drizzle"
							name="formHorizontalRadios"
							id="formHorizontalRadios3"
						/>
						<Form.Check
							type="radio"
							label="Rain-heavy"
							name="formHorizontalRadios"
							id="formHorizontalRadios4"
						/>
						<Form.Check
							type="radio"
							label="Rain-light"
							name="formHorizontalRadios"
							id="formHorizontalRadios5"
						/>
						</Col>
				</Form.Group>
				{/* ------------------------------Cloud Cover---------------- */}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Cloud Cover
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="Clear =<10% cover"
							name="formHorizontalRadios"
							id="formHorizontalRadios7"
						/>
						<Form.Check
							type="radio"
							label="Scattered= 10-50% cover"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="radio"
							label="Broken = 50-90% cover"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="radio"
							label="Overcast = >90% cover"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
					</Col>
				</Form.Group>
				{/* ---------------------------Wind Speed ---------------------- */}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Wind Speed
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="radio"
							label="0-5 mph = low, calm"
							name="formHorizontalRadios"
							id="formHorizontalRadios1"
						/>
						<Form.Check
							type="radio"
							label="5-10 mph = moderate"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="radio"
							label="10-15 mph = strong"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="radio"
							label="15-20 mph = very strong"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="radio"
							label=">20 mph not recommended"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
					</Col>
				</Form.Group>
				{/* ---------------------------------Observation Summary ----------------------- */}
				<Form.Group as={Col}>
					<Form.Label as="legend" column sm={10}>
						Observation Summary (all that apply)
					</Form.Label>
					<Col sm={10}>
						<Form.Check
							type="checkbox"
							label="Single Bird"
							name="formHorizontalRadios"
							id="formHorizontalRadios1"
						/>
						<Form.Check
							type="checkbox"
							label="Territorial Pair"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="checkbox"
							label="Courtship/Copulation"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="checkbox"
							label="Incubating"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="checkbox"
							label="Hatched"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="checkbox"
							label="Nest Failure"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="checkbox"
							label="Human Disturbance"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
						/>
						<Form.Check
							type="checkbox"
							label="Fledged"
							name="formHorizontalRadios"
							id="formHorizontalRadios2"
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
						value={props.incubation}
						onChange={props.incubationChange}
					/>
				</div>
				{/* -------------------------------Young ----------------- */}
				<div className="form-group">
					<label>If young exist, how many were there? </label>
					<input
						type="text"
						required
						className="form-control"
						value={props.young}
						onChange={props.youngChange}
					/>
				</div>
				{/* ---------------------------Young ages ---------------------- */}
				<div className="form-group">
					<label>If young exist, what were the aproximate ages? </label>
					<input
						type="text"
						required
						className="form-control"
						value={props.youngAge}
						onChange={props.youngAgeChange}
					/>
				</div>
				{/* -----------------------------Recorded Observations ------------------- */}
				<div className="form-group">
					<label>Recorded Observations (include time of observation) </label>
					<textarea
						type="text"
						required
						className="form-control"
						value={props.observation}
						onChange={props.observationChange}
						rows="6"
					/>
				</div>
				{/* ---------------------Remarks Comments --------------------------*/}
				<div className="form-group">
					<label>Remarks/Comments </label>
					<textarea
						type="text"
						required
						className="form-control"
						value={props.comments}
						onChange={props.commentsChange}
						rows="6"
					/>
				</div>
			</Form>
		</div>
	);
}

{
	/* <div id="container">
	<form id="form-input" onSubmit={props.handleSubmit}>
		Name <input className="input" type="text" name="name" value={props.name} onChange={props.nameChange} />
		Location{' '}
		<input className="input" type="text" name="location" value={props.location} onChange={props.locationChange} />
		Date Observed{' '}
		<DatePicker
			maxDate={new Date()}
			className="input"
			title="Date Observed"
			selected={props.date_observed}
			onChange={props.dateChange}
		/>
		Notes{' '}
		<textarea
			style={{ resize: 'none' }}
			className="input"
			type="text"
			name="notes"
			value={props.notes}
			onChange={props.notesChange}
		/>
		<input className="input" type="submit" />
	</form>
</div>; */
}
