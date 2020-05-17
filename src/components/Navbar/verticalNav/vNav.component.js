import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {isAuthenticated, signout } from '../../../APICalls/auth'
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';import './vNav.styles.scss'
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import PlusOneTwoToneIcon from '@material-ui/icons/PlusOneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
const currentTab = (history, path) => {
	if (history.location.pathname === path) {
	  return { color: "#2ecc72" };
	} else {
	  return { color: "#FFFFFF" };
	}
  };


const  VNav = ({history}) => {

    const Profile = () => {
        if(!isAuthenticated()){
            return <Link className="link" to='/signup' style={currentTab(history, "/signup")}>
            <div className="tooltip">
            <FaceTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
            <span class="tooltiptext">Profile</span>
            </div>
        </Link>
        }else{
            return <Link className="link" to='/profile' style={currentTab(history, "/signup")}>
            <div className="tooltip">
            <FaceTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
            <span class="tooltiptext">Profile</span>
            </div>
        </Link>
        }
    }

    return (
        <div className="vNav-container">
            <h3 className="logo">
                <Link className="home-link" to="/">NOTIFY</Link>
            </h3>
            <div className="link-container">
            <Link className="link" to='/' style={currentTab(history, "/")}>
                <div className="tooltip">
                <AppsTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Home</span>
                </div>
            </Link>
            <Link className="link" to='/notification' style={currentTab(history, "/notification")}>
                <div className="tooltip">
                <NotificationsNoneTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Notification</span>
                </div>
            </Link>
            <Link className="link" to='/add' style={currentTab(history, "/add")}>
                <div className="tooltip">
                <PlusOneTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Add</span>
                </div>
            </Link>
            {Profile()}
            {
                isAuthenticated() && 
                        (
                            <Link className="link"
                                onClick={() => {
                                    signout(() => {
                                        history.push("/")
                                    })
                                }}
                            >
                                <div className="tooltip">
                                <ExitToAppTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                                <span class="tooltiptext">Logout</span>
                                </div>
                            </Link>
                        )
            }

            
            </div>
        </div>
    )
}

export default withRouter(VNav)
