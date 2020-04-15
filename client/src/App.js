import './App.css';
import "react-datepicker/dist/react-datepicker.css"
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar'
import InputForm from './components/InputForm.js'
import Display from './components/Display.js'
import firebase from 'firebase'
import FormData from 'form-data'
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
      image: null,
      observation: '',
      comments: '',
      nestingSite: '',
      sitesList: ['', 'Please select a species first'],
      stopLoop: false,
      inputVisible: true,
      displayContent: [],
      observationReport: {},
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
    console.log('changed species')
    this.setState({
      bird: event.target.value,
      stopLoop: true
    })
  }

  nestingSiteChange = (event) => {
    this.setState({ nestingSite: event.target.value })
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
  temperatureChange = (event) => {
    this.setState({ temperature: event.target.value })
  }

  totalTimeCalculator = (start, end) => {
    start = this.state.timeStart.split(":");
    end = this.state.timeEnd.split(":");
    console.log('start', start)
    console.log('end', end)

    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    console.log('hours', hours)

    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    console.log('minutes', minutes)


    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
      hours = hours + 24;
    this.setState({
      totalTime: Number((hours <= 9 ? "0" : "") + hours) + ":" + Number((minutes <= 9 ? "0" : "") + minutes)

    })
    console.log(this.state.totalTime)
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
  //
  imageSubmit = () => {
    if (this.state.image) {
      const fd = new FormData()
      fd.append('img', this.state.image, this.state.image.name)
      fetch((`/upload/${this.state.doc_id}`), {
        method: "POST",
        'Content-Type': 'multipart/form-data',
        body: fd
      }).then(res => {
      }).catch(err => {
        console.log('error:')
        console.log(err.message)
      })
    }
  }

  // ---------- gets current list of nesting sites to display in drop-down menus ---------- //

  componentDidUpdate = () => {
    if (this.state.stopLoop === true) {
      console.log('inside the if statement')
      this.getCurrentSites()
      this.setState({
        stopLoop: false,
        sitesList: ['', 'Please select a species first']
      })
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
  // ---------------- database queries ---------------- //

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
        site: '',
        season: '',
      })
    }

    // window.location.reload()
    // this.clearButtons()
  }

  // // ---------------- stores single observation report in state and launches observation report page ---------- //


  // displayFullReport = (event) => {
  //   event.preventDefault()
  //   console.log('preparing report')
  //   this.setState({
  //     observationReport: JSON.parse(event.target.value),
  //     redirect: '/report_modal'
  //   })
  // }

  // ---------------- adds new nesting sites to lists EAGLE or PEREGRINE sites ---------------- //

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
      console.log(jsonObj.sites)
      this.setState({
        sitesList: jsonObj.sites
      })
    })
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
    }).then(res => {
      if (res.status !== 200) {
        console.log('error')
      } else {
        return res.json()
      }
    }).then(jsonObj => {
      this.setState({
        doc_id: jsonObj
      })
      console.log(jsonObj)
    }).then(() => {
      this.imageSubmit()
    }).then(() => {
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
    })

    //window.location.reload()

    console.log(submission)
    console.log('preparing report')

  }
  clearButtons = () => {

    document.getElementById('formHorizontalRadios1').checked = false
    document.getElementById('formHorizontalRadios2').checked = false

  }

  render() {
    let { name, email, bird, prevBird, site, date_observed, season, mileage, travel, timeStart, timeEnd, totalTime, temperature, precipitation, cloudCover, windSpeed, young, youngAge, incubation, observation, comments, relationshipStatus, youngStatus, disturbance, displayContent, redirect, sitesList, weatherObservation } = this.state
    let { imageSubmit, imageChange, formChange, nameChange, emailChange, birdChange, siteChange, dateChange, seasonChange, mileageChange, travelChange, timeStartChange, timeEndChange, totalTimeChange, temperatureChange, precipitationChange, cloudCoverChange, windSpeedChange, observationChange, youngChange, youngAgeChange, incubationChange, commentsChange, handleSubmit, toggleInput, relationshipStatusChange, youngStatusChange, disturbanceChange, searchDataBase, nestingSiteChange, addNestingSite } = this

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
                handleSubmit={handleSubmit} imageChange={imageChange} imageSubmit={imageSubmit}
                name={name} email={email} bird={bird} site={site}
                date_observed={date_observed} mileage={mileage} travel={travel} timeStart={timeStart} timeEnd={timeEnd} totalTime={totalTime} temperature={temperature} precipitation={precipitation}
                cloudCover={cloudCover} windSpeed={windSpeed} weatherObservation={weatherObservation} relationshipStatus={relationshipStatus} youngStatus={youngStatus} disturbance={disturbance} young={young} youngAge={youngAge}
                incubation={incubation} observation={observation} comments={comments} sitesList={sitesList}
                // passes all methods
                formChange={formChange} nameChange={nameChange} emailChange={emailChange} birdChange={birdChange} siteChange={siteChange} dateChange={dateChange} mileageChange={mileageChange} travelChange={travelChange}
                timeStartChange={timeStartChange} timeEndChange={timeEndChange} totalTimeChange={totalTimeChange} temperatureChange={temperatureChange} precipitationChange={precipitationChange}
                cloudCoverChange={cloudCoverChange} windSpeedChange={windSpeedChange} observationChange={observationChange} relationshipStatusChange={relationshipStatusChange} youngStatusChange={youngStatusChange} disturbanceChange={disturbanceChange}
                youngChange={youngChange} youngAgeChange={youngAgeChange} incubationChange={incubationChange} commentsChange={commentsChange} handleSubmit={handleSubmit} totalTimeCalculator={this.totalTimeCalculator}
              />
            </Route>

            <>
              <Route path='/display'>
                <Display loggedIn={this.state.loggedIn} bird={bird} prevBird={prevBird} site={site} season={season} redirect={redirect} formChange={formChange} seasonChange={seasonChange} birdChange={birdChange} siteChange={siteChange} searchDataBase={searchDataBase} displayContent={displayContent} sitesList={sitesList} nestingSiteChange={nestingSiteChange} addNestingSite={addNestingSite} />
              </Route>
              <Route path='/report_modal/:bird/:_id'
                component={(props) =>
                  <ReportModal {...props} />}>
              </Route>
            </>

          </div>
        </Router>
      </div >

    )
  }
}



export default App
