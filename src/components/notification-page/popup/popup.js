import React, { Component } from 'react';
import {getUserNames} from '../../add/apicalls'
import ImageHelper from '../../profile/image'
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'
import VNav from '../../Navbar/verticalNav/vNav.component'
import {ReactComponent as EventSVG} from '../../../assets/location-event.svg'
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
                            <Grid item xs={12} sm={6} md={7}>
                                <div className="event-card">
                                    <Grid className="event-sub-card" container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                        <h2 className="event-name">{this.props.location.state.event.title}</h2>
                                        <h3 className="event-category-name">{this.props.location.state.event.category.name}</h3>
                                        <h4 className="event-venue">Venue: {this.props.location.state.event.venue}</h4>
                                        <h4 className="event-author">Host : {this.state.userName}</h4>
                                        <h4 className="phone">Contact : {this.props.location.state.event.phone}</h4>
                                        <h4 className="email">Email: {this.state.email}</h4>
                                        <p className="event-description">
                                            <strong>Description:</strong>
                                            <br/>
                                        {this.props.location.state.event.description}</p>
                                        </Grid>

                                        <Grid item xs={12} sm={5}>
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

                    
