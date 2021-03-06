import React from 'react'
import Grid from '@material-ui/core/Grid';
import VNav from '../../Navbar/verticalNav/vNav.component'
import {getEvents, getAllLocations} from '../../add/apicalls'
import ToggleButton from '@material-ui/lab/ToggleButton';
import Tile from '../eventTile/event-tile'
import {Link} from 'react-router-dom'

import './notification.styles.scss'
import ReactMapboxGl, {  Marker } from "react-mapbox-gl";
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";
const override = css`
    display: block;
    margin-left:50%;
   `;
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoidGFwMDIxMiIsImEiOiJjangxbjNwa3IwYW9zNDlxZnAzdHNpZGxoIn0.7jVwdPa1rMpYPrDMkdz0Pg"
});
export default class  Notification extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            longitude:null,
            latitude:null,
            markers:[],
            eventList:[],
            eventList5KM:null,
            eventList10KM:null,
            locationList:[],
            distance5:true,
            distance10:false,
            viewport:{
                center:[78.9629, 20.5937],
                zoom:[3],
                height:"100%",
                width:"100%"
            }

        }
        this.getLocation = this.getLocation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this);
    }

     distance(lat1, lon1, lat2, lon2) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
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

    async componentDidMount(){
        await this.getLocation();
        getEvents().then(list => {
            getAllLocations().then(locations => {
                this.setState({locationList:locations})
                list.map(listElement => {
                    locations.map(e => {
                        if(listElement._id === e.event){
                            const item  = [e.longitude, e.latitude]
                            this.setState({
                                markers:[...this.state.markers,item ]
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
                            else{
                                this.setState({
                                    eventList5KM:"",
                                    eventList10KM:""
                                })
                            }
                        }
                    })
                })
            })
        })



        
        
    }

    renderTile = () => {
        if(this.state.eventList5KM !== null){
            if(this.state.distance5){
                if(this.state.eventList5KM.length === 0){
                    return (
                        <div class="error">
                             <h3 style={{paddingLeft:"4%"}}>There are no Notifications around you</h3>
                            <h3 style={{paddingLeft:"4%"}}>Have you agreed to the location permission of the browser?</h3>
                        </div>
                     ) 
                }
                else{
                    return (
                        
                        this.state.eventList5KM.map(event => {
                            return (
                                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
        }

        if(this.state.eventList10KM !== null){
            if(this.state.distance10){
                if(this.state.eventList10KM.length === 0){
                    return (
                       <div>
                            <h3 style={{paddingLeft:"4%"}}>There are no Notifications around you</h3>
                            <h3 style={{paddingLeft:"4%"}}>Or try reloading and giving your exact location to the map</h3>
                       </div>
                    ) 
                }
                else{
                    return (
                        this.state.eventList10KM.map(event => {
                           return ( 
                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
        }

        else{
            
                return <PropagateLoader
                css={override}
                size={40}
                color={"#6C63FE"}
                loading={this.state.loading}
              />
            
        }
    }

    renderDistanceText = () => {
        if(this.state.distance5){
            return  <h3 style={{paddingLeft:"4%"}}>Here's a list of Notifications in a radius of 5 Km.</h3>
        }
        else{
            return <h3 style={{paddingLeft:"4%"}}>Here's a list of Notifications in a radius of 10 Km.</h3>
        }
    }
   
    render(){
    return (
        <div className="home-container" id="style-3">
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <h2>Notifications Around You</h2>
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
                      
                        <Grid container spacing={3}>
                        {
                            this.renderDistanceText()
                        }
                        <br/>
                        {   
                            this.renderTile()
                        }
                        </Grid>
                    
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                    <Map
                         className="map"
                        style="mapbox://styles/mapbox/dark-v9"
                        {...this.state.viewport}
                        onViewportChange={viewport => this.setState({viewport})}>

                    >   
                        {
                            this.state.markers.map(marker => {
                                return(
                                    <Marker coordinates={[marker[0], marker[1]]} anchor="bottom">
                                      <div className="mapMarkerStyle" />
                                    </Marker>
                                )
                            })
                        }
                    </Map>
                    </Grid>
                </Grid>
            </div>
                     
        </div>
    )
    }
}

