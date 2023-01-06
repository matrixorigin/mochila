import React, {useState, useEffect} from 'react'
import Sidebar from "./sidebar";
import Mainview from "./mainview";
import Filters from "./filters";
import Recommendations from "./recommendations";
import { verify_db } from '../utils';
import './homepage.css'

const backend = process.env.REACT_APP_BACKEND;


function Homepage({setIsloggedin}) {
    const [dbschema, setDbschema] = useState([]);
    const [mainview, setMainView] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => { //loads dbschema once on mount
        fetch(`${backend}:5000/main/exploration/sidebar`, {method:'GET'})
        .then(response => response.json())
        .then(responsedata => {
            setDbschema(responsedata["data"]); 
            console.log(responsedata);})
        .catch((err) => {console.log(`exploration.js fetch sidebar: ${err}`)})
        // const verify_hist = async () => {
        //     verify_db();
        // }
        // verify_hist()
    }, [])

    async function run_select(data) {
        fetch( `${backend}:5000/main/exploration/filters`, {
            method:'POST', body:JSON.stringify(data)})
            .then(response => response.json()).then(responsedata => {
                if(responsedata["valid"]) {
                    //fetch mainview update
                    fetch(`${backend}:5000/main/exploration/mainview`, {method:'GET'})
                    .then(response => response.json()).then(responsedata => {
                        setMainView(responsedata);
                        return responsedata["error"];
                    })
                }
            })
    }

    return (
        <div className="homepage">
            <div className="exploration">
                <Sidebar dbschema={dbschema} setIsloggedin={setIsloggedin}></Sidebar>
                <div className="topbottomstack">
                    <Mainview mainview={mainview}></Mainview>
                    <div className="bottom_row">
                        <Filters runselect={run_select}></Filters>
                        <Recommendations recommendations={recommendations}></Recommendations>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;