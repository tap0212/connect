import React from 'react'
import VNav from '../Navbar/verticalNav/vNav.component'
import './home.scss'
import { Grid } from '@material-ui/core'
import {ReactComponent as HomeSVG} from '../../assets/homeSVG.svg'
class Home extends React.Component {
constructor(props){
    super(props)
    this.state = ({
      latitude:null,
      longitude:null
    }) 
    // this.getLocation = this.getLocation.bind(this)
    // this.getCoordinates = this.getCoordinates.bind(this);
}   

        // getLocation(){
        //     if(navigator.geolocation){
        //         navigator.geolocation.getCurrentPosition(this.getCoordinates)
        //     }else{
        //         alert('No Location')
        //     }
        // }

        // getCoordinates(position){
        //     this.setState({
        //         latitude:position.coords.latitude,
        //         longitude:position.coords.longitude
        //     })
        // }

//    async componentWillMount(){
//      await   this.getLocation()
//         let latitude;
//         let longitude;
//      await   localStorage.setItem(latitude, this.state.latitude)
//        await localStorage.setItem(longitude, this.state.longitude)
//     }

    render() {
    return (
        <div className="home-container">
        {/* {console.log(localStorage.getItem('latitude'))}
        {console.log(localStorage.getItem('longitude'))} */}
            <VNav/>
            <div className="home">
                <Grid container spacing={1}>
                    <Grid className="grid-left" item xl={7} lg={7} md={7} sm={12} xs={12}>
                        <Grid container spacing={0}>
                            <Grid className="grid-right-top" item xl={12} lg={12} mg={12} sm={12} xs={12}>
                                <h1 className="home-hero-text">Connected with the world 24X7 <br/> But missing happenings in your Neighbourhood?</h1>
                            </Grid>

                            <Grid className="grid-right-bottom" item xl={12} lg={12} mg={12} sm={12} xs={12}>
                              <HomeSVG className="homeSVG"/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid className="grid-right" item xl={5} lg={5} md={5} sm={12} xs={12}>
                        <div className="grif-right-text">
                        <h1 className="grid-right-head">That's for what <span className="underline">Notify</span> is here for!</h1>
                        <h2 className="how">Notify gets you close to your neighbours</h2>
                        <ul className="hero-ul">
                            <li className="hero-li">Shows you all the notifications in a radius of 5/10 km from your current location</li>
                            <li className="hero-li">Filter out the events on the basis of multiple categories</li>
                            <li className="hero-li">Let's you create private Notification for any geographical area only</li>
                            <li className="hero-li">Shows all the events real time on the map</li>
                            <li className="hero-li">Notifications can be created by any individual/government/non-governmental groups or societies</li>
                            <li className="hero-li">Since each Notification is bound to a geographical area hence can only be seen by a person in a specific radius</li>
                        </ul>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
}
export default Home
