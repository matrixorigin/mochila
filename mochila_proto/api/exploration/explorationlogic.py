import api.utils.globals as globals

def set_dbschema():
    globals.dbschema = []
    query_res = globals.run_query('SHOW TABLES;')
    tablenames = [col[f"tables_in_{globals.dbname}"] for col in query_res]
    for tablename in tablenames:
        col_descs = globals.run_query(f"describe {tablename};")
        globals.dbschema.append({"table_name": tablename, "col_descs": col_descs})
    return True

def init_exploration():
    globals.mainview = {
        "valid": False,
        "Error": "Error not initialized.",
        "data": None,
        "colnames": None
    } #init mainview

def set_filters(requestdata):
    try:
        globals.querystr = requestdata.get("querystr")
        return True
    except:
        print("explorationlogic.set_filters: ERROR")
        return False

def run_select(): #convert filters into mainview
    try:
        res = globals.run_query(globals.querystr)
        print("---run_select query---")
        print(globals.querystr)
        print("----------------------")
        #Return error if query failed 
        if res is None:
            globals.mainview["valid"] = False
            globals.mainview["error"] = f"Query Failed. Query ran: \"{globals.querystr}\""
            return False
        elif not res: #if empty, notify of no matches
            globals.mainvew["valid"] = False
            globals.mainview["error"] = f"No entries matched your query. Query ran: \"{globals.querystr}\""
        #generate mainview and send to globals.mainview
        globals.mainview["valid"] = True
        globals.mainview["data"] = res
        globals.mainview["colnames"] = list(res[0].keys())
        return True
    except:
        print("explorationlogic run_select: ERROR")
        return False
