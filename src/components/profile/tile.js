import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import ImageHelper from './image';
import { Link } from 'react-router-dom';
import {deleteEvent} from '../add/apicalls'
import { isAuthenticated } from '../../APICalls/auth';
import './profile.scss'
const {user, token} = isAuthenticated()




 class Tile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      event:props.event
    }
  }

  handleDeleteEvent = () => {
    deleteEvent(this.props.event._id,user._id, token)
      .then(res => {
        this.setState({
          event:""
        })
      }).catch(err => console.log(err))
  }
  render(){
    return (
      <div className="root-tile">
        <div
          // action={
          //   <IconButton aria-label="settings">
          //     <Link to="/edit">
          //     <EditTwoToneIcon className="white" />
          //     </Link>

          //     <DeleteForeverTwoToneIcon onClick={this.handleDeleteEvent} className="white" />
          //   </IconButton>
          // }
          className="white"
        >
          <h4>{this.state.event.title}</h4>
              <span>
              <Link to="/edit">
               <EditTwoToneIcon className="white" />
              </Link>
              </span>
            <span><DeleteForeverTwoToneIcon onClick={this.handleDeleteEvent} className="white" /></span>
        </div>
        <ImageHelper event={this.state.event} className="media"/>
        <div>
          <p className="white">
            {this.state.event.description}
          </p>
        </div>
      </div>
    );
  }
}

export default Tile