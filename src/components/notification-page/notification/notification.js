import React from 'react'
import Grid from '@material-ui/core/Grid';
import VNav from '../../Navbar/verticalNav/vNav.component'
import {getEvents, getAllLocations} from '../../add/apicalls'
import { ReactBingmaps } from 'react-bingmaps';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Popup from "reactjs-popup";
import Modal from '../popup/popup'
import Tile from '../eventTile/event-tile'
import {Link} from 'react-router-dom'
import './notification.styles.scss'

export default class  Notification extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            longitude:null,
            latitude:null,
            infoboxesWithPushPins:[],
            eventList:[],
            eventList5KM:[],
            eventList10KM:[],
            locationList:[],
            distance5:true,
            distance10:false,


        }
        this.getLocation = this.getLocation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this);
    }

     distance(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344 
            return dist;
        }
    }

    

    getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getCoordinates)
        }else{
            alert('No Location')
        }
    }

    getCoordinates(position){
        this.setState({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }

    componentDidMount(){
        this.getLocation();
        getEvents().then(list => {
            getAllLocations().then(locations => {
                this.setState({locationList:locations})
                list.map(listElement => {
                    locations.map(e => {
                        if(listElement._id === e.event){
                            const title = listElement.title
                            const lat = e.latitude
                            const long = e.longitude
                            this.state.infoboxesWithPushPins.push({
                                "location":[lat, long],
                                "addHandler":"mouseover",
                               "infoboxOption": { title: title, description: 'Infobox' },
                                "pushPinOption":{ title: title, description: 'Pushpin' },
                                "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
                                "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
                            })
                        }
                    })
                })
                list.map(listEvent => {
                    locations.map(location => {
                        if(listEvent._id === location.event){
                            const distance = this.distance(location.latitude, location.longitude, this.state.latitude, this.state.longitude)
                            if(distance<=5){
                                this.setState({
                                    eventList5KM:[...this.state.eventList5KM, listEvent]                                })
                            }
                            if(distance<=10){
                                this.setState({
                                    eventList10KM:[...this.state.eventList10KM, listEvent]
                                })
                            }
                        }
                    })
                })
            })
        })

        
    }

    renderTile = () => {
        if(this.state.distance5){
            if(this.state.eventList5KM.length === 0){
                return <h2>There are no Notifications around you</h2>
            }
            else{
                return (
                    
                    this.state.eventList5KM.map(event => {
                        return (
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12}>
                                <Link 
                                className="event-link"
                                    to = {{
                                        pathname:`/event/${event._id}`,
                                        state: {
                                            event:event
                                        }
                                    }}
                                >
                                    <Tile 
                                     locationList={this.state.locationList} 
                                     event={event}
                                    />
                                </Link>
                            </Grid>
                        )
                    })
                )
            }
        }

        if(this.state.distance10){
            if(this.state.eventList10KM.length === 0){
                return <h2>There are no Notifications around you</h2>
            }
            else{
                return (
                    this.state.eventList10KM.map(event => {
                       return ( 
                           <Popup modal trigger = {
                               <Grid item xs={12}  md={4}>
                                    <Tile 
                                        locationList={this.state.locationList} 
                                        event={event}
                                    />
                                 </Grid>
                           }>
                               {<Modal event={event}  />}
                           </Popup>
                       )
                    })
                )
            }
        }
    }

    showDistance = () => {
        if(this.state.distance5){
            return <h2>Here's a list of Notifications in a radius of 5 Km.</h2>
        }
        else{
            return <h2>Here's a list of Notifications in a radius of 10 Km.</h2>
        }
    }

    Update() {
        this.setState({ state: this.state });
    }

    callUpdate() {
        setInterval(() =>{
            this.Update();
        }, 1000);
    }
   
    render(){
        
    return (
        <div className="home-container">
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <h1>Notifications Around You</h1>
                        <div className="filter">
                            <ToggleButton
                                value="check"
                                selected={this.state.distance5}
                                onChange={() => {
                                    if(this.state.distance5){
                                        this.setState({
                                        distance10:true,
                                        distance5:false
                                    })
                                    }
                                    else{
                                        this.setState({
                                            distance5:true,
                                            distance10:false
                                        })
                                    }
                                }}
                                >
                                    5KM
                                </ToggleButton>

                                <ToggleButton
                                value="check"
                                selected={this.state.distance10}
                                onChange={() => {
                                    if(this.state.distance10){
                                        this.setState({
                                            distance10:false,
                                            distance5:true
                                        })
                                    }else{
                                    this.setState({
                                        distance10:true,
                                        distance5:false
                                    })
                                    }
                                }}
                                >
                                    10KM
                                </ToggleButton>
                        </div>
                        {this.showDistance()}
                        <Grid container spacing={3}>
                        {
                            this.renderTile()
                        }
                        </Grid>
                    
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                    <ReactBingmaps 
                        bingmapKey =  'ArzAufq-ny6rTgIo5CnHtOCDEQrlNRUmUulXgYQdr9DVwCnXgTOdX1SAUY6iejHO'
                        center = {[this.state.latitude,this.state.longitude]}
                        zoom = {11}
                        className = "map"
                        infoboxesWithPushPins = {this.state.infoboxesWithPushPins}
                        > 
                    </ReactBingmaps>
                    </Grid>
                </Grid>
            </div>
                        {this.callUpdate()}
        </div>
    )
    }
}

