searchDatabase = (event) => {
    
  let query = { // this query is coming from the three search input fields

      bird: this.state.bird,
      site: this.state.site,
      season: this.state.season
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
      this.setState({ displayContent: jsonObj })       
    })

    this.setState({
      bird: '',
      site: '',
      season: '',
    })
}


<tbody>
    {/* //ternary operator that will iterate through each entry using a key */}

    {props.displayContent ? props.displayContent.map(e => (
        <tr key={e._id}>
            <th scope="row" > {e.bird}</th>
            <td >{e.site}</td>
            <td >{e.date_observed}</td>
            <td >{e.comments}</td>
            <td>See the full entry | Edit </td>
        </tr>
    )) : <em>Loading...</em>}
                    : <p>Loading ... </p>
</tbody>
