from flask import Blueprint, request, make_response, jsonify
import api.exploration.explorationlogic as explorationlogic
import api.utils.globals as globals
import pprint

explorationBP = Blueprint("explorationBP", __name__)

@explorationBP.route('/sidebar', methods=['GET'])
def get_sidebar():
    try:
        res = {"data": None}
        if explorationlogic.set_dbschema():
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
        explorationlogic.run_select()
        res = globals.mainview
        pprint.pprint(res)
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
        res["valid"] = explorationlogic.set_filters(requestdata)
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('set_filters_error')
        return '', 500