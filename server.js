const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
require('mongoose-type-email')

//Experiments to add image upload
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
//
//do I need a view engine??
app.use(express.static('public'))

//
const mongoURI = 'mongodb+srv://paulPhelps:paulPhelps@chat-app-4tmuj.mongodb.net/Audubon?retryWrites=true&w=majority'

app.use(express.static(path.join(__dirname, '/client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//image upload experimentation, here to BIRD SCHEMATA
const conn = mongoose.createConnection(mongoURI, {
    useUnifiedTopology: true, useNewUrlParser: true
})
mongoose.set('useFindAndModify', false)

let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const sanitizeName = file.originalname.split(' ').join('')
                const filename = buf.toString('hex') + sanitizeName
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images' //match collection name
                };
                resolve(fileInfo);
            });
        });
    }
})
const upload = multer({ storage })

app.post('/upload', upload.single('img'), (req, res) => {
    console.log(req.file)
    console.log('uploaded!')
})


// ---------- BIRD SCHEMATA ---------- // 

const birdSchema = new mongoose.Schema({
    bird: String,
    monitor_name: String,
    email: mongoose.SchemaTypes.Email,
    location: { type: String, require: true },
    date_visited: { type: String, require: true },
    season: { type: String, require: true },
    mileage: String,
    travel_time: String,
    start_time: String,
    end_time: String,
    total_time: String,
    weather_observation: { type: String, require: true},  
    relationship_status: String,
    young_status: String,
    disturbance: String,
    summary: String,
    eyrie_location: String,
    number_young: String,
    young_age: String,
    observations: String,
    remarks: String,
    researcher_comments_1: String,    
    image: { data: Buffer, contentType: String }

})

// PEREGRINE Schema

const PeregrineSchema = mongoose.model('PeregrineSchema', birdSchema)

// EAGLE Schema

const EagleSchema = mongoose.model('EagleSchema', birdSchema)

// ---------- NESTING SITE SCHEMATA ---------- //

const siteSchema = new mongoose.Schema({
    bird: String,
    sites: Array
})

// Peregrine SITE Schema

const PeregrineSiteSchema = mongoose.model('PeregrineSiteSchema', siteSchema)

// Eagle SITE Schema

const EagleSiteSchema = mongoose.model('EagleSiteSchema', siteSchema)

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
    let weather_observation = req.body.weatherObservation
    // let temperature = req.body.temperature
    // let precipitation = req.body.precipitation
    // let cloud_coverage = req.body.cloudCover
    // let wind_speed = req.body.windSpeed
    let relationship_status = req.body.relationshipStatus
    let young_status = req.body.youngStatus
    let disturbance = req.body.disturbance
    let summary = req.body.ObservationSummary
    let eyrie_location = req.body.incubation
    let number_young = req.body.young
    let young_age = req.body.youngAge
    let observations = req.body.observation
    let remarks = req.body.comments
    let image = req.body.image

    let post

    console.log(date_visited)
    console.log(location)
    if (bird === 'Bald Eagle') {

        // new EAGLE data object created from monitor data

        post = new EagleSchema({
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
            weather_observation: weather_observation,
            // let temperature = temperature
            // let precipitation = precipitation
            // let cloud_coverage = cloudCover
            // let wind_speed = windSpeed
            relationship_status: relationship_status,
            young_status: young_status,
            disturbance: disturbance,
            summary: summary,
            eyrie_location: eyrie_location,
            number_young: number_young,
            young_age: young_age,
            observations: observations,
            remarks: remarks,
            image: image
        })
        
    } else {

        // new PEREGRINE data object created from monitor data

        console.log('received peregrine data')

        post = new PeregrineSchema({
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
            weather_observation, weather_observation,
            // temperature: temperature,
            // precipitation: precipitation,
            // cloud_coverage: cloud_coverage,
            // wind_speed: wind_speed,
            relationship_status: relationship_status,
            young_status: young_status,
            disturbance: disturbance,
            summary: summary,
            eyrie_location: eyrie_location,
            number_young: number_young,
            young_age: young_age,
            observations: observations,
            remarks: remarks,
            image: image
        })
    }

    // and written to database

    await post.save((err, doc) => {
        if (err) {
            return console.log(err)
        }
        console.log('Post Saved: ' + doc)
    })
}

// searches BIRD database by inputted parameters and sends to frontend

const getBirdPosts = async (req, res) => {
    console.log('searching for data')

    // search parameters inputted by admin user

    let bird = req.body.bird
    let location = req.body.site
    let season = req.body.season

    if (location === '') {
        location = { $exists: true }
    }

    if (season === '') {
        season = { $exists: true }
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

// adds / edits researcher's comments to EAGLE or PEREGRINE databases

const updateBirdPosts = async (req, res) => {
    console.log('finding selected database')

    let bird = req.body.bird
    let id = req.body.id
    let researcherComments = req.body.comments
    let updatedDoc

    console.log(bird)
    console.log(researcherComments)

    const filter = { _id: ObjectId(id) };
    const comments = { researcher_comments_1: researcherComments }

    if (bird === "Bald Eagle") {
        console.log('updating Eagle db')
        updatedDoc = await EagleSchema.findOneAndUpdate(filter, comments, { new: true })
    }

    else {
        console.log('updating Peregrine db')
        updatedDoc = await PeregrineSchema.findOneAndUpdate(filter, comments, { new: true })
    }

    res.send(updatedDoc)
}

// adds new nesting site to Eagle or Peregrine SITE databases

const addNestingSite = async (req, res) => {
    console.log(`adding ${req.body.bird} sites to site schema`)

    let bird = req.body.bird
    let site = req.body.nestingSite
    let id
    let updatedSites
    let filter

    console.log(site)    

    if (bird === "Bald Eagle") {
        id = "5e94c31ac0c3fe4534f1b7be"
        filter = { _id: ObjectId(id) }
        console.log('updating Eagle sites')
        updatedSites = await EagleSiteSchema.findOneAndUpdate(filter, { $push: { sites: site } }, { new: true })
    }

    else {
        id = '5e94c3b903443b4d2c7f7a5d'
        filter = { _id: ObjectId(id) }
        console.log('updating pefa sites')
        updatedSites = await PeregrineSiteSchema.findOneAndUpdate(filter, { $push: { sites: site } }, { new: true })
    }
}

// gets current list of Eagle or Peregrine sites from respective SITE databases and sends back

const getSiteList = async (req, res) => {
    console.log('inside the site list request')
    let bird = req.body.bird
    let currentList
    let id
    let filter

    if (bird === "Bald Eagle") {
        console.log('getting Eagle sites')
        id = "5e94c31ac0c3fe4534f1b7be"
        filter = { _id: ObjectId(id) }
        currentList = await EagleSiteSchema.findOne(filter)
    }
    else if (bird === "Peregrine Falcon") {
        console.log('getting pefa sites')
        id = '5e94c3b903443b4d2c7f7a5d'
        filter = { _id: ObjectId(id) }
        currentList = await PeregrineSiteSchema.findOne(filter)
    }

    let listArray = currentList.sites
    console.log(listArray.sort())
    console.log(currentList)
    res.send(currentList)
}

const getReport = async (req, res) => {
    console.log("got report request")
    console.log(req.params._id)

    let id = req.params._id
    let bird = req.params.bird

    const filter = { _id: ObjectId(id) };
    let report

    if (bird === 'Bald Eagle') {
        console.log('getting Eagle report')
        report = await EagleSchema.findOne(filter)
    } else {

        report = await PeregrineSchema.findOne(filter)
        console.log('getting Peregrine report')
    }
    res.send(report)
}
//trying to render images
app.get('/images/:id', (req, res) => {
    gfs.files.findOne({ filename: req.params.id }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        //Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            console.log(file)
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        }
        else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    })
})

app.post('/post', handleBirdPosts)
app.post('/display', getBirdPosts)
app.post('/update', updateBirdPosts)
app.post('/addSite', addNestingSite)
app.post('/getSites', getSiteList)
app.get('/reportModal/:bird/:_id', getReport)
app.listen(port, () => console.log(`listening on: ${port}`))
