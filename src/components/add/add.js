import React from 'react'
import Grid from '@material-ui/core/Grid';
import {Redirect} from 'react-router-dom'
import {getCategories, createEvent, createLocation} from './apicalls'
import {isAuthenticated} from '../../APICalls/auth'
import VNav from '../Navbar/verticalNav/vNav.component'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'


import './add.scss'
const override = css`
    display: block;
    margin-left:50%;
   `;
   const mapAccess = {
    mapboxApiAccessToken: 'pk.eyJ1IjoidGFwMDIxMiIsImEiOiJjangxbjNwa3IwYW9zNDlxZnAzdHNpZGxoIn0.7jVwdPa1rMpYPrDMkdz0Pg'
}

 
const queryParams = {
    country: 'in'
}

const geolocateStyle = {
    float: 'right',
    margin: '20px',
    marginTop:"60px",
    padding: '10px'
  };
   const {user, token} = isAuthenticated();
 class  Add extends React.Component {
    
   
   
    constructor(props) {
        super(props)
        this.state = {
            person:null,
            title: "",
            description: "",
            phone: "",
            venue:"",
            photo:"",
            categories: [],
            category: "",
            loading: false,
            success: false,
            error: "",
            getaRedirect: false,
            formData: "",
            viewport:{
                latitude:20.5937,
                longitude:78.9629,
                zoom:4.5,
                height:"100%",
                width:"100%"
            },
            currentStep:1,
            event: "",
            longitude:null,
            latitude:null
        }

        this.preload = this.preload.bind(this)
        this.onSelected = this.onSelected.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
   
    
      
    
   

     preload = () => {
        getCategories().then(data => {
            if(data.error){
                this.setState({ error:data.error})
            }else{
                this.setState({categories:data, formData:new FormData()})
            }
        })
    }

     componentDidMount(){
        this.preload()
        
     }

     _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep,
          success:false
        })
      }
        
      _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        this.setState({
          currentStep: currentStep
        })
      }

     

      previousButton() {
        let currentStep = this.state.currentStep;
        if(currentStep===2 && this.state.success===false){
          return (
            <button 
              className="previous" 
              type="button" onClick={this._prev}>
            Previous
            </button>
          )
        }
        if(currentStep===2 && this.state.success===true){
          return (
            <button 
              className="previousDisabled" 
              disabled
              type="button" onClick={this._prev}>
            Previous
            </button>
          )
        }
        return null;
      }
      
      nextButton(){
        let currentStep = this.state.currentStep;
        if(currentStep <2){
          return (
            <button 
              className="next" 
              type="button" onClick={this._next}>
            Next
            </button>        
          )
        }
        if(currentStep===2 && this.state.success===false){
          return (
            <button 
              className="nextDisabled"
              disabled 
              type="button" onClick={this._next}>
            Next
            </button>        
          )
        }
        if(currentStep===2 && this.state.success===true){
          return (
            <button 
              className="next"
              type="button" onClick={this._next}>
            Next
            </button>        
          )
        }
        return null;
      }


       handleChange = name => event => {
        const value = name == "photo" ? event.target.files[0] : event.target.value;
        this.state.formData.set(name, value);
        
        this.setState({ [name]: value});
    }

    onSelected = (viewport, item) => {
      this.setState({
        viewport:viewport,
        longitude:item.geometry.coordinates[0],
        latitude:item.geometry.coordinates[1]
      });
  }

       onSubmit = event => {
          event.preventDefault();
          
          this.setState({error:"", loading:true});
        
          createEvent(user._id, token, this.state.formData).then(data => {
              console.log(data)
              if(data.error){
                  this.setState({ error:data.error, success:false})
              }else{
                  this.setState({
                      person:null,
                      title:"",
                      description:"",
                      link:"",
                      expiry:"",
                      phone:"",
                      venue:"",
                      photo:"",
                      loading:false,
                      success:true,
                      event:data._id
                  })
              }
          })
      }

       saveLocation = event => {
        event.preventDefault()
        // setValues({...values, error:'', loading:true});
        createLocation({event:this.state.event, latitude:this.state.latitude, longitude:this.state.longitude})
            .then(data => {
                if(data.error){
                    // setValues({...values, error:data.error, loading:false})
                    console.log(data.error)
                }
                else{
                    this.setState({getaRedirect:true})
                    console.log(data)
                }
            }).catch(console.log("error in login"))
    }

    performRedirect = () => {
      if(this.state.getaRedirect){
              return <Redirect to='/notification'></Redirect> 
      }
  }
   

      Flash = () => {
        if(this.state.error){
          return  <Alert  severity="error"><span className="flash">{this.state.error}</span></Alert>
        }
        
        if(this.state.success===true){
            return  <Alert   severity="success"><span className="flash">Event Created Successfully
              <br/>Now Please click next and confirm your exact location
            </span></Alert>
        }
        if(this.state.loading === true){
            return <PropagateLoader
            css={override}
            size={25}
            color={"#6C63FE"}
            loading={this.state.loading}
          />
        }
    }
    render(){
    const {viewport} = this.state;
    
    return (
        <div className="add-container">
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div className="addEvent-container">
                        <h1 className="add">Add Notification</h1>
                        {this.Flash()}
                        <form onSubmit={this.onSubmit}>
                            <div className="form">
                            <Step1 
                                currentStep={this.state.currentStep} 
                                handleChange={this.handleChange}
                                title={this.state.title}
                                description={this.state.description}
                                venue={this.state.venue}
                                categories={this.state.categories}
                            />
                            <Step2 
                                currentStep={this.state.currentStep} 
                                handleChange={this.handleChange}
                                phone={this.state.phone}
                                photo={this.state.photo}
                            />
                            <Step3 
                                currentStep={this.state.currentStep} 
                                handleChange={this.handleChange}
                                saveLocation={this.saveLocation}
                                onSelected={this.onSelected}
                                viewport={viewport}
                                performRedirect={this.performRedirect}
                            />

                            <div className="nav">
                            {this.previousButton()}
                            {this.nextButton()}
                            </div>
                            </div>
                            </form>
                        </div>
                    </Grid>
                    <Grid className="map" item xs={12} sm={6}>
                        <React.Fragment className="map-container">
                        <ReactMapGL
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        className="map"
                        id="map"
                        {...mapAccess}
                        {...viewport}
                        onViewportChange={(newViewport) => 
                                this.setState({viewport:newViewport}) 
                            }
                        >
                            <GeolocateControl
                                style={geolocateStyle}
                                positionOptions={{enableHighAccuracy: true}}
                                trackUserLocation={true}
                            />
                        </ReactMapGL>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
    }
}

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="form-group">
        <input 
            onChange={props.handleChange("title")}
            name="title"
            value={props.title}
            className="add-input" 
            type="text"
            maxLength="40"
            placeholder="Event Title"
        />
        <textarea
            onChange={props.handleChange("description")}
            name="description"
            value={props.description}
            className="add-input"
            cols="30" 
            rows="5"
            maxLength="250"
            placeholder="Event Description"
        />
        <input
            onChange={props.handleChange("venue")}
            name="venue"
            value={props.venue}
            className="add-input" 
            type="text"
            maxLength="60"
            placeholder="Event Venue"
        />
        <select
        onChange={props.handleChange("category")}
        className="add-select"
        placeholder="Category"
        >
        <option>Choose Category</option>
        {props.categories &&
            props.categories.map((cate, index) => (
            <option key={index} value={cate._id}>
                {cate.name}
            </option>
            ))}
        </select>
      </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="form-group">
        <select
            onChange={props.handleChange("person")}
            className="add-select"
            placeholder="User Name"
            >
            <option>Confirm Name</option>
                <option  value={user._id}>
                    {user.name}
                </option>
        </select>
        <input
            onChange={props.handleChange("phone")}
            name="phone"
            value={props.phone}
            className="add-input" 
            type="tel"
            pattern="^\d{10}$"
            title="Enter a valid 10 digit Mobile Number"
            placeholder="Contact Number"
            maxLength="10"
        />
        
        <input
            onChange={props.handleChange("photo")}
            name="photo"
            accept="image"
            className="add-input" 
            type="file"
            placeholder="Choose an image (if any)"
        />
        <button
                type="submit"
                className="add-button"
            >
                Create Notification
            </button> 
      </div>
    );
  }
  
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
            {...mapAccess} 
            onSelected={props.onSelected} 
            viewport={props.viewport} 
            hideOnSelect={true}
            queryParams={queryParams}
            />
            
              <button 
              className="previous"
              onClick={props.saveLocation}
              >
              Confirm Location</button>
              {props.performRedirect()}
      </div>
      
      </React.Fragment>
    );
  }
  

export default Add