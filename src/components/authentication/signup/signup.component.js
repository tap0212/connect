import React, {useState} from 'react'
import VNav from '../../Navbar/verticalNav/vNav.component'
import {Link} from 'react-router-dom'
import './signup.style.scss'
import {signup} from '../../../APICalls/auth'
import { Grid } from '@material-ui/core'
import {ReactComponent as Avatar } from '../../../assets/avatar.svg'
import {ReactComponent as Connect} from '../../../assets/connect.svg'
function Signup() {

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
                             {/* <div className="avatar-container">
                                 <Avatar className="avatar"/>
                             </div> */}
                            <form className="form">
                                <div className="form-control">
                                    <input
                                    onChange={handleChange("name")}
                                    value={name}
                                    type="text"
                                    placeholder="Enter Name" 
                                    autoFocus 
                                    className="input"/>
                                </div>
                                <div className="form-control">
                                    <input 
                                    onChange={handleChange("email")} 
                                    value={email} 
                                    type="email" 
                                    placeholder="Enter Email"
                                    className="input"/>
                                </div>
                                <div className="form-control">
                                    <input 
                                    onChange={handleChange("password")} 
                                    value={password} 
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
