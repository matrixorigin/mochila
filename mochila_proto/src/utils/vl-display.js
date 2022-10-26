import React from "react";
import { VegaLite } from "react-vega";

function VL_Display({spec, data}) {
    return(
        <div className="vl-border">
            <VegaLite spec={spec} data={data} />
        </div>
    )
};

export default VL_Display