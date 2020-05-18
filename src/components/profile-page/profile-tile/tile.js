import React from 'react';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { Link } from 'react-router-dom';
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";

import './tile.scss'

const override = css`
display: block;
margin-left:50%;
`;

 class EventTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      event:props.event,
      index: props.index
    }
  }

  Flash = () => {
    
    if(this.props.deleting === true){
        return <PropagateLoader
        css={override}
        size={22}
        color={"#66FCF1"}
        loading={this.props.deleting}
      />
    }
}

  render(){
    return (
      <div  className="profile-tile-container">
      {this.Flash()}
        <div className="white">
          <h2 style={{textTransform:"uppercase"}}>{this.state.event.title}</h2>
              <span style={{display:"linear"}} className="link-span">
                <strong >{this.state.event.category.name}</strong>
                <Link style={{textDecoration:"none" ,float:"right", color:"white"}}
                 to={{
                   pathname:"/edit",
                   state:{
                     event:this.state.event
                   }
                 }}>
                  <EditTwoToneIcon style={{fontSize:35}} />
                </Link>
              </span>
            <DeleteForeverTwoToneIcon style={{cursor:"pointer",float:"right", fontSize:35}} onClick={this.props.handleDeleteEvent.bind(this,this.state.event)}  />
        </div>
        
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