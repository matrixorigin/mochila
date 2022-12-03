import React from 'react';
import { send_credentials } from '../utils';
import {Box, AppBar, Toolbar, Typography} from '@mui/material'
import './topbar.css';

function Topbar({setIsloggedin}) {

            // onClick={e => {
            //     send_credentials(e, null, null, null, null)
            //     .then(setIsloggedin(false));
            // }}>Disconnect</button>
    return(
        <Box sx={{height:'7vh'}}>
            <AppBar position='static' style={{background:"purple"}}>
                <Toolbar variant="regular">
                    <Typography variant="h4" color="inherit" component="div">
                        Mochila
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Topbar;