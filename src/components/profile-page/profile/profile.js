import React, { Component } from 'react';
import VNav from '../../Navbar/verticalNav/vNav.component'
import {Link, Redirect} from 'react-router-dom'
import {getEvents, deleteEvent} from '../../add/apicalls'
import './profile.scss'
import { isAuthenticated } from '../../../APICalls/auth'
import EventTile from '../profile-tile/tile'
import {ReactComponent as Empty} from '../../../assets/emtysvg.svg'
import Grid from '@material-ui/core/Grid';
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";
const override = css`
    display: block;
    margin-left:50%;
   `;
const {user, token} = isAuthenticated()
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventList:null,
            deleting:false
        }
    }

    componentWillMount(){
        getEvents().then(eventList => {
            eventList.map(event => {
                if(event.person !== user._id){
                    this.setState({
                        eventList:""
                    })
                }else{
                    this.setState({
                        eventList:[...this.state.eventList,event]
                    })
                }
            })
        })
    }

    handleDeleteEvent = (event) => {
        this.setState({
            deleting:true
        })
        deleteEvent(event._id,user._id, token)
          .then(res => {
            this.updateStateAfterDeletion(this.state.eventList, event)
            
            console.log(res)
          }).catch(err => console.log(err))
      }

      updateStateAfterDeletion = (eventList, event) => {
          const index = eventList.indexOf(event)
          if(index > -1){
              eventList.splice(event,1)
              this.setState({
                  eventList:eventList,
                  deleting:false
              })
          }
      }
    renderTile(){
        if(this.state.eventList === null){
            return <PropagateLoader
            css={override}
            size={40}
            color={"#6C63FE"}
            loading={this.state.loading}
          />
        }
        if(this.state.eventList.length === 0){
            return (<div className="error-note">
                <h3>You don't have created any Notification yet</h3>
                    <h3><Link className="link-profile" to="/add">Why don't you create one Now?</Link></h3>
                    
                        <Empty className="empty"/>
             
            </div>
            )
        }else{
            return (
                this.state.eventList.map(event => {
                    return (<Grid className="events" item xs={12} sm={4} md={3}>
                        <EventTile event={event} deleting={this.state.deleting} handleDeleteEvent={this.handleDeleteEvent}/>
                    </Grid>)
                })
            )
        }
    }

    render() {
        return (
            
            <div className="profile-container">
            {console.log(this.state.eventList)}
                <VNav/>
                <div className="profile-container">
                    <Grid className="root" container xs={12} spacing={2}>
                        {this.renderTile()}
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Profile;