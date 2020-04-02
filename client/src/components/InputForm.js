import React from 'react'
import DatePicker from 'react-datepicker'

export default function InputForm(props) {
    return (<>
    {/* Insert name */}
       <Form>
  <Form.Row>
    <Col>
      <Form.Control placeholder="First name" />
    </Col>
    <Col>
      <Form.Control placeholder="Last name" />
    </Col>
  </Form.Row>
  {/* email  */}



</Form>
       </>
    )
}
<div id="container">
<form id="form-input" onSubmit={props.handleSubmit}>
    Name <input className="input" type="text" name="name" value={props.name} onChange={props.nameChange} />
Location <input className="input" type="text" name="location" value={props.location} onChange={props.locationChange} />
Date Observed <DatePicker maxDate={new Date()} className="input" title="Date Observed" selected={props.date_observed} onChange={props.dateChange} />
Notes <textarea style={{ resize: 'none' }} className="input" type="text" name="notes" value={props.notes} onChange={props.notesChange} />
    <input className="input" type="submit" />
</form>
</div>