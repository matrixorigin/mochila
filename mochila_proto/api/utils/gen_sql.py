#GIVEN SPECS
#assume single table
#given arguments
#SELECT: [colname, ...]
#FROM: tablename
#WHERE: [(colname, "exact_sql"), ...]
#GROUP_BY: [colname, ...]
#HAVING: [(colname, "exact_sql")...]
#ORDER BY: [colname, ...]

#Outputs:

#X: {"name": colname, "values": [list of values]}
#Y: {"name": colname, "values": [list of values]}
def gen_sql_string(filters):
    query = "SELECT "
    if filters["select"]:
        query += ", ".join(filters["select"])
    if filters["from"]:
        query += f" FROM {filters['from']}"
    if filters["where"]:
        query += " WHERE "
        temp = []
        for cols in filters["where"]:
            temp.append(f"{cols[0]} {cols[1]}")
        query += ", ".join(temp)
    if filters["group_by"]:
        query += " GROUP BY "
        query += ", ".join(filters["group_by"])
    if filters["having"]:
        query += " HAVING "
        temp = []
        for cols in filters["HAVING"]:
            temp.append(f"{cols[0]} {cols[1]}")
        query += ", ".join(temp)
    if filters["order_by"]:
        query += " ORDER BY "
        query += ", ".join(filters["order_by"])
    if filters["limit"]:
        query += f" LIMIT {filters['limit']}"
    if filters["offset"]:
        query += f" OFFSET {filters['offset']}"
    query += ";"
    return query