import React, {useState} from "react";
import { VL_Display } from "../utils";
import "./recommendations.css"

function Recommendations() {
    const [graphs, setGraphs] = useState(["hello", "world"]);
    const spec = {
        width: 400,
        height: 200,
        "mark": 'line',
        "encoding": {
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

    return(
      <div className="recommendations">
      </div>
    );
};

export default Recommendations;