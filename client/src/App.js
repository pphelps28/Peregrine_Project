import './App.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar'
import InputForm from './components/InputForm.js'
import Display from './components/Display.js'
import firebase from 'firebase'
import ReportModal from './components/ReportModal'
//firebase => .env
const firebaseConfig = {
  apiKey: "AIzaSyAio6vwdZAJ1GlzX7C0Mg8bR6gLt1EpVBQ",
  authDomain: "fir-practice-87288.firebaseapp.com",
  databaseURL: "https://fir-practice-87288.firebaseio.com",
  projectId: "fir-practice-87288",
  storageBucket: "fir-practice-87288.appspot.com",
  messagingSenderId: "270975170469",
  appId: "1:270975170469:web:cef00b31317d4d81b61a4c",
  measurementId: "G-R28BVC59V8"
};
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
//
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
      image: '',
      observation: '',
      comments: '',
      researcherComments: '',
      nestingSite: '',
      sitesList: ['', 'Please select a species first'],
      inputVisible: true,
      displayContent: [],
      observationReport: '',
      loggedIn: false,
      email: '',
      password: '',
      display: '',
      displayColor: '',
      logoutDisabled: true,
      modalShow: false,
      userModalShow: false
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


  // ----------------------- apply changes to state ------------------------
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log()
  }
  nameChange = (event) => {
    this.setState({ name: event.target.value })
  }
  emailChange = (event) => {
    this.setState({ email: event.target.value })
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
    })
  }

  // -------------------------------Submits all values------------------------- //


  // ---------------- stores single observation report in state and launches observation report page ---------- //

  displayFullReport = (event) => {
    event.preventDefault()
    console.log('preparing report')
    this.setState({
      observationReport: JSON.parse(event.target.value),
      redirect: '/report_modal'
    })
  }

  componentDidUpdate = () => {
    this.getCurrentSites()
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.setState({
          display: `logged in as ${user.email}`,
          displayColor: 'green',
          logoutDisabled: false,
          loggedIn: true
        })
      } else {
        this.setState({
          logoutDisabled: true,
          loggedIn: false
        })
      }
    })
  }
  emailChange = (event) => {
    console.log(event.target.value)
    this.setState({ email: event.target.value })
  }
  passwordChange = (event) => {
    console.log(event.target.value)
    this.setState({ password: event.target.value })
  }
  ////////////////LOG IN MODAL//////////////

  setModalShow = () => {
    this.state.modalShow ?
      this.setState({
        modalShow: false
      }) : this.setState({
        modalShow: true
      })
  }
  logIn = (event) => {
    event.preventDefault()
    const email = this.state.email;
    const password = this.state.password
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.message)
      if (!auth.currentUser) {
        this.setState({
          display: 'Invalid username or password',
          displayColor: 'red'
        })
      }
    })
    this.setState({
      email: '',
      password: '',
      userModalShow: false
    })
  }
  forgotPasswordAtLogIn = (event) => {
    if (this.state.email === '') {
      this.setState({
        display: 'Please fill out email field, then select "Forgot Password"',
        displayColor: 'orange'
      })
    } else {
      auth.sendPasswordResetEmail(this.state.email).then(() => {
        this.setState({
          display: 'Check email to reset password',
          displayColor: 'green'
        })
      }).catch((error) => {
        console.log(error.message)
      })
    }
  }

  //USER SETTINGS MODAL/////////////////////////////////////////

  setUserModalShow = () => {
    this.state.userModalShow ?
      this.setState({
        userModalShow: false
      }) : this.setState({
        userModalShow: true
      })
  }
  logOut = (event) => {
    event.preventDefault()
    if (auth.currentUser) {
      auth.signOut()
    }
    this.setState({
      loggedIn: false,
      modalShow: false,
      display: ''
    })
  }
  resetPassword = (event) => {
    let email = (auth.currentUser.email)
    auth.sendPasswordResetEmail(email).then(() => {
      this.setState({
        display: 'Check email to reset password',
        displayColor: 'green'
      })
    }).catch((error) => {
      console.log(error.message)
    })
  }
  changeEmail = () => {
    if (!auth.currentUser) {
      this.setState({
        display: 'To change email, please sign in first.',
        displayColor: 'orange'
      })
    } else {
      let oldEmail = auth.currentUser.email
      let newEmail = prompt('Please enter new email.')
      auth.currentUser.updateEmail(newEmail).catch(error => {
        if (error) {
          this.setState({
            display: error.message,
            displayColor: 'red'
          })
        }
      })
      this.setState({
        display: `Email updated!  To undo changes, follow the link sent to ${oldEmail}`,
        displayColor: 'green'
      })
    }
  }
  // -------------------------------Submits all values-------------------------
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
      image: '',
      observation: '',
      comments: '',
      image: ''
    })
    console.log(submission)
    console.log('preparing report')

  }

  //--------switches between observation and view reports pages and back from observation report page ----------//

  toggleInput = () => {
    if (this.state.redirect === '/report_modal') {
      this.setState({
        redirect: null
      })
    }

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
    let { name, email, bird, prevBird, site, date_observed, season, mileage, travel, timeStart, timeEnd, totalTime, temperature, precipitation, cloudCover, windSpeed, observationSummary, young, youngAge, incubation, observation, comments, relationshipStatus, youngStatus, disturbance, displayContent, observationReport, redirect } = this.state
    let { nameChange, emailChange, birdChange, siteChange, dateChange, seasonChange, mileageChange, travelChange, timeStartChange, timeEndChange, totalTimeChange, temperatureChange, precipitationChange, cloudCoverChange, windSpeedChange, observationChange, observationSummaryChange, youngChange, youngAgeChange, incubationChange, commentsChange, handleSubmit, toggleInput, relationshipStatusChange, youngStatusChange, disturbanceChange, consoleCheck, searchDataBase, displayFullReport } = this

    return (
      <div>
        <Router>
          <NavBar
            email={this.state.email}
            password={this.state.password}
            display={this.state.display}
            displayColor={this.state.displayColor}
            logoutDisabled={this.state.logoutDisabled}
            loggedIn={this.state.loggedIn}
            modalShow={this.state.modalShow}
            userModalShow={this.state.userModalShow}
            // methods
            toggleInput={toggleInput}
            setUserModalShow={this.setUserModalShow}
            setModalShow={this.setModalShow}
            emailChange={this.emailChange}
            passwordChange={this.passwordChange}
            logIn={this.logIn}
            logOut={this.logOut}
            forgotPasswordAtLogIn={this.forgotPasswordAtLogIn}
            resetPassword={this.resetPassword}
            changeEmail={this.changeEmail}
          />

          <div id="wrapper">
            {/* //passes variables if the button is true */}
            <Route path='/' exact>
              <InputForm
                handleSubmit={handleSubmit}
                name={name} email={email} bird={bird} site={site}
                date_observed={date_observed} mileage={mileage} travel={travel} timeStart={timeStart} timeEnd={timeEnd} totalTime={totalTime} temperature={temperature} precipitation={precipitation}
                cloudCover={cloudCover} windSpeed={windSpeed} relationshipStatus={relationshipStatus} youngStatus={youngStatus} disturbance={disturbance} young={young} youngAge={youngAge}
                incubation={incubation} observation={observation} comments={comments}
                // passes all methods
                nameChange={nameChange} emailChange={emailChange} birdChange={birdChange} siteChange={siteChange} dateChange={dateChange} mileageChange={mileageChange} travelChange={travelChange}
                timeStartChange={timeStartChange} timeEndChange={timeEndChange} totalTimeChange={totalTimeChange} temperatureChange={temperatureChange} precipitationChange={precipitationChange}
                cloudCoverChange={cloudCoverChange} windSpeedChange={windSpeedChange} observationChange={observationChange} relationshipStatusChange={relationshipStatusChange} youngStatusChange={youngStatusChange} disturbanceChange={disturbanceChange}
                youngChange={youngChange} youngAgeChange={youngAgeChange} incubationChange={incubationChange} commentsChange={commentsChange} handleSubmit={handleSubmit}
              />
            </Route>


            {this.state.loggedIn ?
              <>
                <Route path='/display'>
                  <Display bird={bird} prevBird={prevBird} site={site} season={season} redirect={redirect} seasonChange={seasonChange} birdChange={birdChange} siteChange={siteChange} searchDataBase={searchDataBase} displayContent={displayContent} displayFullReport={displayFullReport} />
                </Route>
                <Route path='/report_modal/:_id'
                  component={(props) =>
                    <ReportModal {...props} displayContent={this.state.displayContent} observationReport={this.state.observationReport} />} >
                </Route>
              </>

              : "Please log in to see this page"}
          </div>
        </Router>
      </div >

    )
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
        sitesList: jsonObj.sites
      })
    })
  }
}
export default App
