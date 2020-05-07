import React from 'react'
import Grid from '@material-ui/core/Grid';
import VNav from '../Navbar/verticalNav/vNav.component'
import './home.styles.scss'
function Home() {
    return (
        <div className="home-container">
            <VNav/>
            <div className="home-content-container">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default Home
