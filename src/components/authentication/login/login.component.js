import React, {useState} from 'react'
import VNav from '../../Navbar/verticalNav/vNav.component'
import {Redirect} from 'react-router-dom'
import './login.styles.scss'
import {signin, authenticate} from '../../../APICalls/auth'
import { Grid } from '@material-ui/core'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import {ReactComponent as Avatar } from '../../../assets/avatar.svg'
import {ReactComponent as Connect} from '../../../assets/auth.svg'
function Login() {
    const override = css`
     display: block;
     margin-left:50%;
    `;

    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        didRedirect:false
    })
    const {email, password, error, loading,didRedirect} = values;



    const handleChange = name => event => {
        setValues({...values,error:false, [name]: event.target.value})
    }


    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error:'', loading:true});
        signin({email,password})
            .then(data => {
                if(data.error){
                    setValues({...values, error:data.error, loading:false})
                }
                else{
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            }).catch(console.log("error in login"))
    }

    const performRedirect = () => {
        if(didRedirect){
                return <Redirect to='/notification'></Redirect> 
        }
    }

    const Flash = () => {
        if(error){
            return  <Alert  severity="error"><span className="flash">{error}</span></Alert>
        }
        if(loading === true){
            return <PropagateLoader
            css={override}
            size={22}
            color={"#66FCF1"}
            loading={loading}
          />
        }
    }


    return (
        <div className="login">
            <VNav/>
            <div className="login-container">
                <Grid container spacing={3}>
                   
                    <Grid item xs={12} sm={6}>
                        <div className="login-box">
                             
                             <div className="avatar-container">
                                 <Avatar className="avatar"/>
                             </div>
                             {Flash()}
                            <form className="form">
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
                               
                                <button 
                                onClick={onSubmit}
                                className="login-button">Log In
                                </button>
                            </form>
                            {performRedirect()}
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

export default Login
