import React from 'react'
import Topbar from './topbar';
import Exploration from './exploration/exploration'
import './homepage.css'

function tab_render(val) {
    if(val === 0) {
        return <Exploration></Exploration>
    } else {
        return NaN
    }
}

function Homepage({setIsloggedin}) {
    //top bar
    //side bar
    //focus graph
    //recommendations
    //filters
    const [page, setPage] = React.useState(0)
    return(
        <div className="homepage">
            <Topbar callback={setPage}></Topbar>
            <div className="page">
                {tab_render(page)}
            </div>
        </div>
    );
}

export default Homepage;