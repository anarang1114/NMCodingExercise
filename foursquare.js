$(document).ready(function() {
////////////////////////////////////////localvariables//////////////////////////////////////////////////////////////////////////
var temp = 0;
var rain = "";
var forecast = "";
var isRaining = false;
var query;

////////////////////////////////////////////foursquare/////////////////////////////////////////////////////////////////////////
function receive(result)
{

	var things = new Array();
	for(var i = 0; i < 5; i++){
		things.push((result.response.groups[0].items[i].venue.name));
	}
	
	things.sort();
	var listOfThings = things.join("</br>");
	
		
	$("#results").html(listOfThings);
}


function venueRec(){
	var url = "https://api.foursquare.com/v2/venues/explore";
	if(temp > 60 && !isRaining){
    $.ajax(
           {
           "url":url,
            "data":{
            "client_id":"5AMVKS4AGNPXZTLSNA44VJIKD4ONRZ03HSKH2MQBKUS2QD1N",
            "client_secret": "43IJ11SJO5RUJHBJIEKMSUKFFCCZRFREUYWC1SC52THC213B",
            "v": "20180101",
			"query": query,
			"food": "outdoors",
            "near": $("#location").val(),
            "limit": 5,
            },
           }).done(function(data){
                   receive(data);
           }).fail(function(data) {
				   alert("INVALID CITY TRY ANOTHER");
                   console.log(data);
                   });
    
	}
	
	else{
    $.ajax(
           {
           "url":url,
            "data":{
            "client_id":"5AMVKS4AGNPXZTLSNA44VJIKD4ONRZ03HSKH2MQBKUS2QD1N",
            "client_secret": "43IJ11SJO5RUJHBJIEKMSUKFFCCZRFREUYWC1SC52THC213B",
            "v": "20180101",
			"query": query,
            "near": $("#location").val(),
            "limit": 5,
            },
           }).done(function(data){
                   receive(data);
           }).fail(function(data) {
                   console.log(data);
				   alert("INVALID CITY TRY ANOTHER");
                   });
    
	}
	
	
}
/////////////////////////////////////////////weather///////////////////////////////////////////////////////////////////////////
function weather(result){
		forecast = JSON.stringify(result);
		temp = result.main.temp;
		rain = result.weather[0].main;
		if(rain === "Rain")
			isRaining = true;
		query = $("select option:selected").val();
		venueRec();
}

function send()
{	
	var wurl = "http://api.openweathermap.org/data/2.5/weather";
	$.ajax(
		{
		"url":wurl,
		"data":{
			"appid": "661adeba794b874ebe3c0ff889a608d7",
			"q": $("#location").val(),
			"main": "temp",
			"weather": "main",
			"units": "imperial",
			"dataType": "json",
		},
		}).done(function(data){
            weather(data);
           }).fail(function(data) {
            console.log(data);
			alert("INVALID CITY TRY ANOTHER");
				});
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function start()
{
    $("#suggest").click(send);
}

	$(start);

});



