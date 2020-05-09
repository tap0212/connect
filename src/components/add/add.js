import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import {getCategories, createEvent} from './apicalls'
import {isAuthenticated} from '../../APICalls/auth'
import VNav from '../Navbar/verticalNav/vNav.component'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import { ReactBingmaps } from 'react-bingmaps';
import Geocode from "react-geocode";


import './add.scss'

 const  Add = ()  => {
    const override = css`
    display: block;
    margin-left:50%;
   `;
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name:"",
        title: "",
        description: "",
        link: "",
        expiry: "",
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
        formData: ""
      });

      const {
          name,
          title, 
          description,
          link,
          expiry,
          phone,
          venue,
          categories,
          category,
          loading,
          success,
          error,
          createdEvent,
          getaRedirect,
          formData
      } = values;

      const preload = () => {
          getCategories().then(data => {
              console.log(data)
              if(data.error){
                  setValues({...values, error:data.error})
              }else{
                  setValues({...values, categories:data, formData:new FormData()})
              }
          })
      }

    //   const getLocation = () => {
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(getCoordinates)
    //     }else{
    //         alert('No Location')
    //     }
    // }

    //  const getCoordinates = (position) => {
    //     setValues({
    //         ...values,
    //         latitude: position.coords.latitude,
    //         longitude:position.coords.longitude
    //     })
    // }
    // useEffect(() => {
    //     getLocation();
    // },[])

      useEffect(() => {
          preload();
      }, [])
      const onSubmit = event => {
          event.preventDefault();
          setValues({...values, error:"", loading:true});
          console.log(values)
          createEvent(user._id, token, formData).then(data => {
              console.log(formData)
              if(data.error){
                  setValues({...values, error:data.error, success:false})
              }else{
                  setValues({
                      ...values,
                      name:"",
                      title:"",
                      description:"",
                      link:"",
                      expiry:"",
                      phone:"",
                      venue:"",
                      photo:"",
                      loading:false,
                      success:true,
                      createdEvent:data.title
                  })
              }
          })
      }

      const handleChange = name => event => {
          const value = name == "photo" ? event.target.files[0] : event.target.value;
          formData.set(name, value);
          setValues({...values, [name]: value});
      }

      const Flash = () => {
        if(error){
            return  <Alert severity="error"><span className="flash">{error}</span></Alert>
        }
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

    //react-geoocode code goes here
    Geocode.setApiKey("AIzaSyArCZhn2XXJghIwEaliX1mkdn1ZC7ob9k4")
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromAddress("Eiffel Tower").then(
        response => {
            const {lat, lng} = response.results[0].geometry.location;
            console.log(lat,lng);
        },
        error => {
            console.log(error)
        }
    )

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
                                 <input
                                 onChange={handleChange("name")}
                                 name="name"
                                 value={name}
                                 className="add-input" 
                                 type="text"
                                 placeholder="Your Name"
                                 />
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
                                 onChange={handleChange("link")}
                                 name="link"
                                 value={link}
                                 className="add-input" 
                                 type="text"
                                 placeholder="Event Link (if any)"
                                 />
                                 <input
                                 onChange={handleChange("expiry")}
                                 name="expiry"
                                 value={expiry}
                                 className="add-input" 
                                 type="text"
                                 placeholder="Event Date (dd/mm/yy)"
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

export default Add