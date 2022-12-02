import pymysql
import pymysql.cursors
import pprint
host, port, username, password, database = "127.0.0.1", 6001, "dump", "111", "mo_catalog"
connection = None

def connect():
    global host, port, username, password
    global connection
    connection = pymysql.connect(host=host, port=port, user=username, password=password)
    print("successfully created connection to DB directory")
    print(connection)

def get_db():
    global connection
    dbcursor = connection.cursor()
    dbcursor.execute("SHOW DATABASES;")
    output = dbcursor.fetchall()
    print(output[0][0])

def select_db():
    global connection, database, host, port, username, password
    try:
        connection = pymysql.connect(host=host, port=port, user=username, password=password, database=database, cursorclass=pymysql.cursors.DictCursor)
        dbcursor = connection.cursor()
        dbcursor.execute("SHOW TABLES;")
        output = dbcursor.fetchall()
        print(output)
    except:
        print("select_db: exception")

def describe():
    global connection
    cursor = connection.cursor()
    # print("init_explore tablenames:")
    # print(tablenames)
    # for tablename in tablenames:
    cursor.execute("describe mo_role;")
    table_cols = [col[0] for col in cursor.fetchall()]
    print(f"init_explore table_cols for mo_role:")
    print(table_cols)
    # print("test.describe: ERROR")
    if cursor:
        cursor.close()

def getdata(tablename, colname):
    global connection
    cursor = connection.cursor()
    cursor.execute(f"select {colname} from {tablename} limit 10;")
    print(f"select {colname} from {tablename} limit 2;")
    res = cursor.fetchall()
    pprint.pprint(res)
    if cursor:
        cursor.close()

def main():
    # connect()
    # get_db()
    select_db()
    # describe()
    getdata("mo_role", "*")

    

if __name__ == "__main__":
    main()