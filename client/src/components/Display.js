import React from 'react'

export default function Display(props) {
    return (
        <div className="container" >
        <div className="audubonvt" ></div>


        <table className="table table-striped">
            <thead>
                <tr> {/* //table headers */}
                    <th scope="col">Observer</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date Observed</th>
                    <th scope="col">Full Entry</th>
                </tr>
            </thead>
            <tbody>
                {/* //ternary operator that will iterate through each entry using a key */}
            {props.displayContent ? props.displayContent.map(e => (
                <tr key={e._id}>
                    <th scope="row" > {e.name}</th>
                    <td >{e.location}</td>
                    <td >{e.date_observed}</td>
                    <td>See the full entry | Edit </td>
                </tr>
            )) : <em>Loading...</em>}
            </tbody>
        </table>
        </div>
    )
}
