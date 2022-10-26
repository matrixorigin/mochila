import React, { useState } from "react";
import "./sidebar.css";

function Sidebar() {
    const [dbstructure, Setdbstructure] = useState({"hello": ["a", "b", "c"], "world": ["d", "e", "f"]})
    return(
        <div className="sidebar">
            {Object.entries(dbstructure).map((key) => {
                return(
                    <div>
                    <h3>{key[0]}</h3>
                    <ul>
                        {key[1].map((values) => {
                            return(<li>{values}</li>)
                        })}
                    </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar;