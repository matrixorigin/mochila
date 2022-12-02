import React, { useState } from "react";
import { ToggleButton } from '@mui/material'

function enterUpEvent(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
        event.target.blur();
    }
}
const input_container_style = {display:"flex", flexDirection:"row"};

function StringInput({title, callback,val="", ...props}) {
    const [value, setValue] = useState(val);

    function submit_list(e) {
        callback(value);
    }
    return(
    <div className="input-container" style={input_container_style}>
        <div className="filterinputtitle">{title}</div>
        <input className="inputinput" value={value} onChange={e => {setValue(e.target.value)}}
        onBlur={submit_list} onKeyUp={enterUpEvent} 
        {...props}/>
    </div>
);};

function ListInput({title, callback,val="", ...props}) {
    const [value, setValue] = useState(val);

    function submit_list(e) {
        if(value) {
            callback([value]);
        } else {
            callback(null)
        }
    }
    return(
    <div className="input-container"style={input_container_style}>
        <div className="filterinputtitle">{title}</div>
        <input className="inputinput" value={value} onChange={e => {setValue(e.target.value)}}
        onBlur={submit_list} onKeyUp={enterUpEvent} 
        {...props}/>
    </div>
);};

function DualListInput({title, callback, values=["", ""], ...props}) {
    const [inputone, setInputone] = useState(values[0]);
    const [inputtwo, setInputtwo] = useState(values[1]);

    function submit_dual(e) {
        if(inputone && inputtwo) {
            callback([[inputone, inputtwo]]);
        } else {
            callback([])
        }
    }
    return(
    <div className="input-container" style={input_container_style}>
        <div className="filterinputtitle">{title}</div>
        <input className="inputinput" value={inputone} onChange={e => {setInputone(e.target.value)}}
        onBlur={submit_dual} onKeyUp={enterUpEvent} {...props}/>
        <input className="inputinput" value={inputtwo} onChange={e => {setInputtwo(e.target.value)}}
        onBlur={submit_dual} onKeyUp={enterUpEvent} {...props}/>
    </div>
)};

function SubmitInput({title, callback, values="", ...props}) {
    const [input, setInput] = useState(values);

    return(
    <div className="input-container" style={input_container_style}>
        <div className="filterinputtitle">{title}</div>
        <input className="inputinput" value={input} onChange={e => {setInput(e.target.value)}}
        onBlur={_ => {callback(input);}} onKeyUp={enterUpEvent} {...props}/>
    </div>
)};
export {StringInput, ListInput, DualListInput, SubmitInput};