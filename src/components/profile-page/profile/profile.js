import React, { Component } from 'react';
import VNav from '../../Navbar/verticalNav/vNav.component'
import {Link} from 'react-router-dom'
import {getEvents, deleteEvent} from '../../add/apicalls'
import './profile.scss'
import EventTile from '../profile-tile/tile'
import {ReactComponent as Empty} from '../../../assets/emtysvg.svg'
import Grid from '@material-ui/core/Grid';
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";


const override = css`
    display: block;
    margin-left:50%;
    margin-top:20vh
   `;
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventList:[],
            loading:true,
            deleting:false,
            user:"", 
            token:""
        }
    }

   async  componentDidMount(){
        const jwt = JSON.parse(localStorage.getItem("jwt"))
      await  this.setState({
           user:jwt.user,
           token:jwt.token
         })
      await  getEvents().then(eventList => {
            eventList.map(event => {
                if(eventList){
                    this.setState({
                        loading:false
                    })
                }
                if(event.person === this.state.user._id){
                    this.setState({
                        eventList:[...this.state.eventList,event]
                    })
                }else{
                   return null;
                }
            })
        })
    }

    handleDeleteEvent = (event) => {
        this.setState({
            deleting:true
        })
        deleteEvent(event._id,this.state.user._id, this.state.token)
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
        if(this.state.loading === true){
            return <PropagateLoader
            css={override}
            size={40}
            color={"#6C63FE"}
            loading={this.state.loading}
          />
        }
        else if(this.state.eventList.length === 0){
            return (<div className="error-note">
                <h3>You don't have created any Notification yet</h3>
                    <h3><Link className="link-profile" to="/add">Why don't you create one Now?</Link></h3>
                    
                        <Empty className="empty"/>
             
            </div>
            )
        }else{
            return (
                
                this.state.eventList.map((event, index )=> {
                    return (<Grid className="events" item xs={12} sm={4} md={3}>
                        <EventTile index={index} event={event} deleting={this.state.deleting} handleDeleteEvent={this.handleDeleteEvent}/>
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