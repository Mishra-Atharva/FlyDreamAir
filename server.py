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
    data = request.get_json()
    with open('user.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("Updated")

if __name__ == '__main__':
    app.run(debug=True)