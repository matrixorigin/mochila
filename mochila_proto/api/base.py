from flask import Flask, request, jsonify, make_response
import json
import pymysql

app = Flask(__name__)

host, port, username, password, database = None, None, None, None, None
connection = None

@app.route('/credentials', methods=['POST', 'GET'])
def add_credentials():
    global host, port, username, password
    if request.method == 'POST':
        res = False
        data = request.get_json(force=True)
        host = data.get('host') or None
        port = int(data.get('port')) or None
        username = data.get('username') or None
        password = data.get('password') or None
        print(data)
        res = openconnection()
        response = make_response('', 200 if res else 201)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    elif request.method == 'GET':
        res = {"loggedin": False}
        if host and port and username and password and database:
            res['loggedin'] = True
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    
def openconnection():
    global connection
    res = False
    try:
        connection = pymysql.connect(user=username, password=password, host=host, port=port)
        res = True
        print("connect successfully connected to DB directory")
    except:
        if connection: connection.close()
        print("openconnection: exception")
    return res

@app.route('/databases', methods=['GET', 'POST'])
def getdbs():
    global connection, database
    if request.method == 'GET':
        res = {"results": None}
        try:
            dbcursor = connection.cursor()
            dbcursor.execute("SHOW DATABASES;")
            res["results"] = dbcursor.fetchall()
        except:
            print("/databases GET error")
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    elif request.method == 'POST': #database: databasename
        res = {"valid": "false"}
        try:
            dbname = request.get_json(force=True).get('dbname')
            database = dbname
            connection = pymysql.connect(host=host, port=port, user=username, password=password, database=dbname)
            res["valid"] = True
            print(f'/databases post, connected into db {dbname}')
        except:
            print("/databases POST error")
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response