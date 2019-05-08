import csv
import json

# [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 
# 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 
# 3.8, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0]
bin_ranges = [round (x * .2, 1) for x in range(5,26)]

def weight_bins(raw_weight):
	if raw_weight == None:
		return "NaN"

	for upper_bound in bin_ranges:
		if raw_weight <= upper_bound:
			return str(upper_bound)

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

Final output 
[
    {
        "count": 128, 
        "weight": "1.4", 
        "mechanic": "Card Drafting"
    }, 
    {
        "count": 199, 
        "weight": "1.6", 
        "mechanic": "Card Drafting"
    }, 
    {
        "count": 512, 
        "weight": "1.0", 
        "mechanic": "Card Drafting"
    }, 
"""
game_dict = {}

f = open('mechanics_games_data.csv', 'rb')
reader = csv.reader(f)
headers = next(reader, None)
# ['id', 'average_weight', 'mechanics']

# mechanics_of_interest = ['Acting', 'Singing', 'Story Telling']

for row in reader:
	raw_weight = float(row[1])
	if raw_weight == 0:
		continue

	binned_weight = weight_bins(raw_weight)

	mechanics_raw_string = row[2]
	mechanics_split = mechanics_raw_string.split(',')

	for mechanic in mechanics_split:
		# if mechanic not in mechanics_of_interest:
		# 	continue
		if mechanic == "":
			continue
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

f = open("formatted_data_easy_test.txt", "w")
f.write(json.dumps(output_data, indent=4))
f.close()





