import React from 'react'

export default function Display(props) {
    return (
        <ul id="display-list">
            {props.displayContent ? props.displayContent.map(e => (
                <div className="display-item-container">
                    <li key={e._id}><em>name:</em> {e.name}</li>
                    <li key={e._id}><em>location:</em> {e.location}</li>
                    <li key={e._id}><em>notes:</em> {e.notes}</li>
                    <li key={e._id}><em>date observed:</em> {e.date_observed}</li>

                </div>
            )) : <em>Loading...</em>}
        </ul>
    )
}
