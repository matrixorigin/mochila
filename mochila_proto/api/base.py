from flask import Flask, request, jsonify, make_response
import json
import mysql.connector

app = Flask(__name__)

host, port, username, password = None, None, None, None
connection, database = None, None

@app.route('/credentials', methods=['POST', 'GET'])
def add_credentials():
    global host, port, username, password
    if request.method == 'POST':
        res = False
        data = request.get_json(force=True)
        host = data.get('host') or None
        port = data.get('port') or None
        username = data.get('username') or None
        password = data.get('password') or None
        res = openconnection()
        response = make_response('', 200 if res else 404)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    elif request.method == 'GET':
        res = {"loggedin": False}
        if host and port and username and password:
            res['loggedin'] = True
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    
def openconnection():
    global connection
    res = False
    try:
        connection = mysql.connector.connect(user=username, password=password, host=host)
        res = True
        print("connect successfully connected to DB")
    except mysql.connector.Error as err:
        print(err)
    except:
        if connection: connection.close()
    return res

@app.route('/databases', methods=['GET', 'POST'])
def getdbs():
    global connection, database
    if request.method == 'GET':
        res = {"results": None}
        try:
            # if True: #TESTING
            #     res["results"] = ["db1", "db2", "db3", "db4"]
            #     print(res)
            if connection:
                dbcursor = connection.cursor()
                dbcursor.execute("SHOW DATABASES;")
                res["results"] = dbcursor.fetchall()
            else:
                res["results"] = "Connection not True"
        except mysql.connector.Error as err:
            print(err)
        except Exception as e:
            print(e)
        except:
            print("/databases GET other error")
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    elif request.method == 'POST': #database: databasename
        res = {"valid": "false"}
        dbname = request.get_json(force=True).get("dbname")
        print(dbname)
        try:
            # dbcursor = connection.cursor()
            # dbcursor.execute(f"use {dbname};")
            # database = dbname
            res["valid"] = True
        except mysql.connector.Error as err:
            print(err)
        except:
            print("/databases POST other error")
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response