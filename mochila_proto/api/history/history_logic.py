import api.utils.globals as globals

def initialize_hist_db():
    try:
        instr_set = [
            f"DROP DATABASE IF EXISTS {globals.history_db};",
            f"CREATE DATABASE {globals.history_db};",
            f"CREATE TABLE {globals.history_db}.querylog ( querystr VARCHAR(255), time DATETIME );"
        ]
        for instr in instr_set:
            run_query_commit(instr)
        return True
    except:
        print("history_logic.initialize_hist_db: ERROR")
        return False

def verify_hist_db():
    # try:
    if True:
        query_res = globals.run_query('SHOW DATABASES;')
        dbnames = [col["Databases"] for col in query_res]
        if globals.history_db in dbnames:
            return True
        return False
    # except:
    #     print("history_logic.verify_hist_db: ERROR")
    #     return None
    

def insert_entry(querystr):
    try:
        query = f"INSERT INTO {globals.history_db}.querylog VALUES ( '{querystr}', CURRENT_TIMESTAMP );"
        return run_query_commit(query)
    except:
        print("history_logic.insert_entry ERROR")

def run_select_filter(filterstr):
    try:
        ret = {"valid": False, "error": "", "data": None}
        split = filterstr.split(" ")
        query = f'''SELECT querystr, time from {globals.history_db}.querylog 
        WHERE querystr like {("%%".join(split))[1:-1]} COLLATE UTF8_GENERAL_CI
        ORDER BY time DESC LIMIT 100;'''
        res = globals.run_query(globals.querystr)
        if res is None:
            ret["valid"] = False
            ret["error"] = f"Query Failed. Query ran: \"{query}\""
        elif not res:
            ret["valid"] = False
            ret["error"] = f"No entries matched your query. Query ran: \"{query}\""
        else:
            ret["valid"] = True
            ret["data"] = res
            ret["colnames"] = list(res[0].keys())
        return ret
    except:
        print("history_logic.run_select_filter: ERROR")
        return None
        
