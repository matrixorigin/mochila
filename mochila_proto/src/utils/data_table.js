import React from "react";
import { Box } from "@mui/material";
import {DataGrid} from '@mui/x-data-grid'

function DataTable({ col_desc, table }) {
    return(<Box sx={{height: '90%', width: '95%'}}>
        <DataGrid
            sx={{backgroundColor:"#FFFFFF"}}
            columns={col_desc}
            rows={table}
            rowsPerPageOptions={[1,5,10,20,100]}
        />
    </Box>);
}

export {DataTable};