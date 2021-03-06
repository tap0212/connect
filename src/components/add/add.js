import React from 'react'
import Grid from '@material-ui/core/Grid';
import {getCategories, createEvent, createLocation} from './apicalls'
import VNav from '../Navbar/verticalNav/vNav.component'
import { css } from "@emotion/core";
import {Link} from 'react-router-dom'
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import ReactMapGL, {GeolocateControl} from 'react-map-gl'
import Lottie from 'react-lottie'
import animationData from './933-success.json'
import Step1 from './add-slide1'
import Step2 from './add2-slide'
import Step3 from './add3-slide'
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
            formData: "",
            viewport:{
                latitude:20.5937,
                longitude:78.9629,
                zoom:3.5,
                height:"100%",
                width:"100%"
            },
            currentStep:1,
            event: "",
            longitude:null,
            latitude:null,
            showForm:true,
            showSuccessMessage:false,
            isStopped:false,
            user:"",
            token:""
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

     async componentWillMount(){
     await  this.preload()
        // await isAuthenticated().then(res => console.log(res))
        const jwt = JSON.parse(localStorage.getItem("jwt"))
       this.setState({
          user:jwt.user,
          token:jwt.token
        })
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
        return ;
      }


       handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
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
        
          createEvent(this.state.user._id, this.state.token, this.state.formData).then(data => {
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
                    this.setState({showSuccessMessage:true, showForm:false, isStopped:true})
                    console.log(data)
                }
            }).catch(console.log("error in login"))
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
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
        <div className="add-container">
            <VNav/>
            
              <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div className="addEvent-container">
                        
                        {this.Flash()}
                        {this.state.showForm && 
                        <div>
                          <h1 className="add">Add Notification</h1>
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
                                user={this.state.user}
                                buttonText={"Create Notification"}
                            />
                            <Step3 
                                currentStep={this.state.currentStep} 
                                handleChange={this.handleChange}
                                saveLocation={this.saveLocation}
                                onSelected={this.onSelected}
                                viewport={viewport}
                                mapAccess={mapAccess}
                                queryParams={queryParams}
                               
                            />

                            <div className="nav">
                            {this.previousButton()}
                            {this.nextButton()}
                            </div>
                            </div>
                            </form>
                            </div>
                        }

                        {this.state.showSuccessMessage && 
                          <div className="animation-container">
                          <Lottie options={defaultOptions}
                              height={400}
                              width={400}
                              isStopped={this.state.isStopped}
                          />
                          <h1 className="notify-link">
                          <Link className="notify-link" to="/notification">Watch It Now</Link>
                          </h1>
                          </div>
                        }
                        </div>
                    </Grid>
                    <Grid className="map" item xs={12} sm={6}>
                      
                        <ReactMapGL
                        mapStyle="mapbox://styles/mapbox/dark-v9"
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
                       
                    </Grid>
                </Grid>
            </div>
            

            
        </div>
    )
    }
}

  

export default Add