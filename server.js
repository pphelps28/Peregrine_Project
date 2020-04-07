const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
require('mongoose-type-email')

app.use(express.static(path.join(__dirname, '/client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/schema_practice', {
    useUnifiedTopology: true, useNewUrlParser: true
})
mongoose.set('useFindAndModify', false)

// ---------- BIRD SCHEMATA ---------- // 

const birdSchema = new mongoose.Schema({
    bird: String,
    monitor_name: String,
    email: mongoose.SchemaTypes.Email,
    location: { type: String, required: true },
    date_visited: { type: String, require: true },
    season: { type: String, require: true },
    mileage: String,
    travel_time: String,
    start_time: String,
    end_time: String,
    total_time: String,
    temperature: String,
    precipitation: String,
    cloud_coverage: String,
    wind_speed: String,
    summary: String,
    eyrie_location: String,
    number_young: String,
    young_age: String,
    observations: String,
    remarks: String,
    researcher_comments_1: String,
    researcher_comments_2: String
})

// PEREGRINE Schema

const PeregrineSchema = mongoose.model('PeregrineSchema', birdSchema)

// EAGLE Schema

const EagleSchema = mongoose.model('EagleSchema', birdSchema)

// ---------- FUNCTIONS ---------- //

// writes new bird data to database

const handleBirdPosts = async (req, res) => {
    console.log("received request")

    // data inputted by monitor

    let name = req.body.name
    let location = req.body.site
    let email = req.body.email
    let bird = req.body.bird
    let date_visited = req.body.date_observed // might want to have this as 'visited' since that is how it is on the form 
    let season = date_visited.slice(0, 4) // this is not inputted by user
    let mileage = req.body.mileage
    let travel_time = req.body.travel
    let start_time = req.body.timeStart
    let end_time = req.body.timeEnd
    let total_time = req.body.totalTime
    let temperature = req.body.temperature
    let precipitation = req.body.precipitation
    let cloud_coverage = req.body.cloudCover
    let wind_speed = req.body.windSpeed
    let summary = req.body.ObservationSummary
    let eyrie_location = req.body.incubation
    let number_young = req.body.young
    let young_age = req.body.youngAge
    let observations = req.body.observation
    let remarks = req.body.comments

    console.log(date_visited)
    console.log(location)
    if (bird === 'Bald Eagle') {

        // new EAGLE data object created from monitor data

        let post = new EagleSchema({
            bird: bird,
            monitor_name: name,
            location: location,
            email: email,
            date_visited: date_visited,
            season: season,
            mileage: mileage,
            travel_time: travel_time,
            start_time: start_time,
            end_time: end_time,
            total_time: total_time,
            temperature: temperature,
            precipitation: precipitation,
            cloud_coverage: cloud_coverage,
            wind_speed: wind_speed,
            summary: summary,
            eyrie_location: eyrie_location,
            number_young: number_young,
            young_age: young_age,
            observations: observations,
            remarks: remarks,
        })

        // and written to database

        await post.save((err, doc) => {
            if (err) {
                return console.log(err)
            }
            console.log('Post Saved: ' + doc)
        })

    } else {

        // new PEREGRINE data object created from monitor data

        console.log('received peregrine data')

        let post = new PeregrineSchema({
            bird: bird,
            monitor_name: name,
            location: location,
            email: email,
            date_visited: date_visited,
            season: season,
            mileage: mileage,
            travel_time: travel_time,
            start_time: start_time,
            end_time: end_time,
            total_time: total_time,
            temperature: temperature,
            precipitation: precipitation,
            cloud_coverage: cloud_coverage,
            wind_speed: wind_speed,
            summary: summary,
            eyrie_location: eyrie_location,
            number_young: number_young,
            young_age: young_age,
            observations: observations,
            remarks: remarks,
        })

        // and written to database

        await post.save((err, doc) => {
            if (err) {
                return console.log(err)
            }
            console.log('Post Saved: ' + doc)
        })
    }
}

// searches BIRD database by inputted parameters and sends to frontend

const getBirdPosts = async (req, res) => {
    console.log('searching for data')

    // search parameters inputted by admin user

    let bird = req.body.bird
    let location = req.body.site
    let season = req.body.season

    if (location === '') {
        location = {$exists: true}
    }

    if (season === '') {
        season = {$exists: true}
    }

    // searches EAGLE database

    if (bird === "Bald Eagle") {
        console.log("got eagle data")
        let items = await EagleSchema.find({ "location": location, "season": season })

        // and returns documents

        res.send(items)
    }

    // searches PEREGRINE database

    else if (bird === 'Peregrine Falcon') {
        console.log('got peregrine data')
        let items = await PeregrineSchema.find({ "location": location, "season": season })

        // and returns documents

        res.send(items)
    }

    // sends back a reminder to choose one of the specified birds

    else {
        console.log('bad entry')
        let items = [{ season: 'Please choose either "Bald Eagle" or "Peregrine Falcon"' }]
        res.send(items)
    }
}

app.post('/post', handleBirdPosts)
app.post('/display', getBirdPosts)

app.listen(port, () => console.log(`listening on: ${port}`))
