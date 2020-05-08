import React from 'react'
import {Link} from 'react-router-dom'
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';import './vNav.styles.scss'
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import PlusOneTwoToneIcon from '@material-ui/icons/PlusOneTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';
import EditLocationTwoToneIcon from '@material-ui/icons/EditLocationTwoTone';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
function VNav() {
    return (
        <div className="vNav-container">
            <h3 className="logo">
                NOTIFY
            </h3>
            <div className="link-container">
            <Link className="link" to='/'>
                <div className="tooltip">
                <AppsTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Home</span>
                </div>
            </Link>
            <Link className="link" to='/'>
                <div className="tooltip">
                <NotificationsNoneTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Notification</span>
                </div>
            </Link>
            <Link className="link" to='/add'>
                <div className="tooltip">
                <PlusOneTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Add</span>
                </div>
            </Link>
            <Link className="link" to='/'>
                <div className="tooltip">
                <FaceTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Profile</span>
                </div>
            </Link>
            <Link className="link" to='/'>
                <div className="tooltip">
                <EditLocationTwoToneIcon className="icon" style={{ fontSize: 35 }}/> 
                <span class="tooltiptext">Location</span>
                </div>
            </Link>
            <Link className="link" to='/'>
                <div className="tooltip">
                <InfoTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">About</span>
                </div>
            </Link>
            <Link className="link" to='/'>
                <div className="tooltip">
                <ExitToAppTwoToneIcon className="icon" style={{ fontSize: 35 }}/>
                <span class="tooltiptext">Logout</span>
                </div>
            </Link>
            </div>
        </div>
    )
}

export default VNav
