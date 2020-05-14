import React from 'react';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import ImageHelper from '../image';
import { Link } from 'react-router-dom';

import './tile.scss'
 class EventTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      event:props.event
    }
  }

  render(){
    return (
      <div  className="profile-tile-container">
        <div className="white">
          <h2 style={{textTransform:"uppercase"}}>{this.state.event.title}</h2>
              <span style={{display:"linear"}} className="link-span">
                <strong >{this.state.event.category.name}</strong>
                <Link style={{textDecoration:"none" ,float:"right", color:"white"}} to="/edit">
                  <EditTwoToneIcon style={{fontSize:35}} />
                </Link>
              </span>
            <DeleteForeverTwoToneIcon style={{cursor:"pointer",float:"right", fontSize:35}} onClick={this.props.handleDeleteEvent.bind(this,this.state.event)}  />
        </div>
        <ImageHelper event={this.state.event} className="profile-tile-image"/>
        <div>
          <p className="white">
            <strong>Description</strong>: <br/>
            {this.state.event.description}
          </p>
        </div>
      </div>
    );
  }
}

export default EventTile