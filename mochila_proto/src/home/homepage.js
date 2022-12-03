import React, {useState, useEffect} from 'react'
import Topbar from './topbar';
import Sidebar from "./sidebar";
import Mainview from "./mainview";
import Filters from "./filters";
import Recommendations from "./recommendations";
import './homepage.css'


function Homepage({setIsloggedin}) {
    const [dbschema, setDbschema] = useState([])
    const [mainview, setMainView] = useState({});
    const [filters, setFilters] = useState({});
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => { //loads dbschema once on mount
        fetch('http://127.0.0.1:5000/main/exploration/sidebar', {method:'GET'})
        .then(response => response.json())
        .then(responsedata => {setDbschema(responsedata["data"]); console.log(responsedata)})
        .catch((err) => {console.log(`exploration.js fetch sidebar: ${err}`)})
    }, [])

    function run_select(data) {
        setFilters(data);
        fetch('http://127.0.0.1:5000/main/exploration/filters', {
            method:'POST', body:JSON.stringify(data)})
            .then(response => response.json()) .then(responsedata => {
                if(responsedata["valid"]) {
                    fetch('http://127.0.0.1:5000/main/exploration/mainview', {method:'GET'})
                    .then(response => response.json()).then(responsedata => {
                        setMainView(responsedata)
                    })
                    //fetch recommendations
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
                        <Filters filters={filters} setFilters={setFilters} runselect={run_select}></Filters>
                        <Recommendations recommendations={recommendations}></Recommendations>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;