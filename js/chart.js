var nameSearch = ["Humpback whale",
"Southern right whale","Blue whale",
"Dwarf minke whale",
"Killer whale","Common bottlenose dolphin",
"Australian humpback dolphin",
"Australian snubfin dolphin",
"Common dolphin",
"Spinner dolphin"]

var found1 = [];
var found2 = [];
var found3 = [];
var found4 = [];
var found5 = [];
var found6 = [];
var found7 = [];
var found8 = [];
var found9 = [];
var found10 = [];


	var foundData = $.getJSON('./php/search_function.php', function(jsonData) { 
		neededData = jsonData;
		handleData(nameSearch[0],found1,"chartdiv1",neededData);
		handleData(nameSearch[1],found2,"chartdiv2",neededData);
		handleData(nameSearch[2],found3,"chartdiv3",neededData);
		handleData(nameSearch[3],found4,"chartdiv4",neededData);
		handleData(nameSearch[4],found5,"chartdiv5",neededData);
		handleData(nameSearch[5],found6,"chartdiv6",neededData);
		handleData(nameSearch[6],found7,"chartdiv7",neededData);
		handleData(nameSearch[7],found8,"chartdiv8",neededData);
		handleData(nameSearch[8],found9,"chartdiv9",neededData);
		handleData(nameSearch[9],found10,"chartdiv10",neededData);
	});

function handleData(nameSearch,found,chartName,neededData){	
	neededData.forEach(function(whaleData){	
		whaleName = JSON.stringify(whaleData.name);
		whalemonths = JSON.stringify(whaleData.months);
		if(whaleName == "\""+nameSearch+"\""){
			switch (whalemonths)
			{
				case '"1"':
					whaleData["months"] = 'Jan';
					whaleData["color"] = '#FF0F00';
					break;
				case '"2"':
					whaleData["months"] = 'Feb';
					whaleData["color"] = '#FF6600';
					break;
				case '"3"':
					whaleData["months"] = 'Mar';
					whaleData["color"] = '#FF9E01';
					break;
				case '"4"':
					whaleData["months"] = 'Apr';
					whaleData["color"] = '#FCD202';
					break;
				case '"5"':
					whaleData["months"] = 'May';
					whaleData["color"] = '#F8FF01';
					break;
				case '"6"':
					whaleData["months"] = 'Jun';
					whaleData["color"] = '#B0DE09';
					break;
				case '"7"':
					whaleData["months"] = 'July';
					whaleData["color"] = '#04D215';
					break;
				case '"8"':
					whaleData["months"] = 'Aug';
					whaleData["color"] = '#0D8ECF';
					break;
				case '"9"':
					whaleData["months"] = 'Sep';
					whaleData["color"] = '#0D52D1';
					break;
				case '"10"':
					whaleData["months"] = 'Oct';
					whaleData["color"] = '#2A0CD0';
					break;
				case '"11"':
					whaleData["months"] = 'Nov';
					whaleData["color"] = '#8A0CCF';
					break;
				case '"12"':
					whaleData["months"] = 'Dec';
					whaleData["color"] = '#CD0D74';
					break;
				default:
					whaleData["color"] = '#FF0F00';
			}
			found.push(whaleData);
		}
	});
		// console.log(found);
	 var chart = AmCharts.makeChart(chartName, {
		"type": "serial",
		"theme": "light",
		"margin-right":70,
		"dataProvider": found,
		"titles": [{
				"text": "Occurence Frequency by Month",
			}],
		"valueAxes": [{
			"axisAlpha": 0,
			"position": "left",
			"title": "Number of Whales Spotted"
		}],
		"startDuration": 1,
		"graphs": [{
		"balloonText": "<b>[[months]]: [[total]]</b>",
		"fillColorsField": "color",
		"fillAlphas": 0.9,
		"lineAlpha": 0.2,
		"type": "column",
		"valueField": "total"
		}],
		"chartCursor": {
		"categoryBalloonEnabled": false,
		"cursorAlpha": 0,
		"zoomable": false
		},
		"categoryField": "months",
		"categoryAxis": {
		"gridPosition": "start",
		"labelRotation": 0
		},
		"export": {
		"enabled": false,
		}
	});
}
	

