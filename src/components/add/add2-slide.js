import React from 'react'

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
                <option  value={props.user._id}>
                    {props.user.name}
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
        <button
                type="submit"
                className="add-button"
            >
                Create Notification
            </button> 
      </div>
    );
  }
export default Step2
