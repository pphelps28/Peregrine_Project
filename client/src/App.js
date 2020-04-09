import './App.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar'
import InputForm from './components/InputForm.js'
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
      bird: 'Peregrine Falcon',
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
      researcherComments: '',
      nestingSite: '',
      sitesList: ['', 'Please select a species first'],
      inputVisible: true,
      displayContent: [],
      observationReport: '',
      reportVisible: true,
      redirect: null
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
  dateChange = (date) => {
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
  researcherCommentsChange = (event) => {
    this.setState({ researcherComments: event.target.value })
  }
  nestingSiteChange = (event) => {
    this.setState({ nestingSite: event.target.value })
  }

componentDidUpdate() {
  this.getCurrentSites()
}

  // -------------------------------Submits all values------------------------- //

  handleSubmit = (event) => {
    event.preventDefault()
    let submission = {
      name: this.state.name,
      email: this.state.email,
      bird: this.state.bird,
      site: this.state.site,
      date_observed: this.state.date_observed,
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

  //--------switches between observation and view reports pages and back from observation report page ----------//

  toggleInput = () => {
    if (this.state.redirect === '/report_modal') {
      this.setState({
        redirect: null
      })
    }

    this.state.inputVisible ? this.setState({ inputVisible: false }) : this.setState({ inputVisible: true })
  }

  // ---------- database queries ---------- //

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

  // ---------------- stores single observation report in state and launches observation report page ---------- //

  displayFullReport = (event) => {
    event.preventDefault()
    console.log('preparing report')
    this.setState({
      observationReport: JSON.parse(event.target.value),
      redirect: '/report_modal'
    })
  }

  // ---------------- updates researcher comments in single reports ---------- //

  addComments = (event) => {
    console.log('sending comments')

    let query = {
      bird: this.state.observationReport.bird,
      id: this.state.observationReport._id,
      comments: this.state.researcherComments
    }

    console.log(this.state.researcherComments)

    fetch(('/update'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(res => {
      console.log('getting back document')
      return res.json()
    }).then(jsonObj => {
      this.setState({
        observationReport: jsonObj,
        researcherComments: ''
      })
    })
  }

  // ---------------- sends request to add sites to either Peregrine or Eagle site dbs ---------- //

  addNestingSite = (event) => {
    console.log(`adding ${this.state.nestingSite} to sites`)

    let query = {
      bird: this.state.bird,
      nestingSite: this.state.nestingSite
    }

    fetch(('/addSite'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
  }

  // ---------------- fetches array of current species site lists ---------- //

  getCurrentSites = () => {
    
    let bird = this.state.bird      
    let post = { bird: bird }
    
      fetch(('/getSites'), {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }).then(res => {
        console.log('getting sites')
        return res.json()
      }).then(jsonObj => {
        console.log(jsonObj)
        this.setState({ 
          sitesList: jsonObj.sites })
      })
    }
  


  render() {

    let { name, email, bird, prevBird, site, date_observed, season, mileage, travel, timeStart, timeEnd, totalTime, temperature, precipitation, cloudCover, windSpeed, observationSummary, young, youngAge, incubation, observation, comments, relationshipStatus, youngStatus, disturbance, researcherComments, nestingSite, sitesList, displayContent, reportVisible, observationReport, redirect } = this.state
    let { nameChange, emailChange, birdChange, siteChange, dateChange, seasonChange, mileageChange, travelChange, timeStartChange, timeEndChange, totalTimeChange, temperatureChange, precipitationChange, cloudCoverChange, windSpeedChange, observationChange, observationSummaryChange, youngChange, youngAgeChange, incubationChange, commentsChange, nestingSiteChange, handleSubmit, toggleInput, relationshipStatusChange, youngStatusChange, disturbanceChange, consoleCheck, searchDataBase, displayFullReport, addComments, researcherCommentsChange, addNestingSite } = this


    return (
      <div>
        <Router>
          <NavBar toggleInput={toggleInput} />

          <div id="wrapper">
            {/* //passes variables if the button is true */}
            <Route path='/' exact>
              <InputForm handleSubmit={handleSubmit}
                name={name} email={email} bird={bird} site={site}

                date_observed={date_observed} mileage={mileage} travel={travel} timeStart={timeStart} timeEnd={timeEnd} totalTime={totalTime} temperature={temperature} precipitation={precipitation}
                cloudCover={cloudCover} windSpeed={windSpeed} relationshipStatus={relationshipStatus} youngStatus={youngStatus} disturbance={disturbance} young={young} youngAge={youngAge}
                incubation={incubation} observation={observation} comments={comments} sitesList={sitesList} 
                // passes all methods
                nameChange={nameChange} emailChange={emailChange} birdChange={birdChange} siteChange={siteChange} dateChange={dateChange} mileageChange={mileageChange} travelChange={travelChange}
                timeStartChange={timeStartChange} timeEndChange={timeEndChange} totalTimeChange={totalTimeChange} temperatureChange={temperatureChange} precipitationChange={precipitationChange}
                cloudCoverChange={cloudCoverChange} windSpeedChange={windSpeedChange} observationChange={observationChange} relationshipStatusChange={relationshipStatusChange} youngStatusChange={youngStatusChange} disturbanceChange={disturbanceChange}

                youngChange={youngChange} youngAgeChange={youngAgeChange} incubationChange={incubationChange} commentsChange={commentsChange} handleSubmit={handleSubmit}
              />
            </Route>
            <Route path='/display'>
              <Display bird={bird} prevBird={prevBird} site={site} season={season} nestingSite={nestingSite} sitesList={sitesList}redirect={redirect} seasonChange={seasonChange} birdChange={birdChange} siteChange={siteChange} nestingSiteChange={nestingSiteChange} searchDataBase={searchDataBase} displayContent={displayContent} displayFullReport={displayFullReport} addNestingSite={addNestingSite} />

            </Route>
            <Route path='/report_modal' render={(props) =>
              <ReportModal {...props} displayContent={displayContent} reportVisible={reportVisible} observationReport={observationReport} addComments={addComments} researcherComments={researcherComments} researcherCommentsChange={researcherCommentsChange} />} >
            </Route>
          </div>
        </Router>
      </div >

    )
  }
}

export default App
