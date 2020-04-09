import './App.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar'
import InputForm from './components/InputForm.js'
import Display from './components/Display.js'
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
      weatherObservation: '',
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
      image : '',
      observation: '',
      comments: '',
      inputVisible: true,
      displayContent: [],
      observationReport: '',
      redirect: null
    }
  }
 
  //------------Input Form general handler -------------------------------------------//
  
  formChange = (event) => {
    let input = event.target.value
    this.setState({
      [event.target.name]: input
    })
    console.log(input)
  }
  
  // ----------------Input Form & Display form handlers  ------------------------

  siteChange = (event) => {
    this.setState({ site: event.target.value })
  }
  birdChange = (event) => {
    this.setState({
      prevBird: this.state.bird,
      bird: event.target.value
    })
  }

  //-------------------Date & Time change handlers -----------------------//
  dateChange = date => {
    this.setState({ date_observed: date })
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
  weatherObservationChange = (event) => {
    this.setState({ weatherObservation: event.target.value })
  }
  temperatureChange = (event) => {
    this.setState({ temperature: event.target.value })
  }

  //--------------------Display form handler --------------//
  seasonChange = (event) => {
    console.log("hi!")
    this.setState({ season: event.target.value })
  }
  imageChange = (event) => {
    this.setState({
      image: event.target.files[0]
    })}

  // ---------------- stores single observation report in state and launches observation report page ---------- //

  displayFullReport = (event) => {
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
      weatherObservation: this.state.weatherObservation,
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
      image: this.state.image,
      observation: this.state.observation,
      comments: this.state.comments,
      image: this.state.image
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
      weatherObservation: '',
      precipitation: '',
      cloudCover: '',
      windSpeed: '',
      relationshipStatus: '',
      youngStatus: '',
      disturbance: '',
      incubation: '',
      young: '',
      youngAge: '',
      image:  '',
      observation: '',
      comments: '',
      image: ''
    })
    console.log(submission)
    console.log('preparing report')
    this.setState({
      observationReport: JSON.parse(event.target.value),
      redirect: '/report_modal'
    })    
  }
  
// -------------------------------Submits all values------------------------- //

handleSubmit = (event) => {
  event.preventDefault()
  const fd = new FormData()
    fd.append('image', this.state.image)
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
    weatherObservation: this.state.weatherObservation,
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
    image: this.state.image
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
    weatherObservation: '',
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
    image: ''
  })
  console.log(submission)
}

//--------switches between observation and view reports pages and back from observation report page ----------//

toggleInput = () => {
  if (this.state.redirect === '/report_modal') {
      this.setState({
        redirect: null
      })
    }  
  this.state.inputVisible ? this.setState({ inputVisible: false }) : this.setState({ inputVisible: true })
}

// ---------- searches database using bird / season / site paramaters and returns observation sketches ---------- //

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


  let { name, email, bird, prevBird, site, date_observed, season, mileage, travel, timeStart, timeEnd, totalTime, weatherObservation, temperature, precipitation, cloudCover, windSpeed, observationSummary, young, youngAge, incubation, observation, comments, relationshipStatus, youngStatus, disturbance, displayContent, reportVisible, observationReport, redirect, image } = this.state
  let { formChange, nameChange, emailChange, birdChange, siteChange, dateChange, seasonChange, mileageChange, travelChange, timeStartChange, timeEndChange, totalTimeChange, weatherObservationChange, temperatureChange, precipitationChange, cloudCoverChange, windSpeedChange, observationChange, youngChange, youngAgeChange, incubationChange, commentsChange, handleSubmit, toggleInput, relationshipStatusChange, youngStatusChange, disturbanceChange, consoleCheck, searchDataBase, displayFullReport, imageChange } = this


  return (
    <div>
      <Router>
        <NavBar toggleInput={toggleInput} />
        <div id="wrapper">
          {/* //passes variables if the button is true */}
          <Route path='/' exact>
            <InputForm handleSubmit={handleSubmit}
              name={name} email={email} bird={bird} site={site}

              date_observed={date_observed} mileage={mileage} travel={travel} timeStart={timeStart} timeEnd={timeEnd} totalTime={totalTime} weatherObservation={weatherObservation} temperature={temperature} precipitation={precipitation}
              cloudCover={cloudCover} windSpeed={windSpeed} relationshipStatus={relationshipStatus} youngStatus={youngStatus} disturbance={disturbance} young={young} youngAge={youngAge} image={image}
              incubation={incubation} observation={observation} comments={comments}
              // passes all methods
              nameChange={nameChange} emailChange={emailChange} birdChange={birdChange} siteChange={siteChange} dateChange={dateChange} mileageChange={mileageChange} travelChange={travelChange}
              timeStartChange={timeStartChange} timeEndChange={timeEndChange} totalTimeChange={totalTimeChange} weatherObservationChange={weatherObservationChange} temperatureChange={temperatureChange} precipitationChange={precipitationChange}
              cloudCoverChange={cloudCoverChange} windSpeedChange={windSpeedChange} observationChange={observationChange} relationshipStatusChange={relationshipStatusChange} youngStatusChange={youngStatusChange} disturbanceChange={disturbanceChange} imageChange={imageChange}

              youngChange={youngChange} youngAgeChange={youngAgeChange} incubationChange={incubationChange} commentsChange={commentsChange} handleSubmit={handleSubmit} formChange={formChange}
            />
          </Route>
          <Route path='/display'>
            <Display bird={bird} prevBird={prevBird} site={site} season={season} redirect={redirect} seasonChange={seasonChange} birdChange={birdChange} siteChange={siteChange} searchDataBase={searchDataBase} displayContent={displayContent} displayFullReport={displayFullReport} />

          </Route>
          <Route path='/report_modal' render={(props) =>
            <ReportModal {...props} displayContent={displayContent} observationReport={observationReport} />} >
          </Route>
        </div>
      </Router>
    </div >
  )}
}

export default App
