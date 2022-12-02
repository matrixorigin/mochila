import React from 'react';
import { send_credentials } from '../utils';
import './topbar.css';

function Topbar({callback, setIsloggedin}) {
    return(
        <div className='topbar'>
            <div className="title">Here Title</div>
            <button className="tab"
            onClick={() => callback(0)}>Exploration</button>
            <button className="tab"
            onClick={() => callback(1)}>History</button>
            <button className="tab"
            onClick={() => callback(1)}>SQL Terminal</button>
            <button className="tab" id="logout"
            onClick={(e) => {
                send_credentials(e, null, null, null, null).then(setIsloggedin(false));
            }}>Log Out</button>

        </div>
    );
}

export default Topbar;