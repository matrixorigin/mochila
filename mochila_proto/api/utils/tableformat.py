from datetime import datetime, date

def create_data_list(selectlist, values):
    tablelist = []
    for row in values:
        temp = {}
        for index in range(len(selectlist)):
            temp[selectlist[index]] = json_seralize(row[index])
        tablelist.append(temp) 
    return tablelist

def json_seralize(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    return obj