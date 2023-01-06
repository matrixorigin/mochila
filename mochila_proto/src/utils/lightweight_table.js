import React, {memo} from "react";
import { FixedSizeList } from "react-window";

const Row = memo(({data, index, style}) => {
    const rowdata = data[index];
    return(<div style={style}>
        <div>
            {data[index]["querystr"]}
        </div>
    </div>)
});

function LightList({data, height, width}) {
    return(<FixedSizeList
        className="Grid"
        itemCount={data.length}
        itemData={data}
        height={height}
        width={width}
        itemSize={40}>
            {Row}
    </FixedSizeList>)
}

export default LightList;