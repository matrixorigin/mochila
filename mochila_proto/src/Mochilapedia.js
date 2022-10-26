import React, { useEffect, useState } from "react";
import { Routes, Route, } from 'react-router-dom';
import Homepage from "./home/homepage";
import LoginPage from "./login/loginpage";

function Mochilapedia() {
    const [isloggedin, setIsloggedin] = useState(false);
    
    useEffect(() => { //checks if db, host, port, username, password are selected only on mount
        fetch("https:127.0.0.1:5000/credentials", {method: "GET"})
        .then((response) => response.json())
        .then((response) => {
            if(response["loggedin"]) {
                setIsloggedin(true);
            } else {
                setIsloggedin(false);
            }
        })
        .catch((err) => {console.log(`IsloggedIn ERROR: ${err}`)})
    })

    return(<Routes>
        <Route exact path = "/" element={<Homepage isloggedin={isloggedin}/>}></Route>
        <Route exact path = "/login" element={<LoginPage isloggedin={isloggedin}/>}></Route>
    </Routes>)
}

export default Mochilapedia;