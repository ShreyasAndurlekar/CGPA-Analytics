import pandas as pd
from flask import Flask, render_template, request, redirect, url_for
from functions import find_students_moved, get_cgpa

app = Flask(__name__)

df_sem3 = pd.read_excel('data/sem3.xlsx', sheet_name=0)
df_sem4 = pd.read_excel('data/sem4.xlsx', sheet_name=0)
df_sem4['Name_Set'] = df_sem4['Name'].str.lower().apply(lambda x: set(x.split()))
df_sem3['Name_Set'] = df_sem3['Name'].str.lower().apply(lambda x: set(x.split()))

df_sorted = pd.read_excel('data/sem4.xlsx')
df_sorted['Average'] = (df_sorted['S.G.P.A'] + df_sorted['C.G.P.A']) / 2
df_sorted['Rank'] = df_sorted['C.G.P.A'].rank(ascending=False, method='min')
df_sorted.loc[df_sorted['C.G.P.A'] == 0, 'Rank'] = 296
df_sorted = df_sorted.sort_values(by='C.G.P.A', ascending=False)
df_sorted = df_sorted[['Rank', 'Name', 'C.G.P.A']]

# All data frames loaded here to reduce latency instead of loading everytime the functions are called

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/find')
def find():
    return render_template('find.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/tribute')
def tribute():
    return render_template('tribute.html')

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
    
    result = get_cgpa(name, df_sem3, df_sem4, df_sorted)
    return render_template('index.html', result=result)

if __name__ == '__main__':

    app.run(debug=True)
