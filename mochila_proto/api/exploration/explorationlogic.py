import api.utils.globals as globals
import api.utils.gen_sql as gensql
import api.utils.gen_vgl as genvgl
import api.utils.tableformat as tableformat
import re
import pprint

def set_dbschema():
    globals.dbschema = []
    query_res = globals.run_query('show tables;')
    tablenames = [col[0] for col in query_res]
    for tablename in tablenames:
        table_cols = [col[0] for col in globals.run_query(f"describe {tablename};")]
        globals.dbschema.append((tablename, table_cols))
    return True

def init_exploration():
    globals.sqlfilters = {
        "select": None,
        "from": None,
        "where": None,
        "group_by": None,
        "having": None,
        "order_by": None,
        "limit": None,
        "offset": None
    } #init sqlfilters
    globals.vglfilters = {
        "mark": None,
    } #init vglfilters
    globals.mainview = {
        "valid": False,
        "Error": "none written",
        "colnames": None,
        "data": None
    } #init mainview

def set_filters(requestdata):
    try:
        sel = requestdata.get("select")
        if sel == "*":
            cols = globals.run_query(f"describe {requestdata.get('from')};")
            print("set_filters * detected")
            globals.sqlfilters["select"]= [col[0] for col in cols] #[colnames]
        else:
            globals.sqlfilters["select"] = re.split(" *, *", sel) #[colnames]
        globals.sqlfilters["from"] = requestdata.get("from") #tablename
        globals.sqlfilters["where"] = requestdata.get("where") #[[colname, exactlsql], ...]
        globals.sqlfilters["group_by"] = requestdata.get("group_by") #[colnames]
        globals.sqlfilters["having"] = requestdata.get("having") #[[colname, exactlsql], ...]
        globals.sqlfilters["order_by"] = requestdata.get("order_by") #[colnames]
        globals.sqlfilters["limit"] = requestdata.get("limit") #limit
        globals.sqlfilters["offset"] = requestdata.get("offset") #offset

        globals.vglfilters["mark"] = requestdata.get("mark") #marktype
        return True
    except:
        print("explorationlogic.set_filters: ERROR")
        return False

def run_select(): #convert filters into mainview
    try:
        query = gensql.gen_sql_string(globals.sqlfilters)
        res = globals.run_query(query)
        print("---run_select generated query---")
        print(query)
        print("--------------------------------")
        #Return error if query failed 
        if not res:
            globals.mainview["valid"] = False
            globals.mainview["error"] = f"Query Failed. Query ran: \"{query}\""
            return False
        #generate mainview and send to globals.mainview
        dataout = tableformat.create_data_list(globals.sqlfilters["select"], res)
        globals.mainview["valid"] = True
        globals.mainview["colnames"] = globals.sqlfilters["select"]
        globals.mainview["data"] = dataout
        return True
    except:
        print("explorationlogic run_select: ERROR")
        return False
