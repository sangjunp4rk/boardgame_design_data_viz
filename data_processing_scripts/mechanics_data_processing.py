import csv
import json

def weight_bins(raw_weight):
	if raw_weight == None or raw_weight == 0:
		return "None or Zero"
	elif raw_weight > 0 and raw_weight < .5:
		return "0 < x < .5"
	elif raw_weight >= .5 and raw_weight < 1:
		return ".6 =< x < 1"
	elif raw_weight >= 1 and raw_weight < 1.5:
		return "1 =< x < 1.5"
	elif raw_weight >= 1.5 and raw_weight < 2:
		return "1.5 =< x < 2"
	elif raw_weight >= 2 and raw_weight < 2.5:
		return "2 < x =< 2.5"
	elif raw_weight >= 2.5 and raw_weight < 3:
		return "2.5 < x =< 3"
	elif raw_weight >= 3 and raw_weight < 3.5:
		return "3 < x =< 3.5"
	elif raw_weight >= 3.5 and raw_weight < 4:
		return "3.5 < x =< 4"
	elif raw_weight >= 4 and raw_weight < 4.5:
		return "4 < x =< 4.5"
	elif raw_weight >= 4.5 and raw_weight < 5:
		return "4.5 < x =< 5"
	else:
		return "x >= 5"

"""
Structure of game_dict
{
	"mechanics": {
		{"weight_bin": count in int, "weight_bin_2: count in int"}
	},
	"mechanics2": {
		{"weight_bin": count in int}
	}
}


[
	{'count': 1, 'weight': '4 < x =< 4.5', 'mechanic': 'Simultaneous Action Selection'}, 
	{'count': 1, 'weight': '4 < x =< 4.5', 'mechanic': 'Area Control / Area Influence'}, 
	{'count': 1, 'weight': '4 < x =< 4.5', 'mechanic': 'Auction/Bidding'}, 
	{'count': 1, 'weight': '4 < x =< 4.5', 'mechanic': 'Dice Rolling'}, 
	{'count': 1, 'weight': '4 < x =< 4.5', 'mechanic': 'Hand Management'}
]
"""
game_dict = {}

f = open('mechanics_games_data.csv', 'rb')
reader = csv.reader(f)
headers = next(reader, None)
# ['id', 'average_weight', 'mechanics']

for row in reader:
	raw_weight = float(row[1])
	binned_weight = weight_bins(raw_weight)

	mechanics_raw_string = row[2]
	mechanics_split = mechanics_raw_string.split(',')

	for mechanic in mechanics_split:
		if mechanic in game_dict:
			temp_dict = game_dict[mechanic]
			if binned_weight in temp_dict:
				temp_dict[binned_weight] += 1
			else:
				temp_dict[binned_weight] = 1
		else:
			game_dict[mechanic] = {binned_weight: 1}

output_data_json = []
output_data = []

for mechanic in game_dict:
	temp_json_string = ""
	temp_dict = game_dict[mechanic]
	print temp_dict

	for weight in temp_dict:

		output_data.append({"mechanic": mechanic, "weight": weight, "count": temp_dict[weight]})

f = open("formatted_data.txt", "w")
f.write(json.dumps(output_data, indent=4))
f.close()





