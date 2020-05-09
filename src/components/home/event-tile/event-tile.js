import React from 'react'
import './event-tile.scss'

class  Event extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                
            }
        
    }

    
    render(){
        
    return (
        
        <div className="event-tile">
          
            {console.log(this.props.event.User)}

            <h1 className="event-title">{this.props.event.title}</h1>
            <h3 className="name">{this.props.event.name}</h3>
            <span className="category-name">Category: {this.props.event.category.name}</span>
            <span className="event-venue">Venue: {this.props.event.venue}</span>
            <br/>
            <span className="event-phone">Contact At: {this.props.event.phone}</span>
        </div>
    )
    }
}

export default Event
