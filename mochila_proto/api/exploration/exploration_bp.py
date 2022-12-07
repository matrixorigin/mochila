from flask import Blueprint, request, make_response, jsonify
import api.exploration.exploration_logic as exploration_logic
import api.utils.globals as globals
import pprint

explorationBP = Blueprint("explorationBP", __name__)

@explorationBP.route('/sidebar', methods=['GET'])
def get_sidebar():
    try:
        res = {"data": None}
        if exploration_logic.set_dbschema():
            res["data"] = globals.dbschema
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('get_sidebar_error')
        return '', 500

@explorationBP.route('/mainview', methods=['GET'])
def get_mainview():
    try:
        res = None
        exploration_logic.run_select()
        res = globals.mainview
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('get_mainview_error')
        return '', 500

@explorationBP.route('/filters', methods=['POST'])
def set_filters():
    try:
        res = {"valid": False}
        requestdata = request.get_json(force=True)
        res["valid"] = exploration_logic.set_filters(requestdata)
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('set_filters_error')
        return '', 500