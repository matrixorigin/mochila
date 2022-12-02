#ASSUME given X and Y values to plot, mark type, data types
#GENERATE VEGA spec (spec, data)
#width, height to be added in on front-end

def generate_vgl(x: dict, y: dict, mark: str) -> dict:
    ### x and y format:
    ### {name: xname, values: [xvalues], type: type}
    ret = {"spec": {}, "data": {}}
    ret["data"] = create_data_dict(x, y)
    ret["spec"]["mark"] = mark
    ret["spec"]["encoding"] = {"x": {}, "y": {}}
    ret["spec"]["encoding"]["x"]["field"] = x["name"]
    ret["spec"]["encoding"]["y"]["field"] = y["name"]
    ret["spec"]["encoding"]["x"]["type"] = x["type"]
    ret["spec"]["encoding"]["y"]["type"] = y["type"]
    ret["spec"]["data"] = {"name": "table"}
    return ret

def create_data_dict(x: dict, y: dict) -> dict:
    ### Generates data dict with format {table: [{x: xname0, y: yvalue0} ...]}
    ret = {"table": []}
    for index in range(len(x["values"])):
        ret["table"].append({x["name"]: x["values"][index], y["name"] : y["values"][index]})
    return ret

# testx = {"name": "xlol", "values":["A", "B", "C"], "type":"nominal"}
# testy = {"name": "ylol", "values":[10, 20, 30], "type":"quantitative"}
# mark = "bar"