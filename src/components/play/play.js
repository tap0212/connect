import React, {Component} from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL , {GeolocateControl} from 'react-map-gl'

 
const mapAccess = {
    mapboxApiAccessToken: 'pk.eyJ1IjoidGFwMDIxMiIsImEiOiJjangxbjNwa3IwYW9zNDlxZnAzdHNpZGxoIn0.7jVwdPa1rMpYPrDMkdz0Pg'
}
 
const map_Style = {
    width: '100%',
    height: 600,
    
}

const geolocateStyle = {
    float: 'left',
    margin: '50px',
    padding: '10px'
  };
 
const queryParams = {
    country: 'in'
}
 
export default class Play extends React.Component {
    state = {
        viewport: {}
    }
 
    onSelected = (viewport, item) => {
        this.setState({viewport});
        console.log('Selected: ', item.geometry.coordinates[0])
    }
 
    render() {
        const {viewport} = this.state
 
        return (
            <div>
            {console.log(this.state.viewport)}
                <Geocoder
                className="add-input"
                    {...mapAccess} onSelected={this.onSelected} viewport={viewport} hideOnSelect={true}
                    queryParams={queryParams}
                />
 
                <ReactMapGL
                center={[29.4545,89.3242]}
                     mapStyle="mapbox://styles/mapbox/streets-v11"
                    {...mapAccess} {...viewport} {...map_Style}
                    onViewportChange={(newViewport) => this.setState({viewport: newViewport})}
                    
                >
                    <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
                </ReactMapGL>
            </div>
        )
    }
}