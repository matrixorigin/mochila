import React, { useState } from "react";
import {Box, Drawer, Toolbar, Divider, List, ListItem, Typography} from '@mui/material'
import "./sidebar.css";

                    // <h3>{key["table_name"]}</h3>
                    // <ul>
                    //     {key["col_descs"].map((values) => {
                    //         return(<li>{values["Field"]}</li>)
                    //     })}
                    // </ul>

function Sidebar({setIsloggedin, dbschema}) {
    return(<Box sx={{display:"flex"}}>
        <Drawer sx={{width: '10vw', flexShrink:0,
        ['& .MuiDrawer-paper']: {width: '10vw',boxSizing: 'border-box', background:"#282A3A"}}}
        variant="permanent"
        anchor="left">
            <Toolbar>
                <Typography variant="h4" align="center" color="#F3F4F8">
                    Mochila
                </Typography>
            </Toolbar>
        </Drawer>
    </Box>)
}

export default Sidebar;