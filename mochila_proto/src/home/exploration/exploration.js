import React from "react";
import Sidebar from "./sidebar";
import "./exploration.css"
import Mainview from "./mainview";
import Filters from "./filters";
import Recommendations from "./recommendations";

function Exploration() {
    return(
        <div className="exploration">
            <Sidebar></Sidebar>
            <div className="views">
                <Mainview></Mainview>
                <div className="bottom_row">
                    <Filters></Filters>
                    <Recommendations></Recommendations>
                </div>
            </div>
        </div>
    )
}

export default Exploration;