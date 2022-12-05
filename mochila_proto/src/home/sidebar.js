import React, { useState } from "react";
import {Box, Drawer, Toolbar, Divider, List, ListItemButton, Typography, ListItemText, Collapse} from '@mui/material'
import "./sidebar.css";

const drawerwidth = 220

                    // <h3>{key["table_name"]}</h3>
                    // <ul>
                    //     {key["col_descs"].map((values) => {
                    //         return(<li>{values["Field"]}</li>)
                    //     })}
                    // </ul>

function CollapseTable({values}) {
    const [open, setOpen] = useState(false);

    return(<div>
        <ListItemButton sx={{width:'100%', py:'0px'}} divider={true} onClick={_=>{setOpen(!open);}}>
            <ListItemText primary={<Typography color="#F3F4F8" sx={{fontSize:'1.2em',fontWeight:"bold"}}>
                {values["table_name"]}
            </Typography>}/>
        </ListItemButton>
        <Collapse in={open}><List sx={{width: '100%', pt:0}}>
            {values["col_descs"].map((col_desc) => {
                return(<div><Typography color="#E7E8EC" sx={{fontWeight:"normal", pl:'30px'}}>
                    {col_desc["Field"]}
                </Typography><Typography color="#D7D8DC" sx={{fontWeight:"lighter", pl:'45px', fontSize:'0.8em'}}>
                    Type: {col_desc["Type"]} Default: {col_desc["Default"]}
                </Typography></div>)
            })}
        </List></Collapse></div>)
}

function Sidebar({setIsloggedin, dbschema}) {
    return(<Box sx={{display:"flex", flexDirection:"column"}}>
        <Drawer sx={{flexShrink:0, width:drawerwidth}}
        PaperProps={{sx:{width: drawerwidth,
                        boxSizing: 'border-box', 
                        background:"#282A3A",
                        elevation: 10}}}
        variant="permanent"
        anchor="left">
            <Toolbar disableGutters={true} 
                    sx={{flexDirection:'column', justifyContent:'center', width:'100%'}}>
                <Typography variant="h4" color="#F3F4F8" sx={{m:'10px'}}>
                    Mochila
                </Typography>
                <Divider sx={{width:'100%', height:'2px', background:'white'}}/>
                <List sx={{width:'100%', overflow:'auto'}}>
                    {dbschema.map(values => {return(<CollapseTable values={values}/>)
                    })}
                </List>
            </Toolbar>
        </Drawer>
    </Box>)
}

export default Sidebar;