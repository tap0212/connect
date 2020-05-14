import React from 'react';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import ImageHelper from './image';
import { Link } from 'react-router-dom';
import {deleteEvent} from '../add/apicalls'
import { isAuthenticated } from '../../APICalls/auth';
import './profile.scss'


const {user, token} = isAuthenticated()




 class EventTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      event:props.event
    }
  }

  render(){
    return (
      <div style={{flex:1, maxWidth:"345px" , padding:"4%", fontFamily:"'Poppins', sans-serif" , backgroundColor:"#1E1E30", color:"white"}}>
        <div className="white">
        {console.log(this.state.event)}
          <h2 style={{textTransform:"uppercase"}}>{this.state.event.title}</h2>
              <span style={{display:"linear"}} className="link-span">
                <strong >{this.state.event.category.name}</strong>
                <Link style={{textDecoration:"none" ,float:"right", color:"white"}} to="/edit">
                  <EditTwoToneIcon style={{fontSize:35}} />
                </Link>
              </span>
            <DeleteForeverTwoToneIcon style={{cursor:"pointer",float:"right", fontSize:35}} onClick={this.props.handleDeleteEvent.bind(this,this.state.event)}  />
        </div>
        <ImageHelper event={this.state.event} className="media"/>
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