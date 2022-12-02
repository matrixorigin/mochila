from flask import Flask
import api.utils.globals as globals
from api.auth.authbp import authBP
from api.exploration.explorationbp import explorationBP

app = Flask(__name__)
globals.initialize_globals()

app.register_blueprint(authBP, url_prefix='/auth')
app.register_blueprint(explorationBP, url_prefix="/main/exploration")