from flask import Flask
import api.utils.globals as globals
from api.auth.auth_bp import authBP
from api.exploration.exploration_bp import explorationBP

app = Flask(__name__)
globals.initialize_globals()

app.register_blueprint(authBP, url_prefix='/auth')
app.register_blueprint(explorationBP, url_prefix="/main/exploration")