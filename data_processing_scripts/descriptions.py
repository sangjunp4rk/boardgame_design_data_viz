
description_dict = {}

with open('data_viz_mechanic_2.csv') as fp:
	line = fp.readline()
	print line

	while line:
		line = fp.readline()
		try:
			header = line.split(",", 1)[0]
			text = line.split(",", 1)[1]
			# print line[:-3]
			print header
			print text[:-3].strip()
			print ""
			description_dict[header] = text[:-3].strip()
		except:
			print "error"
	print description_dict
