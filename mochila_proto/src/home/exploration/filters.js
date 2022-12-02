import React, { useState } from "react";
import { StringInput, ListInput, DualListInput, SubmitInput } from "../../utils";
import "./filters.css"

function Filters({filters, setFilters, runselect }) {
    const [select, setSelect] = useState("");
    const [from, setFrom] = useState("");
    const [where, setWhere] = useState([]);
    const [group_by, setGroup_by] = useState([]);
    const [having, setHaving] = useState([]);
    const [order_by, setOrder_by] = useState([]);
    const [limit, setLimit] = useState("");
    const [offset, setOffset] = useState("");
    const [mark, setMark] = useState("");

    function handlesubmit(e) {
        e.preventDefault();
        var data = {
            select: select,
            from: from,
            where: where,
            group_by: group_by,
            having: having,
            order_by: order_by,
            limit: limit,
            offset: offset,
            mark: mark
        };
        runselect(data);
    }

    return(
        <div className="filters">
            <form onSubmit={handlesubmit}>
                <StringInput title="FROM" callback={setFrom} placeholder={"Table Name"}/>
                <SubmitInput title="SELECT" callback={setSelect}/>
                <DualListInput title="WHERE" callback={setWhere}/>
                <ListInput title="GROUP BY" callback={setGroup_by} placeholder={"Column Name"}/>
                <DualListInput title="HAVING" callback={setHaving}/>
                <ListInput title="ORDER BY" callback={setOrder_by} placeholder={"Column Name"}/>
                <StringInput title="LIMIT" callback={setLimit} placeholder={"Integer Value"}/>
                <StringInput title="OFFSET" callback={setOffset} placeholder={"Integer Value"}/>
                <StringInput title="MARK" callback={setMark} placeholder={"point,bar,tick,"}/>
                <button type='submit'>Run Query</button>
            </form>
        </div>
    )
}

export default Filters;