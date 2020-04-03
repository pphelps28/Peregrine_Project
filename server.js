const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '/client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/schema_practice', {
    useUnifiedTopology: true, useNewUrlParser: true
})
mongoose.set('useFindAndModify', false)

//create schemas, 

// first Schema (PEREGRINE)

const peregrineSchema = new mongoose.Schema({
    location: { type: String, required: true },
    date_visited: { type: String, require: true },
    season: { type: Number, require: true },
    date_entered: Date,
    mileage: Number,
    travel_time: Number,
    start_time: Number,
    end_time: Number,
    total_time: Number,
    temperature: Number,
    precipitation: String,
    cloud_coverage: Number,
    wind_speed: Number,
    summary: String,
    eyrie_location: String,
    number_young: Number,
    observations: String,
    remarks: String,
    researcher_comments_1: String,
    researcher_comments_2: String
})

const PeregrineSchema = mongoose.model('PeregrineSchema', peregrineSchema)

// write new peregrine data to database

const handlePeregrinePost = async (req, res) => {

    // data inputted by monitor

    let location = req.body.location
    let date_visited = req.body.date_visited
    let season = req.body.date_visited.slice(0, 3)
    let date_entered = req.body.date_entered
    let mileage = req.body.mileage
    let travel_time = req.body.travel_time
    let start_time = req.body.start_time
    let end_time = req.body.end_time
    let total_time = req.body.total_time
    let temperature = req.body.temperature
    let precipitation = req.body.precipitation
    let cloud_coverage = req.body.cloud_coverage
    let wind_speed = req.body.wind_speed
    let summary = req.body.summary
    let eyrie_location = req.body.eyrie_location
    let number_young = req.body.number_young
    let observations = req.body.observations
    let remarks = req.body.remarks

    // new peregrine data object created with monitor data

    let post = new PeregrineSchema({
        location = location,
        date_visited = date_visited,
        season = season,
        date_entered: date_entered,
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
        observations: observations,
        remarks: remarks,
    })

    // new peregrine data object written to database

    await post.save((err, doc) => {
        if (err) {
            return console.log(err)
        }
        console.log('Post Saved: ' + doc)
    })
}

// search peregrine database by inputted parameters and send to frontend

const getPeregrinePost = async (req, res) => {

    // search parameters inputted by admin user

    let location = req.body.location
    let season = req.body.season

    let items = await PeregrineSchema.find({ "location": location, "season": season })

    res.send(items)
}

// app.post('/post', handlePeregrinePost)
//leave for front end dev
// app.get('/display', getPeregrinePost)





//second Schema: writes to different collection (EAGLE)



//additional query parameters, BY SEASON, OR BY SITE



///// FOR TESTING///////////////////


const birdySchema = new mongoose.Schema({
    name: String,
    location: String,
    date_observed: String,
    date_entered: String,
    notes: String
})
const BirdySchema = mongoose.model('BirdySchema', birdySchema)



const handlePost = async (req, res) => {
    let name = req.body.name
    let location = req.body.location
    let date_observed = req.body.date_observed
    let date_entered = req.body.date_entered
    let notes = req.body.notes
    let post = new BirdySchema({
        name: name,
        location: location,
        date_observed: date_observed,
        date_entered: date_entered,
        notes: notes
    })

    await post.save((err, doc) => {
        if (err) {
            return console.log(err)
        }
        console.log('Post Saved: ' + doc)
        //send back?
    })
}
//refine query functions
const getPosts = async (req, res) => {
    let items = await BirdySchema.find({})
    console.log('Found Documents!')
    console.log(items)
    res.send(JSON.stringify(items))
}

app.post('/post', handlePost)
//leave for front end dev
app.get('/display', getPosts)

app.listen(port, () => console.log(`listening on: ${port}`))