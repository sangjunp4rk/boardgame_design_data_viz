from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

import operator
import csv
import pandas as pd 

app = Flask(__name__)

game_data = []

######## Routes for Main Page ########
@app.route('/')
def main():
	return render_template('main.html', page_name='main')

@app.route('/get_rating', methods=['GET', 'POST'])
def load_data():
	json_data = request.get_json()

	print "!!!!"
	print json_data['category']
	print json_data['mechanics']
	print json_data['min_players']

	df = pd.read_csv('games_data.csv', sep=',')

	## CALCULATE CATEGORY RATING ##
	category_name = json_data['category']

	# filter based on category
	filtered_categories_df = df[df['categories'].str.contains(category_name) == True]

	# filter 0s
	filtered_categories_df = filtered_categories_df[filtered_categories_df['average_rating'] != 0.0]

	category_mean = filtered_categories_df['average_rating'].mean()

	################

	## CALCULATE MECHANICS ##
	mechanics_name = json_data['mechanics']

	# filter based on mechanics_name
	filtered_mechanics_df = df[df['mechanics'].str.contains(mechanics_name) == True]

	# filter 0s
	filtered_mechanics_df = filtered_mechanics_df[filtered_mechanics_df['average_rating'] != 0.0]

	mechanics_mean = filtered_mechanics_df['average_rating'].mean()

	################

	## CALCULATE MIN PLAYERS ##
	min_players = json_data['min_players']

	# filter based on min players
	if min_players == 6:
		filtered_min_players_df = df[df['minplayers'] > 5]
	else:
		filtered_min_players_df = df[df['minplayers'] == min_players]

	# filter 0s
	filtered_min_players_df = filtered_min_players_df[filtered_min_players_df['average_rating'] != 0.0]

	min_players_mean = filtered_min_players_df['average_rating'].mean()

	################

	## CALCULATE AVERAGE MEAN ##
	average_list = [category_mean, mechanics_mean, min_players_mean]
	estimated_average = reduce(lambda x, y: x + y, average_list) / len(average_list)

	print category_mean
	print mechanics_mean
	print min_players_mean
	print estimated_average

	return jsonify(calculated_rating = estimated_average)


if __name__ == '__main__':
   app.run(debug = True)