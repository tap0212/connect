import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import {getCategories, createEvent} from './apicalls'
import {isAuthenticated} from '../../APICalls/auth'
import VNav from '../Navbar/verticalNav/vNav.component'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import { Icon} from 'leaflet'
import './add.scss'

 const  Add = ()  => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        title: "",
        description: "",
        link: "",
        expiry: "",
        phone: "",
        venue:"",
        longitude:"",
        latitude:"",
        photo:"",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdEvent: "",
        getaRedirect: false,
        formData: ""
      });

      const {
          title, 
          description,
          link,
          expiry,
          phone,
          venue,
          longitude,
          latitude,
          categories,
          category,
          loading,
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

      const getLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getCoordinates)
        }else{
            alert('No Location')
        }
    }

     const getCoordinates = (position) => {
        setValues({
            ...values,
            latitude: position.coords.latitude,
            longitude:position.coords.longitude
        })
    }
    useEffect(() => {
        getLocation();
    },[])

      useEffect(() => {
          preload();
      }, [])
      const onSubmit = event => {
          event.preventDefault();
          setValues({...values, error:"", loading:true});
          createEvent(user._id, token, formData).then(data => {
              console.log(data)
              if(data.error){
                  setValues({...values, error:data.error})
              }else{
                  setValues({
                      ...values,
                      title:"",
                      description:"",
                      link:"",
                      expiry:"",
                      phone:"",
                      venue:"",
                      photo:"",
                      loading:false,
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
      console.log(longitude, latitude)

    return (
        <div className="home-container">
        {console.log(longitude, latitude)}
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <div className="addEvent-container">
                        <h1 className="add">Add Notification</h1>
                        <form>
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
                                 
                                 name="longitude"
                                 value={longitude}
                                 className="add-input" 
                                 type="text"
                                 placeholder="Event Venue"
                                 />
                                   <input
                                 
                                 name="latitude"
                                 value={latitude}
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
                        <Map className="map"  center={[27.398634, 80.31691]} zoom={13}>
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

export default Add