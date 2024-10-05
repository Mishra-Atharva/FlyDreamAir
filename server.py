from flask import Flask, jsonify, request
from flask_cors import CORS
import json 

app = Flask(__name__)
CORS(app)

@app.route('/get_data', methods=['GET'])
def get_data():
    with open('user.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/update_data', methods=['POST'])
def update_data():
    if request.method == 'POST':
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            data = request.json
            with open("user.json", 'w') as f:
                json.dump(data, f)
            return jsonify({"message": "Data written to file successfully"}), 200
        else:
            return jsonify({"error": "Content-Type must be application/json"}), 400
    return jsonify({"error": "Invalid request method"}), 405

if __name__ == '__main__':
    app.run(debug=True)