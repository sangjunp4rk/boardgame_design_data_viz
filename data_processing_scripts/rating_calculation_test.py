import pandas as pd 
import numpy as np


df = pd.read_csv('games_data.csv', sep=',')

categories = df['categories']
unique_categories = set(())

for item in df['categories']:
	item = str(item)
	if item == 'nan':
		continue
	categories_split = item.split(',')
	for item2 in categories_split:
		if item2 not in unique_categories:
			unique_categories.add(item2)
print unique_categories

## CALCULATE CATEGORY RATING ##
category_name = 'economic'

# filter based on category
filtered_categories_df = df[df['categories'].str.lower().isin([category_name.lower()]) == True]

# filter 0s
filtered_categories_df = filtered_categories_df[filtered_categories_df['average_rating'] != 0.0]

category_mean = filtered_categories_df['average_rating'].mean()

print filtered_categories_df['categories']
print df['categories'].str
print category_mean

################

## CALCULATE MECHANICS ##
mechanics_name = 'Dice Rolling'

# filter based on mechanics_name
filtered_mechanics_df = df[df['mechanics'].str.contains(mechanics_name) == True]

# filter 0s
filtered_mechanics_df = filtered_mechanics_df[filtered_mechanics_df['average_rating'] != 0.0]

mechanics_mean = filtered_mechanics_df['average_rating'].mean()

################

## CALCULATE MIN PLAYERS ##
min_players = 2

# filter based on min players
filtered_min_players_df = df[df['minplayers'] == min_players]

# filter 0s
filtered_min_players_df = filtered_min_players_df[filtered_min_players_df['average_rating'] != 0.0]

min_players_mean = filtered_min_players_df['average_rating'].mean()

################

## CALCULATE AVERAGE MEAN ##
average_list = [category_mean, mechanics_mean, min_players_mean]
estimated_average = reduce(lambda x, y: x + y, average_list) / len(average_list)

print estimated_average