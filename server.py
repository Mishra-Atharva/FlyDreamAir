from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import json 

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/account_summary')
def account_summary():
    return render_template('profile_summary.html')

@app.route('/account_rewards')
def account_rewards():
    return render_template('profile_rewards.html')


@app.route('/get_data', methods=['GET'])
def get_data():
    with open('user.json', 'r') as f:
        data = json.load(f)
    print("sending data")
    return jsonify(data)

@app.route('/update_data', methods=['POST'])
def update_data():
    data = request.get_json()
    with open('user.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("Updated")
    return jsonify({"message": "Data updated successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)