import React from 'react'
import Grid from '@material-ui/core/Grid';
import VNav from '../Navbar/verticalNav/vNav.component'
import {getEvents} from '../add/apicalls'
import { ReactBingmaps } from 'react-bingmaps';
import EventTile from './event-tile/event-tile'
import './home.styles.scss'
export default class  Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            longitude:null,
            latitude:null,
            infoboxesWithPushPins:[],
            eventList:[]

        }
        this.getLocation = this.getLocation.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this);
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
        getEvents().then(list => this.setState({
            eventList: list
        }))
        getEvents().then(Events => {
            Events.map(e => {
                let title = e.title;
                let lat = e.latitude;
                let long = e.longitude
                
                this.state.infoboxesWithPushPins.push({
                    "location":[lat, long],
                    "addHandler":"click",
                    "infoboxOption": { title: title, description: 'Infobox' },
                    "pushPinOption":{ title: title, description: 'Pushpin' },
                    "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
                    "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
                })
            })
        })
    }

   
    render(){
        
    return (
        <div className="home-container">
            <VNav/>
            {console.log(this.state.latitude, this.state.longitude)}
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <h1>Notifications Around You</h1>
                        
                        <div>
                        {this.state.eventList.map(event => {
                            return <EventTile event={event}/>
                        })
                        }
                        </div>
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                    <ReactBingmaps 
                        bingmapKey =  'ArzAufq-ny6rTgIo5CnHtOCDEQrlNRUmUulXgYQdr9DVwCnXgTOdX1SAUY6iejHO'
                        center = {[this.state.latitude,this.state.longitude]}
                        zoom = {14}
                        className = "map"
                        infoboxesWithPushPins = {this.state.infoboxesWithPushPins}
                        > 
                    </ReactBingmaps>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
    }
}

