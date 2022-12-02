import React from 'react'
import Topbar from './topbar';
import Exploration from './exploration/exploration'
import './homepage.css'


function Homepage({setIsloggedin}) {
    const [page, setPage] = React.useState(0)

    function tab_render(val) {
        if(val === 0) {
            return(<Exploration></Exploration>)
        } else {return NaN;}}

    return (
        <div className="homepage">
            <Topbar callback={setPage} setIsloggedin={setIsloggedin}/>
            <div className="page">
                {tab_render(page)}
            </div>
        </div>
    );
}

export default Homepage;