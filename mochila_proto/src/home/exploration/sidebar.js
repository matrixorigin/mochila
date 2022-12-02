import React, { useState } from "react";
import "./sidebar.css";

function Sidebar({dbschema}) {
    return(
        <div className="sidebar">
            {dbschema && dbschema.map(key => {
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