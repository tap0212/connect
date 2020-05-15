import React, { Component } from 'react';
import {getUserNames} from '../../add/apicalls'
import ImageHelper from '../../profile-page/image'
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'
import VNav from '../../Navbar/verticalNav/vNav.component'
import {ReactComponent as EventSVG} from '../../../assets/location-event.svg'
import BookmarksTwoToneIcon from '@material-ui/icons/BookmarksTwoTone';
import LocationCityTwoToneIcon from '@material-ui/icons/LocationCityTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import ContactPhoneTwoToneIcon from '@material-ui/icons/ContactPhoneTwoTone';
import AlternateEmailTwoToneIcon from '@material-ui/icons/AlternateEmailTwoTone';

import './popup.scss'
class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:"",
            userName:""
        }
    }

    componentWillMount() {
        getUserNames()
    .   then(users => {
        users.map(user => {
          if(user._id === this.props.location.state.event.person){
            this.setState({
              email:user.email,
              userName:user.name
            })
          }
        })
        }).catch(err => console.log(err))
    }
    render() {
        return (
                <div className="event-container">
                    <VNav/>
                    <div className="event-card-container">
                        <Grid container spacing={3}>
                            <Grid className="card-grid" item xs={12} sm={6} md={7}>
                                <div className="event-card">
                                    <Grid className="event-sub-card" container spacing={2}>
                                        <Grid item xs={12} md={7}>
                                        <h1 className="event-h1">{this.props.location.state.event.title}</h1>
                                        <h2 className="event-h2"><BookmarksTwoToneIcon/>  {this.props.location.state.event.category.name}</h2>
                                        <h3 className="event-h3"><LocationCityTwoToneIcon/>  {this.props.location.state.event.venue}</h3>
                                        <h3 className="event-h3"><FaceTwoToneIcon/>  {this.state.userName}</h3>
                                        <h3 className="event-h3"><ContactPhoneTwoToneIcon/>  {this.props.location.state.event.phone}</h3>
                                        <h3 className="event-h3"><AlternateEmailTwoToneIcon/>  {this.state.email}</h3>
                                        <h3 className="event-h3">Description:</h3>
                                        <p className="event-p">
                                        {this.props.location.state.event.description}</p>
                                        </Grid>

                                        <Grid item xs={12} md={5}>
                                        <ImageHelper id="image" event={this.props.location.state.event}/>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid className="event-svg-container" item xs={12} sm={6} md={5}>
                               <EventSVG className="event-svg"/>
                            </Grid>
                        </Grid>
                     </div>
                </div>
        );
    }
}

export default Event;

                    
