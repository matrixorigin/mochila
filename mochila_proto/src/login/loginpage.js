import React, { useState } from "react";
import './loginpage.css'

function LoginPage({setIsloggedin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [wrongconn, setWrongconn] = useState(false);
    const [dblist, setDblist] = useState();

    function send_credentials(e) {
        e.preventDefault()
        const data = {"username": username, "password": password, "host": host, "port": port}
        fetch('http://127.0.0.1:5000/credentials', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((responsedata) => {
            console.log(responsedata);
            if(responsedata['status'] === 200) {
                setWrongconn(false);
                // get_dblist()
            } else {setWrongconn(true);}
        }).catch((err) => {console.log(err)})
    };

    function select_db(db) {
        const data = {"db": db};
        fetch('http://127.0.0.1:5000/databases', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if(response['statusCode'] === 200) {
                setIsloggedin(true)
            } else {
                console.log("select_db status != 200")
            }
        }).catch((err) => {console.log(err)})
    }

    function get_dblist() {
        fetch('http://127.0.0.1:5000/databases', {method: "GET"})
        .then((response) => {console.log(response)})
        .then((response) => {setDblist(response["results"])})
        .catch((err) => {console.log(err)})
    }

    function scrollmenu_toggle() {
        if(dblist) {
            return(<div className="dbscroll">
                    {dblist.map((db) => {
                        return(<button className="dbbutton" 
                        key={db}
                        onClick={select_db(db)}>{db}</button>)

                    })}
                </div>)
        } else {
            return(<div className="dbscroll">No Databases Found</div>)
        }
    }

    return(
        <div className="loginpage">
            {wrongconn && <div className="wrongconnbanner">
                Something went wrong with your connection. Please try again
            </div>}
            <form id="login-list" onSubmit={send_credentials}>
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
                <button type='submit' key="connectbutton">Connect</button>
            </form>
            {scrollmenu_toggle()}
        </div>
    )
};

export default LoginPage;