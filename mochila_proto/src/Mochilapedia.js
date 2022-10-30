import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from "./home/homepage";
import LoginPage from "./login/loginpage";


function Mochilapedia() {
    const [isloggedin, setIsloggedin] = useState(false)
    const [isupdated, setIsupdated] = useState(false); //if isloggedin has been updated
    useEffect(() => {fetch_login_status();}, []);
    async function fetch_login_status() {
        const loginstatus = await fetch("http://127.0.0.1:5000/credentials", {method: "GET"})
        .then((response) => response.json()).then((response) => {
            if(response["loggedin"]) {return true;}
            return false;
        }).catch((err) => {console.log(`IsloggedIn ERROR: ${err}`)})
        if(!isupdated) {setIsupdated(true);}
        if(isloggedin !== loginstatus) {setIsloggedin(loginstatus); console.log("loginstatus " + isloggedin)}
    }
    const RequireAuth = () => {
        if(!isupdated) {return(<></>);}
        if(!isloggedin) {return(<Navigate to="/login"/>);}
        return(<Homepage fetch_login_status={fetch_login_status} isloggedin={isloggedin}/>);
    }

    return(<Routes>
        <Route exact path = "/" element={<Navigate to="/dashboard"/>}></Route>
        <Route exact path = "/dashboard/*" element={<RequireAuth/>}></Route>
        <Route exact path = "/login/*" element={<LoginPage fetch_login_status={fetch_login_status} isloggedin={isloggedin}/>}></Route>
    </Routes>);
}

export default Mochilapedia;