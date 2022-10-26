import React from 'react'
import './topbar.css'

function Topbar({callback}) {
    return(
        <div className='topbar'>
            <div className="title">Here Title</div>
            <button className="tab"
            onClick={() => callback(0)}>Exploration</button>
            <button className="tab"
            onClick={() => callback(1)}>History</button>
            <button className="tab"
            onClick={() => callback(1)}>SQL Terminal</button>

        </div>
    );
}

export default Topbar