from flask import Blueprint, request, make_response, jsonify
import api.history.history_logic as history_logic
import api.utils.globals as globals

historyBP = Blueprint("historyBP", __name__)

@historyBP.route('/verify', methods=['GET'])
def verify_db():
    try:
        res = {"valid": False}
        res["valid"] = history_logic.verify_hist_db()
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('history_bp.verify_db: ERROR')
        return '', 500

@historyBP.route('/filter', methods=['POST'])
def post_filter():
    try:
        res = {"valid": False}
        requestdata = request.get_json(force=True)
        res = history_logic.run_select_filter(requestdata["filterstr"])
        response = make_response(jsonify(res), 200)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except:
        print('history_bp.post_filter: ERROR')
        return '', 500

        