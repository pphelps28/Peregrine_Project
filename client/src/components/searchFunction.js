searchDatabase = (event) => {
    
  let query = { // this query is coming from the two search input fields
      site: event.target.value.site,
      season: event.target.value.season
  }

  fetch(('/post'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(res => {
      
      return res.json()
    }).then(jsonObj => {
      this.setState({ displayContent: jsonObj }) // need to determine whether this will go into App's state or whether it will simply be displayed on the page
      
    })


}
