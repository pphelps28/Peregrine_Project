import React from 'react'

export default function Display(props) {
    return (
        <div className="container" >
            <div className="audubonvt" ></div>
            <div>
                <label>Bald Eagle or Peregrine Falcon</label>
                <input type="text" value={props.bird} onChange={props.birdChange} />
            </div>
            <div>
                <label>Site Name</label>
                <input type='text' value={props.site} onChange={props.siteChange} />
            </div>
            <div>
                <label>Season (Year)</label>
                <input type='text' value={props.season} onChange={props.seasonChange} />
            </div>
            <input type="submit" value="Search" className="btn btn-primary" onClick={props.searchDataBase} />

            <table className="table table-striped">
                <thead>
                    <tr> {/* //table headers */}
                        <th scope="col">Observer</th>
                        <th scope="col">Location</th>
                        <th scope="col">Date Observed</th>
                        <th scope="col">Full Entry</th>
                    </tr>
                </thead>

            </table>
            <ul >
            {props.displayContent ? props.displayContent.map(e =>
                <div key={e._id} className='display-item-container'>

                    <li>season: {e.season}</li>
                    <li>email: {e.email}</li>
                    <li>location:  {e.location}</li>
                    <li>wind speed: {e.wind_speed}</li>
                    <li>precipitation: {e.precipitation}</li>
                    <li>Date observed: {e.date_visited}</li>
                    <li>observations: {e.observations}</li>

                </div>) : "Loading..."}


        </ul>
        </div >
    )
}


//  <tbody>
//     {/* //ternary operator that will iterate through each entry using a key */}

//     {props.displayContent ? props.displayContent.map(e => (
//         <tr key={e._id}>
//             <th scope="row" > {e.bird}</th>
//             <td >{e.site}</td>
//             <td >{e.date_observed}</td>
//             <td >{e.comments}</td>
//             <td>See the full entry | Edit </td>
//         </tr>
//     )) : <em>Loading...</em>}
//                     : <p>Loading ... </p>
// </tbody>

