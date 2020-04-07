import './App.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component } from 'react'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from './components/InputForm.js'
import { sub } from 'date-fns';
import Display from './components/Display.js'
import LoginModal from './components/LoginModal.js'
import ModalLogIn from './components/ModalLogIn'
import ReportModal from './components/ReportModal'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      bird: '',
      prevBird: '',
      site: '',
      date_observed: new Date(),
      season: '',
      mileage: '',
      travel: '',
      timeStart: '',
      timeEnd: '',
      totalTime: '',
      temperature: '',
      precipitation: '',
      cloudCover: '',
      windSpeed: '',
      relationshipStatus: '',
      youngStatus: '',
      disturbance: '',
      incubation: '',
      young: '',
      youngAge: '',
      observation: '',
      comments: '',
      inputVisible: true,
      displayContent: [],
      observationReport: '',
      reportVisible: false
    }
  }

  // ----------------------- apply changes to state ------------------------
  nameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  emailChange = (event) => {
    this.setState({ email: event.target.value })
  }
  siteChange = (event) => {

    this.setState({ site: event.target.value })
  }
  birdChange = (event) => {

    this.setState({
      prevBird: this.state.bird,
      bird: event.target.value
    })

  }
  dateChange = date => {
    this.setState({ date_observed: date })
  }
  seasonChange = (event) => {
    console.log("hi!")
    this.setState({ season: event.target.value })
  }
  mileageChange = (event) => {
    this.setState({ mileage: event.target.value })
  }
  travelChange = (event) => {
    this.setState({ travel: event.target.value })
  }
  timeStartChange = timeStart => {
    this.setState({ timeStart: timeStart })
  }
  timeEndChange = (timeEnd) => {
    this.setState({ timeEnd: timeEnd })
  }
  totalTimeChange = (event) => {
    this.setState({ totalTime: event.target.value })
  }
  temperatureChange = (event) => {
    this.setState({ temperature: event.target.value })
  }

  precipitationChange = (event) => {
    this.setState({ precipitation: event.target.value })

  }
  cloudCoverChange = (event) => {
    this.setState({ cloudCover: event.target.value })
  }
  windSpeedChange = (event) => {
    this.setState({ windSpeed: event.target.value })
    console.log(this.state.windSpeed)
  }
  relationshipStatusChange = (event) => {
    this.setState({ relationshipStatus: event.target.value })
  }
  youngStatusChange = (event) => {
    this.setState({ youngStatus: event.target.value })
  }
  disturbanceChange = (event) => {
    this.setState({ disturbance: event.target.value })
  }

  youngChange = (event) => {
    this.setState({ young: event.target.value })
  }
  incubationChange = (event) => {
    this.setState({ incubation: event.target.value })
  }
  youngAgeChange = (event) => {
    this.setState({ youngAge: event.target.value })
  }
  observationChange = (event) => {
    this.setState({ observation: event.target.value })
  }
  commentsChange = (event) => {
    this.setState({ comments: event.target.value })
  }
  displayFullReport = (event) => {
    event.preventDefault()
    console.log('preparing report')
    
    this.setState({
      observationReport: JSON.parse(event.target.value)
    })

    this.state.reportVisible ? this.setState({ reportVisible: false }) : this.setState({ reportVisible: true })
  }

  // ---------------------------a button for development to allow a check of the submission without submit ---------
  consoleCheck = (event) => {
    event.preventDefault()
    let submission = {
      name: this.state.name,
      email: this.state.email,
      bird: this.state.bird,
      site: this.state.site,
      date_observed: new Date(),
      mileage: this.state.mileage,
      travel: this.state.travel,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
      totalTime: this.state.totalTime,
      temperature: this.state.temperature,
      precipitation: this.state.precipitation,
      cloudCover: this.state.cloudCover,
      windSpeed: this.state.windSpeed,
      relationshipStatus: this.state.relationshipStatus,
      youngStatus: this.state.youngStatus,
      disturbance: this.state.disturbance,
      incubation: this.state.incubation,
      young: this.state.young,
      youngAge: this.state.youngAge,
      observation: this.state.observation,
      comments: this.state.comments,
    }
    console.log(submission)
  }
  // -------------------------------Submits all values-------------------------
  handleSubmit = (event) => {
    event.preventDefault()
    let submission = {
      name: this.state.name,
      email: this.state.email,
      bird: this.state.bird,
      site: this.state.site,
      date_observed: new Date(),
      mileage: this.state.mileage,
      travel: this.state.travel,
      timeStart: this.state.timeStart,
      timeEnd: this.state.timeEnd,
      totalTime: this.state.totalTime,
      temperature: this.state.temperature,
      precipitation: this.state.precipitation,
      cloudCover: this.state.cloudCover,
      windSpeed: this.state.windSpeed,
      relationshipStatus: this.state.relationshipStatus,
      youngStatus: this.state.youngStatus,
      disturbance: this.state.disturbance,
      incubation: this.state.incubation,
      young: this.state.young,
      youngAge: this.state.youngAge,
      observation: this.state.observation,
      comments: this.state.comments,
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
      email: '',
      bird: '',
      site: '',
      date_observed: new Date(),
      mileage: '',
      travel: '',
      timeStart: '',
      timeEnd: '',
      totalTime: '',
      temperature: '',
      precipitation: '',
      cloudCover: '',
      windSpeed: '',
      relationshipStatus: '',
      youngStatus: '',
      disturbance: '',
      incubation: '',
      young: '',
      youngAge: '',
      observation: '',
      comments: '',
    })
    console.log(submission)
  }

  //--------switches from input form to display all inputs ----------//
  toggleInput = () => {
    // if (this.state.inputVisible) {
    //   fetch('/display').then(res => {
    //     return res.json()
    //   }).then(jsonObj => {
    //     console.log(jsonObj)
    //     this.setState({ displayContent: jsonObj })
    //   })
    // }

    this.state.inputVisible ? this.setState({ inputVisible: false }) : this.setState({ inputVisible: true })
  }

  // ---------- searches database using bird / season / site paramaters and returns observations ---------- //

  searchDataBase = (event) => {
    event.preventDefault()
    console.log('getting data')

    let query = { // this query is coming from the three search input fields

      bird: this.state.bird,
      site: this.state.site,
      season: this.state.season
    }

    if (query.bird === '') {
      alert('Please choose either Bald Eagle or Peregrine Falcon.')
    } else {
      fetch(('/display'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      }).then(res => {

        return res.json()
      }).then(jsonObj => {
        this.setState({ displayContent: jsonObj })
      })

      this.setState({
        // bird: '',
        site: '',
        season: '',
      })
    }
  }

  render() {


    let { name, email, bird, prevBird, site, date_observed, season, mileage, travel, timeStart, timeEnd, totalTime, temperature, precipitation, cloudCover, windSpeed, observationSummary, young, youngAge, incubation, observation, comments, relationshipStatus, youngStatus, disturbance, displayContent, reportVisible, observationReport } = this.state
    let { nameChange, emailChange, birdChange, siteChange, dateChange, seasonChange, mileageChange, travelChange, timeStartChange, timeEndChange, totalTimeChange, temperatureChange, precipitationChange, cloudCoverChange, windSpeedChange, observationChange, observationSummaryChange, youngChange, youngAgeChange, incubationChange, commentsChange, handleSubmit, toggleInput, relationshipStatusChange, youngStatusChange, disturbanceChange, consoleCheck, searchDataBase, displayFullReport } = this


    return (
      <div>
        {/* To remove modal, set Z-index to negative (needs styling and display trigger) */}
        <ModalLogIn />
        <div id="wrapper">
          <button onClick={toggleInput}>See the Observations</button>
          {/* //passes variables if the button is true */}
          {this.state.inputVisible ? <InputForm handleSubmit={handleSubmit}
            name={name} email={email} bird={bird} site={site}

            date_observed={date_observed} mileage={mileage} travel={travel} timeStart={timeStart} timeEnd={timeEnd} totalTime={totalTime} temperature={temperature} precipitation={precipitation}
            cloudCover={cloudCover} windSpeed={windSpeed} relationshipStatus={relationshipStatus} youngStatus={youngStatus} disturbance={disturbance} young={young} youngAge={youngAge}
            incubation={incubation} observation={observation} comments={comments}
            // passes all methods
            nameChange={nameChange} emailChange={emailChange} birdChange={birdChange} siteChange={siteChange} dateChange={dateChange} mileageChange={mileageChange} travelChange={travelChange}
            timeStartChange={timeStartChange} timeEndChange={timeEndChange} totalTimeChange={totalTimeChange} temperatureChange={temperatureChange} precipitationChange={precipitationChange}
            cloudCoverChange={cloudCoverChange} windSpeedChange={windSpeedChange} observationChange={observationChange} relationshipStatusChange={relationshipStatusChange} youngStatusChange={youngStatusChange} disturbanceChange={disturbanceChange}

            youngChange={youngChange} youngAgeChange={youngAgeChange} incubationChange={incubationChange} commentsChange={commentsChange} handleSubmit={handleSubmit} consoleCheck={consoleCheck}
          /> :
            <Display bird={bird} prevBird={prevBird} site={site} season={season} reportVisible={reportVisible} seasonChange={seasonChange} birdChange={birdChange} siteChange={siteChange} searchDataBase={searchDataBase} displayContent={displayContent} displayFullReport={displayFullReport} />}




        </div>
        <ReportModal displayContent={displayContent} reportVisible={reportVisible} observationReport={observationReport} />
      </div>

    )
  }
}

export default App
