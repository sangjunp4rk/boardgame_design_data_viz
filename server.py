from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

import operator
import csv

app = Flask(__name__)

######## Routes for Main Page ########
@app.route('/')
def main():
	return render_template('main.html', page_name='main')

if __name__ == '__main__':
   app.run(debug = True)