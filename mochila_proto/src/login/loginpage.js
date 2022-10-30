import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { send_credentials } from "../utils";
import './loginpage.css'

function LoginPage({ fetch_login_status, isloggedin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [wrongconn, setWrongconn] = useState(false);
    const [dblist, setDblist] = useState();

    function select_db(e) {
        var data = {"dbname ": e.target.id};
        fetch('http://127.0.0.1:5000/databases', {
            method: "POST",
            body: JSON.stringify(data)
        }).then((response) => {
            if(response['status'] === 200) {
                console.log("select_db selected valid db");
                fetch_login_status();
            } else {
                console.log("select_db status != 200")
            }
        }).catch((err) => {console.log(err)})
    }

    function get_dblist() {
        fetch('http://127.0.0.1:5000/databases', {method: "GET"})
        .then((response) => response.json())
        .then((responsedata) => {setDblist(responsedata["results"])})
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
                Something went wrong with your connection. Please try again
            </div>}
            <form id="login-list" onSubmit={(e) => {
                const status = send_credentials(e, host, port, username, password);
                console.log(status)
                if(status) {get_dblist(); setWrongconn(false)}
                else{setWrongconn(true)}
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