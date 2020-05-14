import React from 'react';

import './event-tle.scss'

 class Tile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      event:props.event,
      longitude:null,
      latitude:null,
      open:false,
    }
  }


  render(){
    return (
      
      <div style={{flex:1}} className="notification-tile-container">
        <div className="white">
          <h2 style={{textTransform:"uppercase", marginBottom:0, paddingBottom:0}}>{this.state.event.title}</h2>
              <span style={{display:"linear"}} className="link-span">
                <strong >{this.state.event.category.name}</strong>
              </span>
        </div>  
        <div>
          <p className="white">
            <strong>Venue  </strong>:  
            {this.state.event.venue}
          </p>
        </div>
      </div>
    );
  }
}

export default Tile