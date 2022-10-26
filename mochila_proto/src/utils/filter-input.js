import React from "react";

function FilterInput({title, callback}) {
    function enterUpEvent(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }
return(
    <div className="input-container">
        <div className="filterinputtitle">{title}</div>
        <input className="inputinput" onBlur={callback} onKeyUp={enterUpEvent}/>
    </div>
)
};

export default FilterInput;