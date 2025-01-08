from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
import tempfile
from parsers import LogParser
from services import LogService
from flask_cors import CORS 

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'log', 'txt'}

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure uploads directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

log_service = LogService()


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Parse the log file
        log_service.parse_log_file(filepath)
        return jsonify({"message": "File uploaded and parsed successfully"}), 200

    return jsonify({"error": "Invalid file type"}), 400


@app.route('/logs', methods=['GET'])
def get_logs():
    severity = request.args.get('severity')
    search_term = request.args.get('searchTerm')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))

    logs = log_service.get_logs(severity, search_term, page, limit)
    return jsonify(logs), 200


@app.route('/severities', methods=['GET'])
def get_severities():
    severities = log_service.get_available_severities()
    return jsonify(severities), 200


if __name__ == '__main__':
    app.run(debug=True)
