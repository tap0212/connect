import React from 'react';
import PermPhoneMsgTwoToneIcon from '@material-ui/icons/PermPhoneMsgTwoTone';
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import BookmarkTwoToneIcon from '@material-ui/icons/BookmarkTwoTone';
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
          <h3 style={{textTransform:"uppercase", marginBottom:0, paddingBottom:0}}>{this.state.event.title}</h3>
              <span style={{display:"linear"}} className="link-span">
                <strong ><BookmarkTwoToneIcon className="noti-icons" style={{fontSize:24}} />{this.state.event.category.name}</strong>
              </span>
             <h4>
               <PermPhoneMsgTwoToneIcon className="noti-icons" style={{fontSize:24}}/> {this.state.event.phone}
             </h4> 
        </div>  
        <div>
          <p className="white">
            <LocationOnTwoToneIcon className="noti-icons" style={{fontSize:24}} />  
            {this.state.event.venue}
          </p>
        </div>
      </div>
    );
  }
}

export default Tile