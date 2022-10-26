from flask import Flask, request, jsonify, make_response
import json
import mysql.connector

api = Flask(__name__)

host, port, username, password = None, None, None, None
connection, database = None, None

@api.route('/credentials', methods=['POST', 'OPTIONS'])
def add_credentials():
    res = {"username": None, "password": None}
    if request.method == 'POST':
        global host, port, username, password
        host = request.form.get('host') or None
        port = request.form.get('port') or None
        username = request.form.get('username') or None
        password = request.form.get('password') or None
        res['username'], res['password'] = username, password
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    elif request.method == 'OPTIONS':
        response = make_response('', 204)
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        print(response.headers)
        return response
    

@api.route('/connect', methods=['GET'])
def openconnection():
    if request.method == 'GET':
        global connection
        try:
            connection = mysql.connector.connect(user=username, password=password, host=host)
            return {"connected": True}
        except mysql.connector.Error as err:
            print(err)
        else:
            connection.close()
    return jsonify({"connected": False})

@api.route('/databases', methods=['GET', 'POST'])
def getdbs():
    if request.method == 'GET':
        try:
            if connection:
                dbcursor = connection.cursor()
                dbcursor.execute("SHOW DATABASES;")
                result = dbcursor.fetchall()
                return jsonify({"results": result})
            else:
                return jsonify({"results": "connection not true"})
        except mysql.connector.Error as err:
            print(err)
        except Exception as e:
            print(e)
        else:
            print("/databases GET other error")
        return jsonify({"results": None})
    elif request.method == 'POST': #database: databasename
        dbselect = request.form.get('database') or None
        global database
        try:
            dbcursor = connection.cursor()
            dbcursor.execute(f"use {dbselect};")
            database = dbcursor
        except mysql.connector.Error as err:
            print(err)
        else:
            print("/databases POST other error")