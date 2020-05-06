import React from 'react'
import {Link} from 'react-router-dom'
import './signup.style.scss'
import VNav from '../../Navbar/verticalNav/vNav.component'
function Signup() {
    return (
        <div className="signup">
            <VNav/>
            <div className="signup-container">
           <div className="signup-box">
           <div className="tabs">
                <span className="button">
                <Link to='/login'>Login</Link>
                </span>
                <span className="button">
                <Link to='/login'>Login</Link>
                </span>
            </div>
           </div>
        </div>
        </div>
    )
}

export default Signup
