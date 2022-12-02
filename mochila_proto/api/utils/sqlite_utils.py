import sqlite3
import os.path

file_path = './credentials_db/credentials.db'
def verify_db_structure():
    conn = None
    cur = None
    instrs = ['SELECT id from host;',
    'SELECT id from port;',
    'SELECT id from username;',
    'SELECT id from password;',
    'SELECT id from dbname;',
    ]
    try:
        conn = sqlite3.connect(file_path)
        cur = conn.cursor()
        for instr in instrs:
            cur.execute(instr)
        return True
    except:
        print("verify_db_structure failed")
        return False
    finally:
        if conn:
            conn.close()


def init_dbfile():
    conn = None
    cur = None
    instrs = ['DROP TABLE IF EXISTS host;',
    'DROP TABLE IF EXISTS port;',
    'DROP TABLE IF EXISTS username;',
    'DROP TABLE IF EXISTS password;',
    'DROP TABLE IF EXISTS dbname;',
    'CREATE TABLE IF NOT EXISTS host ( id text primary key );',
    'CREATE TABLE IF NOT EXISTS port ( id integer primary key );',
    'CREATE TABLE IF NOT EXISTS username ( id text primary key );',
    'CREATE TABLE IF NOT EXISTS password ( id text primary key );',
    'CREATE TABLE IF NOT EXISTS dbname ( id text primary key );'
    ]
    try:
        conn = sqlite3.connect(file_path)
        cur = conn.cursor()
        for instr in instrs:
            cur.execute(instr)
        return True
    except:
        print("init_dbfile_failed")
        return False
    finally:
        if conn:
            conn.close() 

def set_entry(tablename, entry):
    #if entry is None, will not clear table tablename
    conn = None
    curr = None
    try:
        if not entry:
            return None
        conn = sqlite3.connect(file_path)
        cur = conn.cursor()
        cur.execute(f'DELETE FROM {tablename};')
        cur.execute(f'INSERT INTO {tablename} VALUES(?);', (entry,))
        conn.commit()
        return True
    except:
        print("set_entry exception")
        return None
    finally:
        if conn:
            conn.close()


def get_entry(tablename):
    conn = None
    curr = None
    try:
        conn = sqlite3.connect(file_path)
        cur = conn.cursor()
        cur.execute(f'SELECT id from {tablename};')
        res = cur.fetchall()
        return res[0][0]
    except:
        print("get_entry exception")
        return None
    finally:
        if conn:
            conn.close()
    
def set_entries(host, port, username, password, dbname):
    try:
        if not verify_db_structure():
            init_dbfile()
        set_entry('host', host)
        set_entry('port', port)
        set_entry('username', username)
        set_entry('password', password)
        set_entry('dbname', dbname)
        return True
    except:
        print('set_entries error')
        return False

def get_entries():
    try:
        if not verify_db_structure():
            init_dbfile()
        returndict = {}
        returndict['host'] = get_entry('host')
        returndict['port'] = get_entry('port')
        returndict['username'] = get_entry('username')
        returndict['password'] = get_entry('password')
        returndict['dbname'] = get_entry('dbname')
        return returndict
    except:
        print('get_entries error')
        return None