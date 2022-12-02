import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from "./home/homepage";
import LoginPage from "./login/loginpage";
import { fetch_login_status } from "./utils";

function Mochilapedia() {
    const [isloggedin, setIsloggedin] = useState(false)
    const [isupdated, setIsupdated] = useState(false); //if isloggedin has been updated
    useEffect(() => {
        async function logineffectwrapper() {
            const loginstatus = await fetch_login_status();
            if(!isupdated) {setIsupdated(true);}
            if(isloggedin !== loginstatus) {setIsloggedin(loginstatus);}
        }
        logineffectwrapper();
    }, [isloggedin, isupdated]);

    const RequireAuth = () => { //checks isloggedin for Homepage
        if(!isupdated) {return(<></>);}
        if(!isloggedin) {return(<Navigate to="/login"/>);}
        return(<Homepage setIsloggedin={setIsloggedin}/>);
    }

    return(<Routes>
        <Route exact path = "/" element={<Navigate to="/dashboard"/>}></Route>
        <Route exact path = "/dashboard/*" element={<RequireAuth/>}></Route>
        <Route exact path = "/login/*" element={<LoginPage isloggedin={isloggedin} setIsLoggedin={setIsloggedin}/>}></Route>
    </Routes>);
}

export default Mochilapedia;