import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Try importing libraries and installing them if not found
try:
    from flask import Flask, jsonify, request, render_template
except ImportError:
    print("Flask is not installed. Installing Flask...")
    install("Flask")

try:
    from flask_cors import CORS
except ImportError:
    print("flask_cors is not installed. Installing flask_cors...")
    install("flask-cors")

try:
    import json  # json is part of Python's standard library, so this should not raise an ImportError
except ImportError:
    print("There is an issue with the json module. It is part of Python's standard library.")


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
    return render_template('profile_details.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/contact')
def contact():
    return render_template('contact us.html')

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
    app.run(debug=True, port=50000)
