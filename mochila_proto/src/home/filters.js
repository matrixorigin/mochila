import React, { useState } from "react";
import { ReactTerminal } from "react-terminal";
import {Box, Toolbar, Tab, Tabs} from '@mui/material'
import "./filters.css"

function TabPanel({value, index, primary}) {
    return(<div hidden={value !== index} id={`simple-tabpanel-${index}`}>
        {value === index && primary}
    </div>);
}

function Filters({ runselect}) {
    const [tabindx, setTabindx] = useState(0);

    function handlesubmit(...args) {
        var data = {"querystr": args.join(" ")};
        runselect(data)
    }

    function handletabchange(e, newval) {
        setTabindx(newval)
    }

    return(<Box sx={{width:'50%'}}><Toolbar disableGutters={true}>
                <Tabs value={tabindx} onChange={handletabchange}>
                <Tab sx={{color:"#CCCCCC"}} label="Terminal"/>
                <Tab sx={{color:"#CCCCCC"}} label="History"/>
                </Tabs></Toolbar>
                <TabPanel value={tabindx} index={0} primary={
                    <div style={{height: 'calc(37vh - 40px)', width:'calc(100% - 20px'}}>
                    <ReactTerminal showControlBar={false} showControlButtons={false} theme="material-dark"
                        defaultHandler={handlesubmit} commands={handlesubmit}/>
                    </div>
                }>
                </TabPanel>
                </Box>
    )
}


export default Filters;