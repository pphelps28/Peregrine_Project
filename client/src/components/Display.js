import React from 'react'

export default function Display(props) {
    return (
        <div className="container" >
        <img src="./src/img/Audubon_H_BLK_VT.png" className="img-fluid"/>

        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Observer</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date Observed</th>
                    <th scope="col">Full Entry</th>
                </tr>
            </thead>
            <tbody>
            {props.displayContent ? props.displayContent.map(e => (

                <tr>
                    <th scope="row" key={e._id}> {e.name}</th>
                    <td key={e._id}>{e.location}</td>
                    <td key={e._id}>{e.date_observed}</td>
                    <td><a href="">See the full entry</a></td>
                </tr>
            )) : <em>Loading...</em>}
            </tbody>
        </table>
        </div>
    )
}
