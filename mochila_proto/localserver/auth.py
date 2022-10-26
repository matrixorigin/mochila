import sqlite3

def get_db_path(username, password):
    get_path_query = f'''SELECT * from accounts
    WHERE(name = ? AND pass = ?)
    '''
    try:
        sqliteconn = sqlite3.connect('./localdatabases/auth.db')
        cursor = sqliteconn.cursor()
        cursor.execute(get_path_query, [username, password])
        acct_info = cursor.fetchall()

    except sqlite3.Error:
        print("SQLITE3 ERROR")
    finally:
        if sqliteconn:
            sqliteconn.close()
    if len(acct_info) == 1:
        return acct_info[0][2]
    return None