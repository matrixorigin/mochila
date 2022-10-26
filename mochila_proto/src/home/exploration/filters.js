import React, { useState } from "react";
import { FilterInput } from "../../utils";
import "./filters.css"

function Filters() {
    const filterstates = {
        bar: false
        
    };
    console.log(filterstates)
    function modifyfilter(changeitem, changeto) {
        filterstates[changeitem] = changeto;
    }
    return(
        <div className="filters">
            <FilterInput title={"test title"} callback={modifyfilter("bar", true)}></FilterInput>
            <FilterInput title={"test title"}></FilterInput>
            
        </div>
    )
}

export default Filters;