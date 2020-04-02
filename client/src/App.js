import './App.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component } from 'react'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from './components/InputForm'
import Display from './components/Display'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      date_observed: new Date(),
      notes: '',
      inputVisible: true,
      displayContent: []
    }
  }
  nameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  locationChange = (event) => {

    this.setState({ location: event.target.value })
  }
  dateChange = date => {

    this.setState({ date_observed: date })
  }
  notesChange = (event) => {
    this.setState({ notes: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let submission = {
      name: this.state.name,
      location: this.state.location,
      date_observed: this.state.date_observed,
      date_submitted: new Date(),
      notes: this.state.notes
    }
    fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    })
    this.setState({
      name: '',
      location: '',
      date_observed: '',
      notes: ''
    })
  }

  toggleInput = () => {
    if (this.state.inputVisible) {
      fetch('/display').then(res => {
        return res.json()
      }).then(jsonObj => {
        this.setState({ displayContent: jsonObj })
      })
    }
    this.state.inputVisible ? this.setState({ inputVisible: false }) : this.setState({ inputVisible: true })
  }

  render() {
    let { name, location, date_observed, notes, displayContent } = this.state
    let { nameChange, locationChange, dateChange, notesChange, handleSubmit, toggleInput } = this
    return (
      <>
        <button id="toggle-button" onClick={toggleInput}>Toggle</button>
        <div id="wrapper">
          {this.state.inputVisible ?
            <InputForm handleSubmit={handleSubmit}
              name={name} location={location}
              date_observed={date_observed} notes={notes}
              nameChange={nameChange} locationChange={locationChange}
              dateChange={dateChange} notesChange={notesChange} />
            : <Display displayContent={displayContent} />}
        </div>
      </>
    )
  }
}

export default App