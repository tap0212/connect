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
            <div className="tab">
                <Link to='/login' className="link1">Login</Link>
                <Link to='/signup' className="link2">Signup</Link>
            </div>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name"/>
                </div>
            </form>
           </div>
        </div>
        </div>
    )
}

export default Signup
