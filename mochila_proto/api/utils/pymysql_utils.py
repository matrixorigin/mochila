import pymysql
from utils.sqlite_utils import get_entries

def run_query_noncommit(query):
    try:
        dbret = get_entries()
        host = dbret['host']
        port = dbret['port']
        username = dbret['username']
        password = dbret['password']
        dbname = dbret['dbname']
        connection = pymysql.connect(user=username, password=password, host=host, port=port, database=dbname)
        cursor = connection.cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        return res
    except:
        print("run_query_noncommit error")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def run_get_dblist():
    try:
        dbret = get_entries()
        host = dbret['host']
        port = dbret['port']
        username = dbret['username']
        password = dbret['password']
        connection = pymysql.connect(user=username, password=password, host=host, port=port)
        cursor = connection.cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        return res
    except:
        print("run_get_dblist error")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()