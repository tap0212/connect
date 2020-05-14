import React, { Component } from 'react';
import {getUserNames} from '../../add/apicalls'
import ImageHelper from '../../profile/image'
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom'
import './popup.scss'
class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allUserNames:"",
            email:"",
            userName:""
        }
    }

    componentWillMount() {
        getUserNames()
    .   then(users => {
        users.map(user => {
          if(user._id === this.props.event.person){
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
                <div className="popup-container">
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <h2 className="popup-name">{this.props.event.title}</h2>
                    <h4 className="popup-breed">{this.props.event.category.name}</h4>
                    <h4 className="popup-age">Venue: {this.props.event.venue}</h4>
                    <h4 className="popup-location">: {}</h4>
                    <p className="popup-description">
                        <strong>Description:</strong>
                        <br/>
                    {this.props.event.description}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div id="popup-image-container">
                    <ImageHelper id="image" ItemsList={this.props.event}/>
                    </div>
                </Grid>
            </Grid>
        </div>
        );
    }
}

export default Modal;