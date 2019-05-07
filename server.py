from flask import Flask
from flask import render_template
from flask import Response, request, jsonify

import operator
import csv
import pandas as pd 

app = Flask(__name__)

game_data = []

description_dict = {}

with open('data_viz_mechanic_2.csv') as fp:
	line = fp.readline()
	# print line

	while line:
		line = fp.readline()
		try:
			header = line.split(",", 1)[0]
			text = line.split(",", 1)[1]
			# print line[:-3]
			# print header
			# print text[:-3].strip()
			# print ""
			description_dict[header] = text[:-3].strip()
		except:
			print ("error")

@app.route('/get_descriptions', methods=['GET', 'POST'])
def get_descriptions():
	global description_dict
	
	return jsonify(description_dict=description_dict)

######## Routes for Main Page ########
@app.route('/')
def main():
	return render_template('main.html', page_name='main')

@app.route('/get_rating', methods=['GET', 'POST'])
def load_data():
	json_data = request.get_json()

	print ("!!!!")
	print (json_data)



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
	min_players = int(json_data['min_players'])

	# filter based on min players
	if min_players == 9:
		filtered_min_players_df = df[df['minplayers'] > 8]
	else:
		filtered_min_players_df = df[df['minplayers'] == min_players]

	# filter 0s
	filtered_min_players_df = filtered_min_players_df[filtered_min_players_df['average_rating'] != 0.0]

	min_players_mean = filtered_min_players_df['average_rating'].mean()

	################

	## CALCULATE AVERAGE MEAN ##
	average_list = [category_mean, mechanics_mean, min_players_mean]
	estimated_average = reduce(lambda x, y: x + y, average_list) / len(average_list)


	category_mean = round(category_mean, 2)
	mechanics_mean = round(mechanics_mean, 2)
	min_players_mean = round(min_players_mean, 2)
	estimated_average = round(estimated_average, 2)

	return jsonify(calculated_rating = estimated_average, category_mean=category_mean, mechanics_mean=mechanics_mean, min_players_mean=min_players_mean)

######## Routes for Documentations Page ########
@app.route('/documentations')
def documentations():
	return render_template('documentations.html', page_name='documentations')

if __name__ == '__main__':
   app.run(debug = True)