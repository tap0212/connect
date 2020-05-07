import React, {useState} from 'react'
import VNav from '../../Navbar/verticalNav/vNav.component'
import {Link} from 'react-router-dom'
import './signup.style.scss'
import {signup} from '../../../APICalls/auth'
import { Grid } from '@material-ui/core'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import {ReactComponent as Avatar } from '../../../assets/avatar.svg'
import {ReactComponent as Connect} from '../../../assets/connect.svg'
function Signup() {
    const override = css`
     display: block;
     margin-left:50%;
    `;

    const [values, setValues] = useState({
        name: '', 
        email: "", 
        password:"", 
        error:"", 
        loading:false, 
        success:false
    });

    const {name, email, password, error, loading, success} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error:false, loading:true})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error,loading:false, success:false})
            }
            else{
                setValues({
                    ...values,
                    name:'',
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        })
        .catch(console.log("error in signup"))
    }

    const Flash = () => {
        if(error){
            return  <Alert severity="error"><span className="flash">{error}</span></Alert>
        }
        if(success===true){
            return  <Alert   severity="success"><span className="flash">Account Created <Link className="span" to="/login">Login Now</Link></span></Alert>
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

    return (
        <div className="signup">
            <VNav/>
            <div className="signup-container">
                <Grid container spacing={3}>
                   
                    <Grid item xs={12} sm={6}>
                        <div className="signup-box">
                             <div className="tab">
                                 <Link to='/login' className="link1">Login</Link>
                                 <Link to='/signup' className="link2">Signup</Link>
                             </div>
                             <div className="avatar-container">
                                 <Avatar className="avatar"/>
                             </div>
                             {Flash()}
                            <form className="form">
                                <div className="form-control">
                                    <input
                                    onChange={handleChange("name")}
                                    value={name}
                                    type="text"
                                    placeholder="Enter Name" 
                                    autoFocus 
                                    required
                                    className="input"/>
                                </div>
                                <div className="form-control">
                                    <input 
                                    onChange={handleChange("email")} 
                                    value={email} 
                                    type="email" 
                                    required
                                    placeholder="Enter Email"
                                    className="input"/>
                                </div>
                                <div className="form-control">
                                    <input 
                                    onChange={handleChange("password")} 
                                    value={password} 
                                    required
                                    type="password" 
                                    placeholder="Enter Password" 
                                    className="input"/>
                               </div>
                                <div className="note">
                                    <p>
                                    By signing up, I agree with the Terms and Privacy Policy of Connect.
                                    </p>
                                </div>
                                <button 
                                onClick={onSubmit}
                                className="button">Sign Up
                                </button>
                            </form>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="connect-container">
                            <Connect className="connect"/>
                        </div>
                    </Grid>
                    
                </Grid>
                </div>
        </div>
    )
}

export default Signup
