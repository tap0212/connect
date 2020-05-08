import React from 'react'
import Grid from '@material-ui/core/Grid';
import VNav from '../Navbar/verticalNav/vNav.component'
import { ReactBingmaps } from 'react-bingmaps';
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
                    <ReactBingmaps 
                        id = "one"
                        bingmapKey =  'ArzAufq-ny6rTgIo5CnHtOCDEQrlNRUmUulXgYQdr9DVwCnXgTOdX1SAUY6iejHO'
                        center = {[13.0827, 80.2707]}
                        zoom = {4}
                        className = "map"
                        > 
                    </ReactBingmaps>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
    }
}

