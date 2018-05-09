import geocoder
import json
import requests
import csv

index=0
# with open('orgin.csv', 'r') as f1:
# 	with open('xin3-2.csv', 'w') as f2:
# 		for line in f1.readlines():
# 			if index < 5000:
# 				index += 1
# 				print(index)
# 				continue
# 			words = line.split(',')
# 			lat = words[2].replace('"','')
# 			lng = words[3].replace('"','')
# 			words[4] = words[4].replace('\n','')
# 			g = geocoder.google([float(lat),float(lng)],key="AIzaSyDoUh_ldqRRF_2xQkzp13OcQgZfYict6zE", method='reverse')
# 			index+=1
# 			if g.city is None or g.state_long is None:
# 				print(index,"NO",float(lat),float(lng))
# 				f2.write(words[0]+','+words[1]+','+words[2]+','+words[3]+','+words[4]+',"",""\n')
# 			else:
# 				print(index,"YES")
# 				f2.write(words[0]+','+words[1]+','+words[2]+','+words[3]+','+words[4]+',"'+g.city+'","'+g.state_long+'"\n')
			
			
# with open('weiwancheng.csv', 'r') as f1:
# 	with open('zuihou240.csv', 'w') as f2:
# 		for line in f1.readlines():
# 			words = line.split(',')
# 			lat = words[2].replace('"','')
# 			lng = words[3].replace('"','')
# 			words[4] = words[4].replace('\n','')
# 			g = geocoder.google([float(lat),float(lng)],key="AIzaSyDCIAElQaMeaLegUR5zhgjfH3wOI_W57cs", method='reverse')
# 			index+=1
# 			if g.state_long is None:
# 				print(index,"NO",float(lat),float(lng))
# 				f2.write(words[0]+','+words[1]+','+words[2]+','+words[3]+','+words[4]+',"",""\n')
# 			else:
# 				print(index,"YES")
# 				f2.write(words[0]+','+words[1]+','+words[2]+','+words[3]+','+words[4]+',"","'+g.state_long+'"\n')
			
# with open('zuihou240.csv', 'r') as f1:
# 	with open('aaa2.csv', 'w') as f2:
# 		for line in f1.readlines():
# 			words = line.split(',')
# 			if words[6] != '""\n':
# 				pass
# 			else:
# 				f2.write(line)



# with open('weiwancheng.csv', 'r') as f1:
# 	with open('zuihou240.csv', 'w') as f2:
# 		for line in f1.readlines():
# 			words = line.split(',')
# 			lat = words[2].replace('"','')
# 			lng = words[3].replace('"','')
# 			words[4] = words[4].replace('\n','')
# 			g = geocoder.bing([float(lat),float(lng)], method='reverse',key='ArWQNIcDzoHfVTlKE5S3knud3zlsb6TnAyuhL6TzH4frjskaSzoPbe17Mt5pRee_')
# 			index+=1
# 			if g.city is None or g.state is None:
# 				print(index,"NO",float(lat),float(lng))
# 				f2.write(words[0]+','+words[1]+','+words[2]+','+words[3]+','+words[4]+',"",""\n')
# 			else:
# 				print(index,"YES")
# 				f2.write(words[0]+','+words[1]+','+words[2]+','+words[3]+','+words[4]+',"'+g.city+'","'+g.state+'"\n')

# 				
g = geocoder.google([-33.091446,129.55635],key="AIzaSyDoUh_ldqRRF_2xQkzp13OcQgZfYict6zE", method='reverse')
print(g.json)
