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
handleData(nameSearch[0],found1,"chartdiv1");
handleData(nameSearch[1],found2,"chartdiv2");
handleData(nameSearch[2],found3,"chartdiv3");
handleData(nameSearch[3],found4,"chartdiv4");
handleData(nameSearch[4],found5,"chartdiv5");
handleData(nameSearch[5],found6,"chartdiv6");
handleData(nameSearch[6],found7,"chartdiv7");
handleData(nameSearch[7],found8,"chartdiv8");
handleData(nameSearch[8],found9,"chartdiv9");
handleData(nameSearch[9],found10,"chartdiv10");

function handleData(nameSearch,found,chartName){
	var foundData = $.getJSON('./search_function.php', function(jsonData) { 
		neededData = jsonData;
		neededData.forEach(function(whaleData){
			whaleName = JSON.stringify(whaleData.name);
			whaleMonth = JSON.stringify(whaleData.month);
			if(whaleName == "\""+nameSearch+"\""){
				//console.log(whaleMonth);
				
				switch (whaleMonth)
				{
					case '"1"':
						whaleData["month"] = 'Jan';
						whaleData["color"] = '#FF0F00';
						break;
					case '"2"':
						whaleData["month"] = 'Feb';
						whaleData["color"] = '#FF6600';
						break;
					case '"3"':
						whaleData["month"] = 'Mar';
						whaleData["color"] = '#FF9E01';
						break;
					case '"4"':
						whaleData["month"] = 'Apr';
						whaleData["color"] = '#FCD202';
						break;
					case '"5"':
						whaleData["month"] = 'May';
						whaleData["color"] = '#F8FF01';
						break;
					case '"6"':
						whaleData["month"] = 'Jun';
						whaleData["color"] = '#B0DE09';
						break;
					case '"7"':
						whaleData["month"] = 'July';
						whaleData["color"] = '#04D215';
						break;
					case '"8"':
						whaleData["month"] = 'Aug';
						whaleData["color"] = '#0D8ECF';
						break;
					case '"9"':
						whaleData["month"] = 'Sep';
						whaleData["color"] = '#0D52D1';
						break;
					case '"10"':
						whaleData["month"] = 'Oct';
						whaleData["color"] = '#2A0CD0';
						break;
					case '"11"':
						whaleData["month"] = 'Nov';
						whaleData["color"] = '#8A0CCF';
						break;
					case '"12"':
						whaleData["month"] = 'Dec';
						whaleData["color"] = '#CD0D74';
						break;
					default:
						whaleData["color"] = '#FF0F00';
				}
				found.push(whaleData)
			}
			
		});
			//console.log(found);
		 var chart = AmCharts.makeChart(chartName, {
			"type": "serial",
			"theme": "light",
			"margin-right":70,
			"dataProvider": found,
			"titles": [{
					"text": "Monthly Frequency Distribution",
				}],
			"valueAxes": [{
				"axisAlpha": 0,
				"position": "left",
				"title": "Number of Whales Spotted"
			}],
			"startDuration": 1,
			"graphs": [{
			"balloonText": "<b>[[month]]: [[total]]</b>",
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
			"categoryField": "month",
			"categoryAxis": {
			"gridPosition": "start",
			"labelRotation": 0
			},
			"export": {
			"enabled": false,
			}
		});
		
	});
}
	

