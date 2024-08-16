import pandas as pd
from flask import Flask, render_template, request, redirect, url_for
from functions import find_students_moved, get_cgpa

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/find')
def find():
    return render_template('find.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        old = request.form['old']
        new = request.form['new']

        old_data = pd.read_excel("data/first.xlsx")
        new_data = pd.read_excel("data/second.xlsx")

        students_moved = find_students_moved(old_data, new_data, old, new)

        student_list = [
        {'idx': idx, 'name': name, 'batch': batch}
        for idx, (name, batch) in enumerate(zip(students_moved['Name'], students_moved['Batch']), start=1)
        ]

        return render_template('find.html', old=old, new=new, student_list=student_list)

@app.route('/get-cgpa', methods=['POST'])
def handle_cgpa_request():
    name = request.form.get('new')
    if not name:
        return jsonify({"error": "No name provided"}), 400
    
    result = get_cgpa(name)
    return render_template('index.html', result=result)

if __name__ == '__main__':

    app.run(debug=True)
