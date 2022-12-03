import React, { useState } from "react";
import "./filters.css"

function Filters({filters, setFilters, runselect }) {
    const [querystr, setQuerystr] = useState("")

    function handlesubmit(e) {
        e.preventDefault();
        var data = {"querystr": querystr};
        runselect(data);
    }

    function enterUpEvent(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }

    return(
        <div className="filters">
            <form onSubmit={handlesubmit}>
                <input id="mainsqlinput" value={querystr} 
                onChange={e => {setQuerystr(e.target.value)}}
                onkeyup={enterUpEvent}></input>
                <button type='submit' onClick={handlesubmit}>Run Query</button>
            </form>
        </div>
    )
}

export default Filters;