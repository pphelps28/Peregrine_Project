

weatherBaseQuery = (zip) => {
    zip = zip.toString()
    let weatherObj = fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=2db52c8ef1a45a0b6b9f1fa971fa1b50
`)
        .then((res) => {
            console.log(res)
            return res.json()
        })
        .then((jsonObj) => {
            console.log(jsonObj)
        }).catch(err => {
            console.log(err.message)
        })
}