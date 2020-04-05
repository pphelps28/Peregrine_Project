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

// ---------- SCHEMATA ---------- // 

// bird Schema

const birdSchema = new mongoose.Schema({
    email: mongoose.SchemaTypes.Email,
    location: { type: String, required: true },
    date_visited: { type: String, require: true },
    season: { type: Number, require: true },
    // date_entered: Date,
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

// const eagleSchema = new mongoose.Schema({
//     email: mongoose.SchemaTypes.Email, 
//     location: { type: String, required: true },
//     date_visited: { type: String, require: true },
//     season: { type: Number, require: true },
//     date_entered: Date,
//     mileage: Number,
//     travel_time: Number,
//     start_time: Number,
//     end_time: Number,
//     total_time: Number,
//     temperature: Number,
//     precipitation: String,
//     cloud_coverage: Number,
//     wind_speed: Number,
//     summary: String,
//     eyrie_location: String,
//     number_young: Number,
//     young_age: String,
//     observations: String,
//     remarks: String,
//     researcher_comments_1: String,
//     researcher_comments_2: String
// })


// ---------- FUNCTIONS ---------- //

// ---------- PEREGRINE read, write, save functions ---------- //

// write new PEREGRINE data to database

const handleBirdPosts = async (req, res) => {

    // data inputted by monitor
    let name = req.body.name
    let location = req.body.site
    let email = req.body.email
    let date_visited = req.body.date_observed // might want to have this as 'visited' since that is how it is on the form 
    let season = req.body.date_visited.slice(0, 3) // this is not inputted by user
    // let date_entered = req.body.date_entered // don't have this one yet on front end
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

    if (name === 'Bald Eagle') {
        // new PEREGRINE data object created with monitor data

        let post = new EagleSchema({
            location: location,
            email: email,
            date_visited: date_visited,
            season: season,
            // date_entered: date_entered,
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

        // new EAGLE data object created with monitor data

        let post = new PeregrineSchema({
            location: location,
            email: email,
            date_visited: date_visited,
            season: season,
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

// search PEREGRINE database by inputted parameters and send to frontend

const getPeregrinePost = async (req, res) => {

    // search parameters inputted by admin user

    let location = req.body.site
    let season = req.body.season

    let items = await PeregrineSchema.find({ "location": location, "season": season })

    res.send(items)
}

app.post('/post', handleBirdPosts)
//leave for front end dev
// app.post('/display', getPeregrinePost)

// ---------- EAGLE read, write, save functions ---------- //



// // write new EAGLE data to database

// const handleEaglePost = async (req, res) => {

//     // data inputted by monitor

//     let location = req.body.site
//     let email = req.body.email
//     let date_visited = req.body.date_observed // might want to have this as 'visited' since that is how it is on the form 
//     let season = req.body.date_visited.slice(0, 3) // this is not inputted by user
//     let date_entered = req.body.date_entered // don't have this one yet on front end
//     let mileage = req.body.mileage
//     let travel_time = req.body.travel
//     let start_time = req.body.timeStart
//     let end_time = req.body.timeEnd
//     let total_time = req.body.totalTime
//     let temperature = req.body.temperature
//     let precipitation = req.body.precipitation
//     let cloud_coverage = req.body.cloudCover
//     let wind_speed = req.body.windSpeed
//     let summary = req.body.ObservationSummary
//     let eyrie_location = req.body.incubation
//     let number_young = req.body.young
//     let young_age = req.body.youngAge
//     let observations = req.body.observation
//     let remarks = req.body.comments

//     // new EAGLE data object created with monitor data

//     let post = new EagleSchema({
//         location: location,
//         email: email,
//         date_visited: date_visited,
//         season: season,
//         date_entered: date_entered,
//         mileage: mileage,
//         travel_time: travel_time,
//         start_time: start_time,
//         end_time: end_time,
//         total_time: total_time,
//         temperature: temperature,
//         precipitation: precipitation,
//         cloud_coverage: cloud_coverage,
//         wind_speed: wind_speed,
//         summary: summary,
//         eyrie_location: eyrie_location,
//         number_young: number_young,
//         young_age: young_age,
//         observations: observations,
//         remarks: remarks,
//     })

//     // new EAGLE data object written to database

//     await post.save((err, doc) => {
//         if (err) {
//             return console.log(err)
//         }
//         console.log('Post Saved: ' + doc)
//     })
// }

// search EAGLE database by inputted parameters and send to frontend

const getEaglePost = async (req, res) => {

    // search parameters inputted by admin user

    let location = req.body.site
    let season = req.body.season

    let items = await EagleSchema.find({ "location": location, "season": season })

    res.send(items)
}

// app.post('/post', handleEaglePost)
//leave for front end dev
// app.post('/display', getEaglePost)

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

// app.get('/post', handlePost)
// //leave for front end dev
// app.get('/display', getPosts)

app.listen(port, () => console.log(`listening on: ${port}`))
