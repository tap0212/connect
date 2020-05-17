import React from 'react'
import Geocoder from 'react-mapbox-gl-geocoder'

function Step3(props) {
        if (props.currentStep !== 3) {
            return null
          } 
          return(
            <React.Fragment>
            <div className="form-group">
            <h3 className="location-h1">Start typing your location and select</h3>
              <Geocoder
                  className="add-input"
                  {...props.mapAccess} 
                  onSelected={props.onSelected} 
                  viewport={props.viewport} 
                  hideOnSelect={true}
                  queryParams={props.queryParams}
                  />
                  
                    <button 
                    className="previous"
                    onClick={props.saveLocation}
                    >
                    Confirm Location</button>
                    
            </div>
            
            </React.Fragment>
          );
    
}

export default Step3
