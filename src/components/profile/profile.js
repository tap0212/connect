import React, { Component } from 'react';
import VNav from '../Navbar/verticalNav/vNav.component'
import {Link} from 'react-router-dom'
import {getEvents, getAllLocations} from '../add/apicalls'
import './profile.scss'
import { isAuthenticated } from '../../APICalls/auth'
import EventTile from '../notification/event-tile/event-tile'
import {ReactComponent as Empty} from '../../assets/emtysvg.svg'
import Tile from './tile';
import Grid from '@material-ui/core/Grid';

const {user, token} = isAuthenticated()
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventList:[]
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

    renderTile(){
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
                    return (<Grid className="events" item xs={6} sm={3}>
                        <Tile event={event}/>
                    </Grid>)
                })
            )
        }
    }

    render() {
        return (
            <div>
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