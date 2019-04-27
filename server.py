from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

import operator
import csv

app = Flask(__name__)

game_data = []

######## Routes for Main Page ########
@app.route('/')
def main():
	return render_template('main.html', page_name='main')

@app.route('/save_expenses', methods=['GET', 'POST'])
def load_data('/load_data'):
	print 'test'


if __name__ == '__main__':
   app.run(debug = True)