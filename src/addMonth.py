import csv

with open('spot_ultimate_geo.csv', 'r') as f1:
    with open('geoplusmonth.csv', 'w') as f2:
        for line in f1.readlines():
            line = line.replace('\n','')
            words = line.split(',')
            month = words[4].split('/')
            #f2.write(line+','+month[1]+'\n')
            # month[0] = month[0].replace('"','')
            month[2] = month[2].replace('"','')
            f2.write(line+','+month[1]+','+month[2]+'\n')
            # f2.write(line+',"'+month[1]+'","'+month[2]+'","'+month[0]+'"\n')