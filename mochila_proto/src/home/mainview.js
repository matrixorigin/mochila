import React, { useState } from "react";
import { DataTable } from "../utils";
import {Box, Toolbar, Tab, Tabs} from '@mui/material'
import "./mainview.css"

function MainTable({mainview}) {
    if(!mainview) {
        return(<div>
            No mainview. Please run a query.
        </div>);
    } else if(!mainview["valid"]) {
        return(<div>{mainview["error"]}</div>)
    } else if(mainview["valid"]) {
        const cols = mainview["colnames"].map((headerstr) => {return {
                "field": headerstr,
                "headername": headerstr,
                "flex": 1
            }})
        const rows = mainview["data"]
            for(let i = 0; i < rows.length; i++) {
                rows[i]["id"] = i;
            }
        return(<div>
            <DataTable col_desc={cols} table={rows}></DataTable>
        </div>)
    } else {
        return(<div>Something unaccounted for happened.</div>)
    }
}

function Mainview({ mainview }) {
    const [tabindx, setTabindx] = useState(0)
    function handletabchange(e, newval) {
        setTabindx(newval);
    }

    return(<Box sx={{height:'55%', display:'flex', flexDirection:'column'}}><Toolbar>
        <Tabs value={tabindx} onChange={handletabchange}>
            <Tab sx={{color:"#CCCCCC"}} label="Data Table"/>
            <Tab sx={{color:"#CCCCCC"}} label="Graph"/>
        </Tabs></Toolbar>
        <MainTable mainview={mainview}/>
    </Box>)
}

export default Mainview;