import pymysql
#This file stores states that need be preserved across requests and handles standard queries to the DB

global host, port, username, password, dbname #Modified via '/auth'
global connection #Modified via '/auth'
global dbschema #Modified via '/exploration/explorationlogic'
global sqlfilters #Modified via '/exploration/explorationlogic'
global vglfilters #Modified via '/exploration/explorationlogic'
global mainview, recommendations #Modified via 'exploration/explorationlogic'

def initialize_globals():
    global host, port, username, password, dbname, connection
    global dbschema, sqlfilters, vglfilters
    global mainview, recommendations
    host, port, username, password, dbname = None, None, None, None, None
    connection = None
    dbname = None
    dbschema = []
    sqlfilters = {}
    vglfilters = {}
    mainview = {}
    recommendations = {}


def set_connection(host_arg, port_arg, username_arg, password_arg):
    try:
        global host, port, username, password
        host = host_arg
        try:
            port = int(port_arg)
        except:
            port = None
        username = username_arg
        password = password_arg
        return True
    except:
        print("globals.set_connection: ERROR")
        return False

def set_dbname(dbname_arg):
    try:
        global dbname
        dbname = dbname_arg
        return True
    except:
        print("globals.set_dbname: ERROR")
        return False

def connect():
    try:
        global host, port, username, password, dbname, connection
        if dbname:
            connection = pymysql.connect(host=host, port=port, user=username, password=password, database=dbname)
        else:
            connection = pymysql.connect(host=host, port=port, user=username, password=password)
        return True
    except:
        print("globals.connect: ERROR")
        if connection:
            connection.close()
        connection = None
        return False

def disconnect():
    try:
        global connection
        if connection:
            connection.close()
        connection = None
        return True
    except:
        print("globals.disconnect: ERROR")
        return False


def run_query(query):
    try:
        global connection
        if not connection:
            print("globals.run_query: No connection")
            return None
        cursor = connection.cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        cursor.close()
        return res
    except:
        print("globals.run_query: ERROR")
        return None
    finally:
        if cursor:
            cursor.close()