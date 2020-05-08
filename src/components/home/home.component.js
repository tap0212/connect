import React from 'react'
import Grid from '@material-ui/core/Grid';
import VNav from '../Navbar/verticalNav/vNav.component'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import { Icon} from 'leaflet'
import './home.styles.scss'

export default class  Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            position:[]
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
            position: [...this.state.position, position.coords.latitude, position.coords.longitude]
        })
    }

    componentWillMount(){
        this.getLocation()
    }
    render(){
        
    return (
        <div className="home-container">
        {console.log(this.state.position)}
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <h1>Notifications Around You</h1>
                    </Grid>
                    <Grid  item xs={12} sm={6}>
                        <Map className='map' center={[27.398634, 80.31691]} zoom={13}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        </Map>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
    }
}

