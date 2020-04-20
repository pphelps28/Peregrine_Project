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
const localURI = 'mongodb+srv://paulPhelps:paulPhelps@chat-app-4tmuj.mongodb.net/Audubon?retryWrites=true&w=majority'
app.use(express.static(path.join(__dirname, '/client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//image upload experimentation, here to BIRD SCHEMATA
const conn = mongoose.createConnection(process.env.MONGO_URI || localURI, {
    useUnifiedTopology: true, useNewUrlParser: true
})
mongoose.connect(process.env.MONGO_URI || localURI, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})


const storage = new GridFsStorage({
    url: process.env.MONGO_URI || localURI,
    options: { useUnifiedTopology: true, useNewUrlParser: true },
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
                    bucketName: 'images',//match collection name,
                    metadata: {
                        doc_id: req.params.doc_id
                    }
                };
                resolve(fileInfo);
            });
        });
    }
})
const upload = multer({ storage })

app.post('/upload/:doc_id', upload.single('img'), (req, res) => {
    console.log(req.file)
    console.log(req.params.doc_id)
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
    weather_observation: String,
    eagle_band: String,
    eagle_age: String,
    single_bird: String,
    bird_pair: String,
    courtship: String,
    incubating: String,
    hatched: String,
    nest_failure: String,
    fledged: String,
    disturbance: String,
    eyrie_location: String,
    number_young: String,
    young_age: String,
    observations: { type: String, require: true },
    remarks: String,
    researcher_comments_1: String,
    image: { data: Buffer, contentType: String },
    caption: String

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
    let eagle_band = req.body.eagleBand
    let eagle_age = req.body.eagleAge
    let single_bird = req.body.singleBird
    let bird_pair = req.body.birdPair
    let courtship = req.body.courtship
    let incubating = req.body.incubating
    let hatched = req.body.hatched
    let nest_failure = req.body.nestFailure
    let fledged = req.body.fledged
    let disturbance = req.body.disturbance    
    let eyrie_location = req.body.incubation
    let number_young = req.body.young
    let young_age = req.body.youngAge
    let observations = req.body.observation
    let remarks = req.body.comments
    let image = req.body.image
    let caption = req.body.caption

    let post

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
            eagle_age: eagle_age,
            eagle_band: eagle_band,            
            single_bird: single_bird,
            bird_pair: bird_pair,
            courtship: courtship,
            incubating: incubating,
            hatched: hatched,
            nest_failure: nest_failure,
            fledged: fledged,
            disturbance: disturbance,            
            eyrie_location: eyrie_location,
            number_young: number_young,
            young_age: young_age,
            observations: observations,
            remarks: remarks,
            image: image,
            caption: caption
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
            single_bird: single_bird,
            bird_pair: bird_pair,
            courtship: courtship,
            incubating: incubating,
            hatched: hatched,
            nest_failure: nest_failure,
            fledged: fledged,            
            disturbance: disturbance,
            eyrie_location: eyrie_location,
            number_young: number_young,
            young_age: young_age,
            observations: observations,
            remarks: remarks,
            image: image,
            caption: caption
        })
    }

    // and written to database

    await post.save((err, doc) => {
        if (err) {
            res.status(500)
            res.send()
        }
        else {
            res.status(200)
            res.send(JSON.stringify(doc._id))
            console.log('Post Saved: ' + doc)
        }
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

    currentList.sites.sort()
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
app.get('/images/:doc_id', (req, res) => {
    console.log(req.params.doc_id)
    gfs.files.findOne({ "metadata.doc_id": req.params.doc_id }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            })
        }
        console.log('file: ' + file)
        //Check if image
        console.log(file.contentType)
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

// --------------------- functions to manipulate database for setup purposes ----------------------- //

// --------- set up pefa sites ---------- //

const addAllSites = async () => {

    let id
    let filter
    console.log('updating all pefa sites')

    let townArray = ['Milton',
        'West Haven',
        'Jamaica',
        'Barnet',
        'Lowell',
        'Benson',
        'Bethel',
        'Ira',
        'Bolton',
        'Bolton',
        'Bradford',
        'Bristol',
        'Averill',
        'Duxbury',
        'Bakersfield',
        'Barton',
        'Bristol',
        'Vershire',
        'Milton',
        'Bristol',
        'Fairlee',
        'Newark',
        'Calais',
        'Weathersfield',
        'Pawlet',
        'Lowell',
        'Highgate',
        'Westmore',
        'Milton',
        'Burlington',
        'Colchester',
        'Marshfield',
        'Goshen/Rochester',
        'Lowell',
        'Westmore',
        'Underhill',
        'Woodbury',
        'Hartland',
        'Wells',
        'Johnson',
        'Pownal',
        'Salisbury',
        'Benson',
        'Hinesburg',
        'S.Burlington',
        'Barre',
        'Ryegate',
        'Fairlee',
        'Springfield',
        'Cambridge',
        'Addison',
        'Proctor',
        'Swanton',
        'Manchester',
        'Vernon',
        'Stockbridge',
        'Castleton',
        'Colchester',
        'Wallingford',

    ]

    let townArrayParens = townArray.map(town => {
        town = ' (' + town + ')'
        return town
    })

    let sitesArray = [
        'Arrowhead',
        'Bald Mtn.',
        'Ball Mt. Dam',
        'Barnet',
        'Belvidere Mt Quarry',
        'Benson Ledges',
        'Bethel Quarry',
        'Bird Mtn.',
        'Bolton Notch (UUW)',
        'Bone Mtn.',
        'Bradford Cliff',
        'Bristol Cliffs',
        'Brousseau Mtn.',
        'Camels Hump',
        'Checkerberry Ledge',
        'Crystal Lake',
        'Deer Leap',
        'Eagle Ledge',
        'Eagle Mtn.',
        'Elephant Mtn.',
        'Fairlee Palisades',
        'Hawk Rock',
        'Hawkins Pond',
        'Hawks Mt',
        'Haystack Mtn.',
        'Hazen\'s Notch',
        'Highgate Cliffs',
        'Jobs Mtn.',
        'Lamoille River',
        'Lone Rock Pt',
        'Mallett’s Bay',
        'Marshfield Mtn.',
        'Mt. Horrid',
        'Mt. Norris',
        'Mt. Pisgah',
        'Nebraska Notch',
        'Nichols Ledge',
        'North Hartland Dam',
        'Pond Mtn.',
        'Prospect Rock',
        'Quarry Hill',
        'Rattlesnake Pt.',
        'Rattlesnake Ridge',
        'Red Rock',
        'Red Rocks Park',
        'Rock of Ages Quarry',
        'Ryegate Quarry',
        'Sawyer Mtn.',
        'Skitchewaug Mtn.',
        'Smuggler’s Notch',
        'Snake Mtn.',
        'Sutherland Quarry/Proctor',
        'Swanton Quarry',
        'Table Rock/Mt Equinox',
        'VT Yankee',
        'Vulture Mt',
        'Wallace Ledge',
        'Whitcomb Quarry',
        'White Rocks'
    ]

    console.log(townArrayParens.length)
    console.log(sitesArray.length)

    let i = 0
    let combinedSite

    while (i < townArrayParens.length) {
        combinedSite = sitesArray[i] + townArrayParens[i]
        console.log(combinedSite)
        id = '5e94c3b903443b4d2c7f7a5d'
        filter = { _id: ObjectId(id) }
        await PeregrineSiteSchema.findOneAndUpdate(filter, { $push: { sites: combinedSite } }, { new: true })
        i++
    }
}

// addAllSites()

// -------- delete repeated sites ---------- //

const deleteSites = async () => {

    let id = '5e94c3b903443b4d2c7f7a5d'
    let filter = { _id: ObjectId(id) }
    currentList = await PeregrineSiteSchema.findOne(filter)

    let listArray = currentList.sites
    let newArray = listArray.slice(0, 69)
    console.log(newArray)
    await PeregrineSiteSchema.findOneAndUpdate(filter, { sites: newArray }, { new: true })

}

// deleteSites()
