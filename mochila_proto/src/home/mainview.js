import React from "react";
import { DataTable } from "../utils";
import "./mainview.css"

function Mainview({ mainview }) {
    //mainview = {"valid": bool, "error": str, "dtables"}
    if(!mainview) {
        return(<div className="mainview">
            No mainview. Please run a query.
        </div>);
    } else if(!mainview["valid"]) {
        return(<div className="mainview">{mainview["error"]}</div>)
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
        return(<div className="mainview">
            <DataTable col_desc={cols} table={rows}></DataTable>
        </div>)
    } else {
        return(<div className="mainview">Something unaccounted for happened.</div>)
    }
}

export default Mainview;