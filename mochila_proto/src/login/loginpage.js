import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { send_credentials } from "../utils";
import './loginpage.css'

function LoginPage({isloggedin, setIsLoggedin}) {
    const [username, setUsername] = useState('dump');
    const [password, setPassword] = useState('111');
    const [host, setHost] = useState('127.0.0.1');
    const [port, setPort] = useState('6001');
    const [wrongconn, setWrongconn] = useState("");
    const [dblist, setDblist] = useState();

    async function select_db(e) {
        var data = {"dbname": e.target.id};
        fetch('http://127.0.0.1:5000/auth/db', {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then((responsedata) => {
            if(responsedata["valid"]) {
                setIsLoggedin(true); //transition trigger to main
                setWrongconn("");
            } else {setWrongconn("Unable to establish connection to specified database");}
        }).catch((err) => {console.log(err)})
    }

    function get_dblist() {
        fetch('http://127.0.0.1:5000/auth/db', {method: "GET"})
        .then((response) => response.json())
        .then((responsedata) => {setDblist(responsedata["data"])})
        .catch((err) => {console.log(err)})
    }

    function scrollmenu_toggle() {
        if(dblist) {
            return(<div className="dbscroll">
                    {dblist.map((db) => {
                        return(<button className="dbbutton" 
                        key={db} id={db}
                        onClick={select_db}>{db}</button>)
                    })}
                </div>)
        } else {return(<div className="dbscroll">No Databases Found</div>)}
    }

    return isloggedin ? (<Navigate to='/dashboard'/>) : (<div className="loginpage">
            {wrongconn && <div className="wrongconnbanner">
                {wrongconn}
            </div>}
            <form id="login-list" onSubmit={async (e) => {
                const status = await send_credentials(e, host, port, username, password);
                if(status) {get_dblist(); setWrongconn("");}
                else{setWrongconn("Invalid. Please check host, port, username, password")}
                }}>
                <label id="host" htmlFor="host">Host</label>
                <input 
                    type='text' 
                    id="host"
                    value={host}
                    onChange={e => setHost(e.target.value)}
                    ></input>
                <label id= "port" htmlFor="port">Port</label>
                <input 
                    type='text' 
                    id="port"
                    value={port}
                    onChange={e => setPort(e.target.value)}
                    ></input>
                <label id="username" htmlFor="username">Username</label>
                <input 
                    type='text' 
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    ></input>
                <label id="password" htmlFor="password">Password</label>
                <input 
                    type="text"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    ></input>
                <button type='submit' key="connectbutton">Connect</button>
            </form>
            {scrollmenu_toggle()}
        </div>
       );
}

export default LoginPage;