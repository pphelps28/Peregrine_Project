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
const getPosts = async (req, res) => {
    let items = await BirdySchema.find({})
    console.log('Found Documents!')
    console.log(items)
    res.send(JSON.stringify(items))
}
app.post('/post', handlePost)
app.get('/display', getPosts)
app.listen(port, () => console.log(`listening on: ${port}`))