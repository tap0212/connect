import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import {getCategories, createEvent} from './apicalls'
import {isAuthenticated} from '../../APICalls/auth'
import VNav from '../Navbar/verticalNav/vNav.component'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import Geocoder from 'react-mapbox-gl-geocoder'
import ReactMapGL, {GeolocateControl} from 'react-map-gl'


import './add.scss'

 const  Add = ()  => {
    const override = css`
    display: block;
    margin-left:50%;
   `;
   
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
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
        createdEvent: "",
        getaRedirect: false,
        longitude: null,
        latitude: null,
        formData: ""
      });

     
      const {
          person,
          title, 
          description,
          phone,
          venue,
          categories,
          category,
          loading,
          success,
          error,
          createdEvent,
          getaRedirect,
          longitude,
          latitude,
          formData
      } = values;
      const [mappingData, setMappingData] = useState({
          viewportt: {}
      })
      const {viewport} = mappingData;
      const onSelected = (viewport, item) => {
        setMappingData({
            viewport:viewport
        })
        console.log('Selected: ', item)
    }
   

    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({...values, categories:data, formData:new FormData()})
            }
        })
    }

      useEffect(() => {
          preload();
      }, [])


      const handleChange = name => event => {
        const value = name == "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        
        setValues({...values, [name]: value});
    }

      const onSubmit = event => {
          event.preventDefault();
          
          setValues({...values, error:"", loading:true});
          console.log(values)
          createEvent(user._id, token, formData).then(data => {
              console.log(data)
              if(data.error){
                  setValues({...values, error:data.error, success:false})
              }else{
                  setValues({
                      ...values,
                      person:null,
                      title:"",
                      description:"",
                      link:"",
                      expiry:"",
                      phone:"",
                      venue:"",
                      photo:"",
                      longitude:null,
                      latitude:null,
                      loading:false,
                      success:true,
                      createdEvent:data.title
                  })
              }
          })
      }

   

      const Flash = () => {
        
        if(success===true){
            return  <Alert   severity="success"><span className="flash">Event Created Successfully</span></Alert>
        }
        if(loading === true){
            return <PropagateLoader
            css={override}
            size={25}
            color={"#6C63FE"}
            loading={loading}
          />
        }
    }

    
    const mapAccess = {
        mapboxApiAccessToken: 'pk.eyJ1IjoidGFwMDIxMiIsImEiOiJjangxbjNwa3IwYW9zNDlxZnAzdHNpZGxoIn0.7jVwdPa1rMpYPrDMkdz0Pg'
    }
    const map_Style = {
        height: '100vh',
        
        width: '98%'
        
    }
     
    const queryParams = {
        country: 'in'
    }

    const geolocateStyle = {
        float: 'right',
        margin: '20px',
        padding: '10px'
      };
    return (
        <div className="add-container">
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div className="addEvent-container">
                        <h1 className="add">Add Notification</h1>
                        {Flash()}
                        <form>
                        <select
                                    onChange={handleChange("person")}
                                    className="add-select"
                                    placeholder="User Name"
                                    >
                                    <option>User Name</option>
                                    
                                        <option  value={user._id}>
                                            {user.name}
                                        </option>
                                    
                                </select>
                                <input 
                                 onChange={handleChange("title")}
                                 name="title"
                                 value={title}
                                 className="add-input" 
                                 type="text"
                                 placeholder="Event Title"
                                 />
                                 <textarea
                                  onChange={handleChange("description")}
                                  name="description"
                                  value={description}
                                  className="add-input"
                                  cols="30" 
                                  rows="5"
                                    placeholder="Event Description"
                                  />
                                  
                            
                                 <input
                                 onChange={handleChange("phone")}
                                 name="phone"
                                 value={phone}
                                 className="add-input" 
                                 type="number"
                                 placeholder="Phone Number"
                                 />
                                 <input
                                 onChange={handleChange("venue")}
                                 name="venue"
                                 value={venue}
                                 className="add-input" 
                                 type="text"
                                 placeholder="Event Venue"
                                 />

                    
                                 <input
                                 onChange={handleChange("photo")}
                                 name="photo"
                                 accept="image"
                                 className="add-input" 
                                 type="file"
                                 placeholder="Choose an image (if any)"
                                 />
                                <div className="select">
                                <select
                                    onChange={handleChange("category")}
                                    className="add-select"
                                    placeholder="Category"
                                    >
                                    <option>Choose Category</option>
                                    {categories &&
                                        categories.map((cate, index) => (
                                        <option key={index} value={cate._id}>
                                            {cate.name}
                                        </option>
                                        ))}
                                </select>
                                <Geocoder
                                className="add-input"
                                {...mapAccess} 
                                onSelected={onSelected} 
                                viewport={viewport} 
                                hideOnSelect={true}
                                queryParams={queryParams}
                                />
                                </div>
                                <button
                                    type="submit"
                                    onClick={onSubmit}
                                    className="add-button"
                                >
                                    Create Event
                                </button>
                        </form>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ReactMapGL
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        {...mapAccess}
                        {...viewport} {...map_Style}
                        onViewportChange={
                            (newViewport) => 
                                setMappingData({viewport: newViewport})}
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

export default Add