import React from 'react'
import './event-tile.scss'
const  Event = event => {
    return (
        
        <div className="event-tile">
            {console.log(event.event.category.name)}
            <h1 className="event-title">{event.event.title}</h1>
            <span className="category-name">Category: {event.event.category.name}</span>
            <span className="event-venue">Venue: {event.event.venue}</span>
            <br/>
            <span className="event-phone">Contact At: {event.event.phone}</span>
        </div>
    )
}

export default Event
