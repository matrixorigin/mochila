import React, {useState, useEffect} from "react";
import { VL_Display } from "../../utils";
import "./recommendations.css"

function Recommendations() {
    const [graphs, setGraphs] = useState(["hello", "world"]);
    const spec = {
        width: 400,
        height: 200,
        mark: 'bar',
        encoding: {
          x: { field: 'a', type: 'ordinal' },
          y: { field: 'b', type: 'quantitative' },
        },
        data: { name: 'table' } // note: vega-lite data attribute is a plain object instead of an array
      };
    const data = {
    table: [
    { a: 'A', b: 28 },
    { a: 'B', b: 55 },
    { a: 'C', b: 43 },
    { a: 'D', b: 91 },
    { a: 'E', b: 81 },
    { a: 'F', b: 53 },
    { a: 'G', b: 19 },
    { a: 'H', b: 87 },
    { a: 'I', b: 52 },
    ],
    };
    function getData() {
        fetch('http://127.0.0.1:5000/testone', {method: "GET"})
        .then((response) => response.json())
        .then((data) => {
            //setGraphs(graphs => [...graphs, data]);
            console.log(data)
        }).catch((err) => {console.log(err)});
    };
    getData();
    return(
        <div className="recommendations">
            <VL_Display spec={spec} data={data} />
        </div>
    );
};

export default Recommendations;