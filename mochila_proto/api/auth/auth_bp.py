from flask import Blueprint, request, make_response, jsonify
import api.utils.globals as globals

authBP = Blueprint("authBP", __name__)

@authBP.route('/credentials', methods=['POST'])
def set_credentials():
    try:
        res = {"valid": False}
        data = request.get_json(force=True)
        print(data)
        host = data.get('host') or None
        port = data.get('port') or None
        username = data.get('username') or None
        password = data.get('password') or None
        globals.set_connection(host, port, username, password)
        res["valid"] = globals.connect()
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('set_credentials_error')
        return '', 500

@authBP.route('/credentials', methods=['GET'])
def get_loginstatus():
    print("hellodocker")
    try:
        res = {"loggedin": False}
        if globals.dbname and globals.connection and globals.host and globals.port and globals.username:
            res['loggedin'] = True
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('get_loginstatus_error')
        return '', 500

@authBP.route('/db', methods=['GET'])
def get_dblist():
    try:
        res = {"data": None}
        instr = "SHOW DATABASES;"
        dblist = [col["Database"] for col in globals.run_query(instr)]
        res["data"] = dblist
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('get_dblist_error')
        return '', 500
        
@authBP.route('/db', methods=['POST'])
def set_dbname():
    try:
        res = {"valid": False}
        data = request.get_json(force=True)
        print(data)
        dbname = data.get('dbname') or None
        globals.set_dbname(dbname)
        globals.disconnect()
        res["valid"] = globals.connect()
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('set_dbname_error')
        return '', 500