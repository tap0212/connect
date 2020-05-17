import React from 'react'

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
  
export default Step1
