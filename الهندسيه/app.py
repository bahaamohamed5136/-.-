from flask import Flask, jsonify, request, send_from_directory
import json
import os

app = Flask(__name__)
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')


def load_data():
    if not os.path.exists(DATA_FILE):
        return {"faults": [], "dept_counters": {}}
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


@app.route('/')
def index():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), '.HTML')


@app.route('/namaa logo.png')
def logo():
    return send_from_directory(os.path.dirname(os.path.abspath(__file__)), 'namaa logo.png')


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(load_data())


@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json(force=True)
    save_data(data)
    return jsonify({"status": "ok"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
